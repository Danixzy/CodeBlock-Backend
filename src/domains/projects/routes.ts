import { Router } from 'express';
import { ProjectController } from './controllers';
import { validate } from '../../middlewares/validation';
import { authMiddleware } from '../../middlewares/auth';
import { requireContractor } from '../../middlewares/requireContractor';
import { requireFreelancer } from '../../middlewares/require-freelancer';
import { createProjectSchema } from './validators';
import { applyProjectSchema } from './application-validators';

const router = Router();
const projectController = new ProjectController();

router.use(authMiddleware);

// Contractor routes
router.post('/', requireContractor, validate(createProjectSchema), projectController.create);
router.get('/my', requireContractor, projectController.findMyProjects);
router.put('/:id', requireContractor, validate(createProjectSchema), projectController.update);
router.delete('/:id', requireContractor, projectController.remove);
router.get('/:id/candidates', requireContractor, projectController.getCandidates);
router.patch('/:id/candidates/:candidateId/status', requireContractor, projectController.updateCandidateStatus);

// Freelancer routes
router.get('/available', requireFreelancer, projectController.getAvailableProjects);
router.get('/my-applications', requireFreelancer, projectController.getMyApplications);
router.get('/my-jobs', requireFreelancer, projectController.getMyJobs);
router.post('/:id/apply', requireFreelancer, validate(applyProjectSchema), projectController.applyToProject);

// Public (authenticated)
router.get('/:id', projectController.findById);

export default router;
