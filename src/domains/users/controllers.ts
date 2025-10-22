import { Request, Response, NextFunction } from 'express';
import { UserService } from './service';

const userService = new UserService();

export class UserController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.create(req.body);
      res.status(201).json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await userService.login(email, password);
      res.json({ status: 'success', data: result });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.findById(parseInt(req.params.id));
      res.json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }

  async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await userService.findAll();
      res.json({ status: 'success', data: users });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await userService.update(parseInt(req.params.id), req.body);
      res.json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await userService.delete(parseInt(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
