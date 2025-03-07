import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Header from "./components/layout/Header";
import { Container, Box } from "@mui/material";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Box
          minHeight={"100vh"}
          display={"flex"}
          flexDirection={"column"}
          position={"relative"}
        >
          <Header />
          <Box
            component="main"
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Container maxWidth="lg">
              <Routes>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <div>Dashboard (Protected Route)</div>
                    </ProtectedRoute>
                  }
                />

                {/* Redirect root to login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Catch all route - 404 */}
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </AuthProvider>
    </Router>
  );
}

export default App;
