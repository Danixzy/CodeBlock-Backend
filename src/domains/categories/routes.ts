import { Router } from 'express';
import { CategoryController } from './controllers';
import { validate } from '../../middlewares/validation';
import { authMiddleware } from '../../middlewares/auth';
import { createCategorySchema } from './validators';

const router = Router();
const categoryController = new CategoryController();

router.get('/', categoryController.findAll);
router.post('/', authMiddleware, validate(createCategorySchema), categoryController.create);

export default router;
