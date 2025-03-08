import React, { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";

// Configure axios with base URL
axios.defaults.baseURL = "http://localhost:5000";

// Add request interceptor to include JWT token
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noTodosMessage, setNoTodosMessage] = useState("");
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      // Build query string from filters
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append("search", filters.search);
      if (filters.status) queryParams.append("status", filters.status);
      if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
      if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder);

      const response = await axios.get(`/api/todos?${queryParams.toString()}`);
      const { data, message } = response.data;

      setTodos(Array.isArray(data) ? data : []);
      setNoTodosMessage(message || "No todos found");
    } catch (error) {
      setTodos([]);
      setNoTodosMessage(
        error.response?.data?.message || "Failed to fetch todos"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const addTodo = useCallback(
    async (todoData) => {
      try {
        setError(null);
        const response = await axios.post("/api/todos", todoData);
        const { success } = response.data;
        if (success) {
          await fetchTodos();
          return { success: true };
        }
        throw new Error("Failed to add todo");
      } catch (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
    },
    [fetchTodos]
  );

  const updateTodo = useCallback(
    async (id, todoData) => {
      try {
        setError(null);
        const response = await axios.put(`/api/todos/${id}`, todoData);
        const { success } = response.data;
        if (success) {
          await fetchTodos();
          return { success: true };
        }
        throw new Error("Failed to update todo");
      } catch (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
    },
    [fetchTodos]
  );

  const deleteTodo = useCallback(
    async (id) => {
      try {
        setError(null);
        const response = await axios.delete(`/api/todos/${id}`);
        const { success } = response.data;
        if (success) {
          await fetchTodos();
          return { success: true };
        }
        throw new Error("Failed to delete todo");
      } catch (error) {
        setError(error.message);
        return { success: false, error: error.message };
      }
    },
    [fetchTodos]
  );

  const value = {
    todos,
    loading,
    error,
    noTodosMessage,
    filters,
    updateFilters,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
