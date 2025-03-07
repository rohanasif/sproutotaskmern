import express from "express";
import {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validateRequest } from "../middleware/validate.middleware.js";
import {
  createTodoValidation,
  updateTodoValidation,
  todoIdValidation,
} from "../validations/todo.validator.js";

const router = express.Router();

// Protect all routes
router.use(protect);

router
  .route("/")
  .get(getTodos)
  .post(createTodoValidation, validateRequest, createTodo);

router
  .route("/:id")
  .get(todoIdValidation, validateRequest, getTodo)
  .put(todoIdValidation, updateTodoValidation, validateRequest, updateTodo)
  .delete(todoIdValidation, validateRequest, deleteTodo);

export default router;
