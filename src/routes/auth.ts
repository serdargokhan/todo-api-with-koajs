import Router from '@koa/router';
// Controllers
import {loginUser, registerUser} from '@/controllers/auth-controller';
// Validation
import {validateRequests} from '@/middlewares/validateRequests';
import {authSchema} from '@/validations';

const router = new Router();

router.post('/api/register', validateRequests(authSchema), registerUser);
router.post('/api/login', validateRequests(authSchema), loginUser);

export default router;
