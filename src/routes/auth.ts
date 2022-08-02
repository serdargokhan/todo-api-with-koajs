import Router from '@koa/router';
// Controllers
import {loginUser, registerUser} from '@/controllers/auth-controller';
// Validation
import {validateRequests} from '@/middlewares/validateRequests';
import {authLoginSchema, authRegisterSchema} from '@/validations';

const router = new Router();

router.post(
    '/api/register',
    validateRequests(authRegisterSchema),
    registerUser
);
router.post('/api/login', validateRequests(authLoginSchema), loginUser);

export default router;
