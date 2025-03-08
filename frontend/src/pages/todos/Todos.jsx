import React, { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TodoItem from "./components/TodoItem";
import TodoModal from "./components/TodoModal";
import TodoControls from "./components/TodoControls";
import { useTodoContext } from "../../context/TodoContext";

const Todos = () => {
  const {
    todos,
    loading,
    noTodosMessage,
    filters,
    updateFilters,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  } = useTodoContext();
  const [modalOpen, setModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleAddTodo = () => {
    setEditTodo(null);
    setModalOpen(true);
  };

  const handleEditTodo = (todo) => {
    setEditTodo(todo);
    setModalOpen(true);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setEditTodo(null);
  };

  const handleSaveTodo = async (todoData) => {
    try {
      if (editTodo) {
        await updateTodo(editTodo._id, todoData);
      } else {
        await addTodo(todoData);
      }
      handleModalClose();
    } catch (error) {
      console.error("Failed to save todo:", error);
    }
  };

  return (
    <Box marginTop={2} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Typography variant="h4" className="text-white font-semibold">
            Tasks
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddTodo}
            className="bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            Add Task
          </Button>
        </div>

        <TodoControls filters={filters} onFilterChange={updateFilters} />

        {loading ? (
          <Box className="flex justify-center items-center h-[400px]">
            <CircularProgress />
          </Box>
        ) : !todos || todos.length === 0 ? (
          <Box className="text-center py-20 bg-gray-800 rounded-xl border border-gray-700 shadow-sm">
            <Typography variant="h6" className="text-gray-300 mb-3">
              {noTodosMessage}
            </Typography>
            <Typography variant="body1" className="text-gray-400">
              {filters.search || filters.status
                ? "Try adjusting your filters to see more results"
                : "Click the 'Add Task' button above to create your first task"}
            </Typography>
          </Box>
        ) : (
          <Box className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {todos.map((todo) => (
              <TodoItem
                key={todo._id}
                todo={todo}
                onEdit={() => handleEditTodo(todo)}
                onDelete={() => handleDeleteTodo(todo._id)}
              />
            ))}
          </Box>
        )}
      </div>

      <TodoModal
        open={modalOpen}
        onClose={handleModalClose}
        onSave={handleSaveTodo}
        todo={editTodo}
      />
    </Box>
  );
};

export default Todos;
