import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Chip,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { format } from "date-fns";

const TodoItem = ({ todo, onEdit, onDelete }) => {
  const { title, description, status, createdAt } = todo;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 h-full bg-gray-800 border border-gray-700">
      <CardContent className="h-full flex flex-col">
        <Box className="flex justify-between items-start mb-4">
          <Typography
            variant="h6"
            className="font-semibold text-gray-100 break-words flex-1 leading-tight"
          >
            {title}
          </Typography>
          <Box className="flex space-x-1 ml-3">
            <IconButton
              size="small"
              onClick={onEdit}
              className="text-blue-400 hover:text-blue-300 hover:bg-gray-700"
            >
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={onDelete}
              className="text-red-400 hover:text-red-300 hover:bg-gray-700"
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Typography
          variant="body2"
          className="text-gray-300 mb-4 break-words flex-grow"
          style={{ minHeight: "3rem" }}
        >
          {description}
        </Typography>

        <Box
          paddingTop={2}
          className="flex justify-between items-center border-t border-gray-700"
        >
          <Chip
            label={status.charAt(0).toUpperCase() + status.slice(1)}
            size="small"
            color={status === "completed" ? "success" : "warning"}
            className="w-fit font-medium"
            sx={{
              backgroundColor:
                status === "completed"
                  ? "rgba(46, 160, 67, 0.2)"
                  : "rgba(212, 167, 44, 0.2)",
              color: status === "completed" ? "#4ade80" : "#fbbf24",
              borderColor:
                status === "completed"
                  ? "rgba(46, 160, 67, 0.4)"
                  : "rgba(212, 167, 44, 0.4)",
            }}
          />
          <Typography variant="caption" className="text-gray-400">
            {format(new Date(createdAt), "MMM d, yyyy")}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodoItem;
