import Todo from "../models/todo.model.js";

// Create a new todo
export const createTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const todo = await Todo.create({
      title,
      description,
      status: status,
      user: req.user._id,
    });
    res.status(201).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({
      success: false,
      error: "Internal server error while creating todo",
    });
  }
};

// Get all todos for the authenticated user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    if (!todos.length) {
      return res.status(200).json({
        success: true,
        message: "No todos found for this user",
        count: 0,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching todos",
    });
  }
};

// Get a single todo
export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found or you don't have permission to access it",
      });
    }

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error while fetching todo",
    });
  }
};

// Update a todo
export const updateTodo = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found or you don't have permission to update it",
      });
    }

    // Update fields if provided
    if (title) todo.title = title;
    if (description) todo.description = description;
    if (status) todo.status = status;

    await todo.save();

    res.status(200).json({
      success: true,
      data: todo,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        error: Object.values(error.errors).map((err) => err.message),
      });
    }
    res.status(500).json({
      success: false,
      error: "Internal server error while updating todo",
    });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        error: "Todo not found or you don't have permission to delete it",
      });
    }

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Internal server error while deleting todo",
    });
  }
};
