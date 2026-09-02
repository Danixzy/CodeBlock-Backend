import { Skill } from './model';

export class SkillService {
  async findAll() {
    return Skill.query().orderBy('name');
  }

  async findOrCreate(name: string): Promise<Skill> {
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const existing = await Skill.query()
      .whereRaw('LOWER(name) = ?', [name.toLowerCase()])
      .first();
    if (existing) return existing;
    return Skill.query().insert({ name: name.trim(), slug });
  }
}
