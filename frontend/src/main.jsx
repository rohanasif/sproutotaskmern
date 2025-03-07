import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App";
import "./index.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3B82F6", // Rich blue
      light: "#60A5FA",
      dark: "#2563EB",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#6366F1", // Indigo
      light: "#818CF8",
      dark: "#4F46E5",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#0F172A", // Deep navy
      paper: "#1E293B", // Slate blue
    },
    error: {
      main: "#DC2626",
      light: "#EF4444",
      dark: "#B91C1C",
    },
    warning: {
      main: "#D97706",
      light: "#F59E0B",
      dark: "#B45309",
    },
    success: {
      main: "#059669",
      light: "#10B981",
      dark: "#047857",
    },
    info: {
      main: "#0EA5E9",
      light: "#38BDF8",
      dark: "#0284C7",
    },
    text: {
      primary: "#F8FAFC",
      secondary: "#CBD5E1",
      disabled: "#64748B",
    },
    divider: "rgba(148, 163, 184, 0.12)",
    action: {
      active: "#CBD5E1",
      hover: "rgba(148, 163, 184, 0.08)",
      selected: "rgba(148, 163, 184, 0.16)",
      disabled: "rgba(148, 163, 184, 0.3)",
      disabledBackground: "rgba(148, 163, 184, 0.12)",
    },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontWeight: 600,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 600,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 600,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.25rem",
      marginBottom: "1rem",
    },
    h6: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          "&.MuiContainer-maxWidthXs": {
            maxWidth: "444px",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: 6,
          padding: "6px 16px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "none",
          },
        },
        contained: {
          "&:hover": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          color: "text.secondary",
          "&:hover": {
            color: "primary.main",
          },
        },
      },
      variants: [
        {
          props: { variant: "auth-link" },
          style: {
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            fontSize: "0.875rem",
            fontWeight: 500,
          },
        },
      ],
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(203, 213, 225, 0.23)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(203, 213, 225, 0.35)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#3B82F6",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          margin: "16px 0",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
        },
      },
    },
    MuiBox: {
      variants: [
        {
          props: { variant: "auth-container" },
          style: {
            marginTop: "4rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          },
        },
      ],
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
        },
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
