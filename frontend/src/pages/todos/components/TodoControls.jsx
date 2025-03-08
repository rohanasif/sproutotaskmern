import React from "react";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const TodoControls = ({ filters, onFilterChange }) => {
  const handleChange = (field) => (event) => {
    onFilterChange({ ...filters, [field]: event.target.value });
  };

  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <TextField
        size="small"
        placeholder="Search tasks..."
        value={filters.search}
        onChange={handleChange("search")}
        className="col-span-1 sm:col-span-2 lg:col-span-2"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon className="text-gray-400" />
            </InputAdornment>
          ),
          className: "bg-gray-800 border-gray-700 text-white",
          sx: { height: "42px" },
        }}
      />

      <FormControl size="small" className="col-span-1">
        <InputLabel id="status-label" className="text-gray-400">
          Status
        </InputLabel>
        <Select
          labelId="status-label"
          value={filters.status}
          label="Status"
          onChange={handleChange("status")}
          className="bg-gray-800 border-gray-700 text-white"
          sx={{
            height: "42px",
            "& .MuiSelect-select": {
              paddingTop: "11px",
              paddingBottom: "11px",
            },
          }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </FormControl>

      <Box className="col-span-1 sm:col-span-2 lg:col-span-1 flex gap-4">
        <FormControl size="small" className="flex-1">
          <InputLabel id="sort-label" className="text-gray-400">
            Sort By
          </InputLabel>
          <Select
            labelId="sort-label"
            value={filters.sortBy}
            label="Sort By"
            onChange={handleChange("sortBy")}
            className="bg-gray-800 border-gray-700 text-white"
            sx={{
              height: "42px",
              "& .MuiSelect-select": {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
          >
            <MenuItem value="createdAt">Created Date</MenuItem>
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="status">Status</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" className="flex-1">
          <InputLabel id="order-label" className="text-gray-400">
            Order
          </InputLabel>
          <Select
            labelId="order-label"
            value={filters.sortOrder}
            label="Order"
            onChange={handleChange("sortOrder")}
            className="bg-gray-800 border-gray-700 text-white"
            sx={{
              height: "42px",
              "& .MuiSelect-select": {
                paddingTop: "11px",
                paddingBottom: "11px",
              },
            }}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default TodoControls;
