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
import Todos from "./pages/todos/Todos";
import Header from "./components/layout/Header";
import { Container, Box } from "@mui/material";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TodoProvider>
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
              }}
            >
              <Container maxWidth="lg">
                <Routes>
                  {/* Public routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* Protected routes */}
                  <Route
                    path="/todos"
                    element={
                      <ProtectedRoute>
                        <Todos />
                      </ProtectedRoute>
                    }
                  />

                  {/* Redirect root to todos for authenticated users */}
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Navigate to="/todos" replace />
                      </ProtectedRoute>
                    }
                  />

                  {/* Catch all route - 404 */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Container>
            </Box>
          </Box>
        </TodoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
