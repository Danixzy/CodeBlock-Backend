import { Router } from 'express';
import userRoutes from '../domains/users/routes';
import productRoutes from '../domains/products/routes';
import categoryRoutes from '../domains/categories/routes';
import skillRoutes from '../domains/skills/routes';
import projectRoutes from '../domains/projects/routes';

const router = Router();

router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/categories', categoryRoutes);
router.use('/skills', skillRoutes);
router.use('/projects', projectRoutes);

export default router;
