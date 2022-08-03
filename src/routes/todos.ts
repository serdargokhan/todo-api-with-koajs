import Router from '@koa/router';
// Combine Middlewares
import compose from 'koa-compose';
// Controllers
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from '@/controllers/todos-controller';
// Validation
import {
    authenticate,
    validateUser,
    validateRequests
} from '@/middlewares/index';
import {todoPostSchema, todoPutSchema} from '@/validations';

const router = new Router();

router.get('/api/todo', getTodos);
router.post(
    '/api/todo',
    compose([authenticate, validateRequests(todoPostSchema)]),
    createTodo
);
router.put(
    '/api/todo/:todoId',
    compose([authenticate, validateUser, validateRequests(todoPutSchema)]),
    updateTodo
);
router.delete(
    '/api/todo/:todoId',
    compose([authenticate, validateUser]),
    deleteTodo
);

export default router;
