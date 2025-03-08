import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";

const TodoModal = ({ open, onClose, onSave, todo }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
  });

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || "",
        status: todo.status,
      });
    } else {
      setFormData({
        title: "",
        description: "",
        status: "pending",
      });
    }
  }, [todo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        className: "rounded-lg",
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle className="bg-gray-50 border-b border-gray-100 px-6 py-4">
          <Typography
            variant="h6"
            component="span"
            className="font-bold text-gray-900"
          >
            {todo ? "Edit Task" : "Create New Task"}
          </Typography>
        </DialogTitle>
        <DialogContent className="p-6">
          <Box marginTop={2} className="space-y-5">
            <TextField
              autoFocus
              name="title"
              label="Title"
              fullWidth
              required
              value={formData.title}
              onChange={handleChange}
              inputProps={{ maxLength: 100 }}
              variant="outlined"
              InputLabelProps={{
                className: "text-gray-700",
              }}
            />
            <TextField
              name="description"
              label="Description"
              fullWidth
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
              inputProps={{ maxLength: 500 }}
              variant="outlined"
              placeholder="Add a description for your task..."
              InputLabelProps={{
                className: "text-gray-700",
              }}
            />
            <FormControl fullWidth variant="outlined">
              <InputLabel className="text-gray-700">Status</InputLabel>
              <Select
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="pending" className="text-gray-700">
                  Pending
                </MenuItem>
                <MenuItem value="completed" className="text-gray-700">
                  Completed
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions className="px-6 py-4 border-t border-gray-100">
          <Button onClick={onClose} className="text-gray-700 hover:bg-gray-50">
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm px-6"
          >
            {todo ? "Update Task" : "Create Task"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TodoModal;
