import { Request, Response, NextFunction } from 'express';
import { ProductService } from './service';

const productService = new ProductService();

export class ProductController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json({ status: 'success', data: product });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.findById(parseInt(req.params.id));
      res.json({ status: 'success', data: product });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.findAll();
      res.json({ status: 'success', data: products });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.update(parseInt(req.params.id), req.body);
      res.json({ status: 'success', data: product });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await productService.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
