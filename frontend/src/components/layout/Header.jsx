import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <AppBar position="fixed" className="z-50">
      <Container maxWidth="lg" className="px-4">
        <Toolbar
          disableGutters
          className="flex justify-between items-center min-h-[64px]"
        >
          {/* Logo and Title */}
          <div className="flex items-center space-x-2">
            <TaskAltIcon className="hidden md:block text-2xl" />
            <Typography
              variant="h6"
              noWrap
              className="font-mono font-bold tracking-wider cursor-pointer transition-colors hover:text-blue-100"
              onClick={() => navigate(user ? "/dashboard" : "/")}
            >
              TASK MASTER
            </Typography>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Typography variant="subtitle1" className="hidden sm:block">
                  Welcome, {user.username}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  className="px-4 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  className="px-4 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/register")}
                  className="px-4 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
