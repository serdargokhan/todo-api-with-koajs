import Router from '@koa/router';
// Controllers
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from '@/controllers/todos-controller';
// Validation Middleware
import {validate} from '@/middlewares/validate';

const router = new Router();

router.get('/api/todo', getTodos);
router.post('/api/todo', validate, createTodo);
router.put('/api/todo/:todoId', validate, updateTodo);
router.delete('/api/todo/:todoId', deleteTodo);

export default router;
