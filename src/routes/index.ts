import { Router } from 'express';
import userRoutes from '../domains/users/routes';
import productRoutes from '../domains/products/routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);

export default router;
