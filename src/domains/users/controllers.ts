import { Request, Response, NextFunction } from 'express';
import { UserService } from './service';
import { AuthRequest } from '../../middlewares/auth';
import { BadRequestError } from '../../errors';

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
      const request = req as AuthRequest;
      const parsedId = Number.parseInt(req.params.id, 10);
      const authUserId = Number(request.user?.id);
      const targetUserId = Number.isNaN(parsedId) ? authUserId : parsedId;

      if (!Number.isInteger(targetUserId) || targetUserId <= 0) {
        throw new BadRequestError('Invalid user id');
      }

      const user = await userService.update(targetUserId, req.body);
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

  async getMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await userService.getMe(Number(req.user?.id));
      res.json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateMe(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await userService.updateMe(Number(req.user?.id), req.body);
      res.json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }

  async updateMyAvatar(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      if (!req.file) throw new BadRequestError('No file provided');
      const user = await userService.updateAvatar(Number(req.user?.id), req.file);
      res.json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  }
}
