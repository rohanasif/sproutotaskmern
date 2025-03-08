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
    <AppBar position="sticky" className="z-50">
      <Container maxWidth="lg" className="px-4">
        <Toolbar
          disableGutters
          className="flex items-center justify-between min-h-[64px]"
        >
          {/* Logo and Title */}
          <Box className="flex items-center gap-2">
            <TaskAltIcon className="hidden md:block text-2xl" />
            <Typography
              variant="h6"
              noWrap
              className="font-mono font-bold tracking-wider cursor-pointer transition-colors hover:text-blue-100"
              onClick={() => navigate(user ? "/todos" : "/")}
            >
              TASK MASTER
            </Typography>
          </Box>

          {/* Auth Buttons */}
          <Box className="flex items-center gap-4">
            {user ? (
              <>
                <Typography
                  variant="subtitle1"
                  className="hidden sm:block my-0 leading-none"
                >
                  Welcome, {user.firstName}
                </Typography>
                <Button
                  color="inherit"
                  onClick={handleLogout}
                  className="min-h-0 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="inherit"
                  onClick={() => navigate("/login")}
                  className="min-h-0 px-4 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Login
                </Button>
                <Button
                  color="inherit"
                  onClick={() => navigate("/register")}
                  className="min-h-0 px-4 py-1.5 hover:bg-white/10 rounded-lg transition-colors"
                >
                  Register
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
