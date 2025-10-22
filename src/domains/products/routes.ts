import { Router } from 'express';
import { ProductController } from './controllers';
import { validate } from '../../middlewares/validation';
import { authMiddleware } from '../../middlewares/auth';
import { createProductSchema, updateProductSchema } from './validators';

const router = Router();
const productController = new ProductController();

// All product routes require authentication
router.use(authMiddleware);

router.post('/', validate(createProductSchema), productController.create);
router.get('/', productController.findAll);
router.get('/:id', productController.findById);
router.put('/:id', validate(updateProductSchema), productController.update);
router.delete('/:id', productController.delete);

export default router;
