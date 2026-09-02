import { Project } from './model';
import { SkillService } from '../skills/service';
import { CategoryService } from '../categories/service';
import { NotFoundError, ForbiddenError, BadRequestError, ConflictError } from '../../errors';
import { db } from '../../database/knex';

const skillService = new SkillService();
const categoryService = new CategoryService();

export interface CreateProjectData {
  title: string;
  categoryId: number;
  description: string;
  scope: string;
  budgetMin: number;
  budgetMax: number;
  deadline: string;
  skills: string[];
}

function isMissingApplicationsTable(error: unknown): boolean {
  const dbError = error as { code?: string; sqlMessage?: string };
  return dbError?.code === 'ER_NO_SUCH_TABLE'
    && ((dbError?.sqlMessage?.includes('project_applications') ?? false)
      || (dbError?.sqlMessage?.includes('applications') ?? false));
}

export class ProjectService {
  async create(contractorId: number, data: CreateProjectData) {
    await categoryService.findById(data.categoryId);

    const deadline = new Date(data.deadline);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (deadline < today) {
      throw new BadRequestError('Deadline must be a future date');
    }

    const project = await db.transaction(async (trx) => {
      const [projectId] = await trx('projects').insert({
        contractor_id: contractorId,
        category_id: data.categoryId,
        title: data.title,
        description: data.description,
        scope: data.scope,
        budget_min: data.budgetMin,
        budget_max: data.budgetMax,
        deadline: data.deadline,
        status: 'published',
        created_at: new Date(),
        updated_at: new Date(),
      });

      const skillRecords = await Promise.all(
        data.skills.map((name) => skillService.findOrCreate(name)),
      );

      const projectSkills = skillRecords.map((skill) => ({
        project_id: projectId,
        skill_id: skill.id,
      }));

      if (projectSkills.length > 0) {
        await trx('project_skills').insert(projectSkills);
      }

      return Project.query(trx)
        .findById(projectId)
        .withGraphFetched('[category, skills]');
    });

    return project;
  }

  async findMyProjects(contractorId: number) {
    return Project.query()
      .where('contractor_id', contractorId)
      .withGraphFetched('[category, skills]')
      .orderBy('created_at', 'desc');
  }

  async findById(id: number) {
    const project = await Project.query()
      .findById(id)
      .withGraphFetched('[category, skills, contractor]');
    if (!project) throw new NotFoundError('Project not found');
    return project;
  }

  async update(id: number, contractorId: number, data: Partial<CreateProjectData>) {
    const project = await Project.query().findById(id);
    if (!project) throw new NotFoundError('Project not found');
    if (project.contractorId !== contractorId) throw new ForbiddenError('Not authorized');

    await db.transaction(async (trx) => {
      const updatePayload: Record<string, unknown> = { updated_at: new Date() };
      if (data.title) updatePayload.title = data.title;
      if (data.categoryId) updatePayload.category_id = data.categoryId;
      if (data.description) updatePayload.description = data.description;
      if (data.scope) updatePayload.scope = data.scope;
      if (data.budgetMin !== undefined) updatePayload.budget_min = data.budgetMin;
      if (data.budgetMax !== undefined) updatePayload.budget_max = data.budgetMax;
      if (data.deadline) updatePayload.deadline = data.deadline;

      await trx('projects').where('id', id).update(updatePayload);

      if (data.skills) {
        const skillRecords = await Promise.all(
          data.skills.map((name) => skillService.findOrCreate(name)),
        );
        await trx('project_skills').where('project_id', id).delete();
        if (skillRecords.length > 0) {
          await trx('project_skills').insert(
            skillRecords.map((s) => ({ project_id: id, skill_id: s.id })),
          );
        }
      }
    });

    return this.findById(id);
  }

  async remove(id: number, contractorId: number) {
    const project = await Project.query().findById(id);
    if (!project) throw new NotFoundError('Project not found');
    if (project.contractorId !== contractorId) throw new ForbiddenError('Not authorized');
    await Project.query().deleteById(id);
  }

  async getCandidates(projectId: number) {
    try {
      const candidates = await db('project_applications')
        .where('project_applications.project_id', projectId)
        .join('users', 'project_applications.freelancer_id', 'users.id')
        .select(
          'project_applications.id',
          'project_applications.status',
          'project_applications.proposed_value as proposedValue',
          'project_applications.proposal_text as proposalText',
          'users.id as userId',
          'users.name',
          'users.email',
          'users.avatar_url as avatarUrl',
        );
      return candidates;
    } catch (error) {
      if (isMissingApplicationsTable(error)) {
        return [];
      }
      throw error;
    }
  }

