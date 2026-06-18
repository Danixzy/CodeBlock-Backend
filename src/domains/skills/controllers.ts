import { Request, Response, NextFunction } from 'express';
import { SkillService } from './service';

const skillService = new SkillService();

export class SkillController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const skills = await skillService.findAll();
      res.json({ status: 'success', data: skills });
    } catch (error) {
      next(error);
    }
  }
}
