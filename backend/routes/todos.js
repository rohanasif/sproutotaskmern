const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/auth");
const todoController = require("../controllers/todoController");

// Protect all todo routes with authentication
router.use(authenticateToken);

router.get("/", todoController.getTodos);
router.post("/", todoController.createTodo);
router.put("/:id", todoController.updateTodo);
router.delete("/:id", todoController.deleteTodo);

module.exports = router;
