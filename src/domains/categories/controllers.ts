import { Request, Response, NextFunction } from 'express';
import { CategoryService } from './service';

const categoryService = new CategoryService();

export class CategoryController {
  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await categoryService.findAll();
      res.json({ status: 'success', data: categories });
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await categoryService.create(req.body);
      res.status(201).json({ status: 'success', data: category });
    } catch (error) {
      next(error);
    }
  }
}
