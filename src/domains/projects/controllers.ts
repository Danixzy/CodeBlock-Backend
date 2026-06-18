import { Response, NextFunction } from 'express';
import { ProjectService } from './service';
import { AuthRequest } from '../../middlewares/auth';

const projectService = new ProjectService();

export class ProjectController {
  async create(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const project = await projectService.create(Number(req.user?.id), req.body);
      res.status(201).json({ status: 'success', data: project });
    } catch (error) {
      next(error);
    }
  }

  async findMyProjects(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.findMyProjectsWithCount(Number(req.user?.id));
      res.json({ status: 'success', data: projects });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const project = await projectService.findById(parseInt(req.params.id));
      res.json({ status: 'success', data: project });
    } catch (error) {
      next(error);
    }
  }

  async update(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const project = await projectService.update(parseInt(req.params.id), Number(req.user?.id), req.body);
      res.json({ status: 'success', data: project });
    } catch (error) {
      next(error);
    }
  }

  async remove(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await projectService.remove(parseInt(req.params.id), Number(req.user?.id));
      res.json({ status: 'success', data: null });
    } catch (error) {
      next(error);
    }
  }

  async getCandidates(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const candidates = await projectService.getCandidates(parseInt(req.params.id));
      res.json({ status: 'success', data: candidates });
    } catch (error) {
      next(error);
    }
  }

  async updateCandidateStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      await projectService.updateCandidateStatus(
        parseInt(req.params.id),
        parseInt(req.params.candidateId),
        req.body.status,
      );
      res.json({ status: 'success', data: null });
    } catch (error) {
      next(error);
    }
  }

  async getAvailableProjects(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const projects = await projectService.getAvailableProjects(Number(req.user?.id));
      res.json({ status: 'success', data: projects });
    } catch (error) {
      next(error);
    }
  }

  async applyToProject(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const application = await projectService.applyToProject(
        parseInt(req.params.id),
        Number(req.user?.id),
        req.body.proposedValue,
        req.body.proposalText,
      );
      res.status(201).json({ status: 'success', data: application });
    } catch (error) {
      next(error);
    }
  }

  async getMyApplications(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const applications = await projectService.getMyApplications(Number(req.user?.id));
      res.json({ status: 'success', data: applications });
    } catch (error) {
      next(error);
    }
  }

  async getMyJobs(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const jobs = await projectService.getMyJobs(Number(req.user?.id));
      res.json({ status: 'success', data: jobs });
    } catch (error) {
      next(error);
    }
  }
}
