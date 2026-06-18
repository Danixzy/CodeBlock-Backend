import { Router } from 'express';
import { SkillController } from './controllers';

const router = Router();
const skillController = new SkillController();

router.get('/', skillController.findAll);

export default router;
