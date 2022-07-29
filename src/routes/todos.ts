import Router from "@koa/router";
import { getTodos, createTodo, updateTodo, deleteTodo } from "../controllers/todos-controller";

const router = new Router();

router.get("/api/todo", getTodos);
router.post("/api/todo", createTodo);
router.put("/api/todo/:todoId", updateTodo);
router.delete("/api/todo/:todoId", deleteTodo);

export default router;