  async updateCandidateStatus(projectId: number, candidateId: number, status: 'accepted' | 'rejected') {
    try {
      const updated = await db('project_applications')
        .where({ project_id: projectId, id: candidateId })
        .update({ status, updated_at: new Date() });
      if (!updated) throw new NotFoundError('Application not found');
    } catch (error) {
      if (isMissingApplicationsTable(error)) {
        throw new BadRequestError('Candidates module is not available yet');
      }
      throw error;
    }
  }

  async findMyProjectsWithCount(contractorId: number) {
    const projects = await Project.query()
      .where('contractor_id', contractorId)
      .withGraphFetched('[category, skills]')
      .orderBy('created_at', 'desc');

    if (projects.length === 0) {
      return [];
    }

    try {
      const counts = await db('project_applications')
        .whereIn('project_id', projects.map((p) => p.id))
        .groupBy('project_id')
        .select('project_id', db.raw('count(*) as count'));

      const countMap = new Map(counts.map((c: any) => [c.project_id, Number(c.count)]));
      return projects.map((p) => ({ ...p, candidatesCount: countMap.get(p.id) ?? 0 }));
    } catch (error) {
      if (isMissingApplicationsTable(error)) {
        return projects.map((p) => ({ ...p, candidatesCount: 0 }));
      }
      throw error;
    }
  }

  async getAvailableProjects(freelancerId: number) {
    const projects = await Project.query()
      .where('status', 'published')
      .withGraphFetched('[category, skills]')
      .orderBy('created_at', 'desc');

    const applied = await db('project_applications')
      .where('freelancer_id', freelancerId)
      .select('project_id');

    const appliedSet = new Set(applied.map((r: any) => r.project_id));
    return projects.map((p) => ({ ...p, alreadyApplied: appliedSet.has(p.id) }));
  }

  async applyToProject(projectId: number, freelancerId: number, proposedValue: number, proposalText: string) {
    const project = await Project.query().findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    if (project.status !== 'published') throw new BadRequestError('Project is not accepting applications');

    const existing = await db('project_applications')
      .where({ project_id: projectId, freelancer_id: freelancerId })
      .first();
    if (existing) throw new ConflictError('You have already applied to this project');

    const [id] = await db('project_applications').insert({
      project_id: projectId,
      freelancer_id: freelancerId,
      proposed_value: proposedValue,
      proposal_text: proposalText,
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    });

    return db('project_applications').where('id', id).first();
  }

  async getMyApplications(freelancerId: number) {
    const applications = await db('project_applications')
      .where('project_applications.freelancer_id', freelancerId)
      .join('projects', 'project_applications.project_id', 'projects.id')
      .select(
        'project_applications.id as applicationId',
        'project_applications.status as applicationStatus',
        'project_applications.proposed_value as proposedValue',
        'projects.id',
        'projects.title',
        'projects.description',
        'projects.budget_min as budgetMin',
        'projects.budget_max as budgetMax',
        'projects.deadline',
        'projects.status',
      )
      .orderBy('project_applications.created_at', 'desc');
    return applications;
  }

  async getMyJobs(freelancerId: number) {
    const projectIds = await db('project_applications')
      .where({ freelancer_id: freelancerId, status: 'accepted' })
      .pluck('project_id');

    if (projectIds.length === 0) return [];

    const projects = await db('projects')
      .whereIn('projects.id', projectIds)
      .leftJoin('categories', 'projects.category_id', 'categories.id')
      .select(
        'projects.id',
        'projects.title',
        'projects.description',
        'projects.budget_min as budgetMin',
        'projects.budget_max as budgetMax',
        'projects.deadline',
        'projects.status',
        'categories.name as categoryName',
        'categories.slug as categorySlug',
      )
      .orderBy('projects.created_at', 'desc');

    const skillRows = await db('project_skills')
      .whereIn('project_skills.project_id', projectIds)
      .join('skills', 'project_skills.skill_id', 'skills.id')
      .select('project_skills.project_id', 'skills.id', 'skills.name', 'skills.slug');

    const skillMap = new Map<number, { id: number; name: string; slug: string }[]>();
    for (const row of skillRows) {
      const list = skillMap.get(row.project_id) ?? [];
      list.push({ id: row.id, name: row.name, slug: row.slug });
      skillMap.set(row.project_id, list);
    }

    return projects.map((p: any) => ({
      ...p,
      category: p.categoryName ? { name: p.categoryName, slug: p.categorySlug } : null,
      skills: skillMap.get(p.id) ?? [],
    }));
  }
}
