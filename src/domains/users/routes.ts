import { Router } from 'express';
import { UserController } from './controllers';
import { validate } from '../../middlewares/validation';
import { authMiddleware } from '../../middlewares/auth';
import { createUserSchema, updateUserSchema, loginSchema } from './validators';

const router = Router();
const userController = new UserController();

// Public routes
router.post('/register', validate(createUserSchema), userController.create);
router.post('/login', validate(loginSchema), userController.login);

// Protected routes
router.use(authMiddleware);
router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.put('/:id', validate(updateUserSchema), userController.update);
router.delete('/:id', userController.delete);

export default router;
