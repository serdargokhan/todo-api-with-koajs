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
import {authenticate} from '@/middlewares/index';
import {validateRequests} from '@/middlewares/validateRequests';
import {todoSchema} from '@/validations';

const router = new Router();

router.get('/api/todo', getTodos);
router.post(
    '/api/todo',
    compose([authenticate, validateRequests(todoSchema)]),
    createTodo
);
router.put(
    '/api/todo/:todoId',
    compose([authenticate, validateRequests(todoSchema)]),
    updateTodo
);
router.delete('/api/todo/:todoId', authenticate, deleteTodo);

export default router;
