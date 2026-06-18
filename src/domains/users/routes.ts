import { Router } from 'express';
import multer from 'multer';
import { UserController } from './controllers';
import { validate } from '../../middlewares/validation';
import { authMiddleware } from '../../middlewares/auth';
import { createUserSchema, updateUserSchema, updateProfileSchema, loginSchema } from './validators';

const router = Router();
const userController = new UserController();
const upload = multer({ storage: multer.memoryStorage() });

// Public routes
router.post('/register', validate(createUserSchema), userController.create);
router.post('/login', validate(loginSchema), userController.login);

// Protected routes
router.use(authMiddleware);

// Profile (me) routes - must be before /:id to avoid conflict
router.get('/me', userController.getMe);
router.put('/me', validate(updateProfileSchema), userController.updateMe);
router.patch('/me/avatar', upload.single('avatar'), userController.updateMyAvatar);

router.get('/', userController.findAll);
router.get('/:id', userController.findById);
router.put('/:id', validate(updateUserSchema), userController.update);
router.delete('/:id', userController.delete);

export default router;
