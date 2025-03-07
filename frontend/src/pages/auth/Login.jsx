import { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  IconButton,
  InputAdornment,
  Grid,
  Divider,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoginError(null);
      await login(values);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setLoginError(err.response?.data?.message || "Failed to login");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    >
      <Box className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Typography
            component="h1"
            variant="h5"
            className="text-3xl font-bold tracking-tight"
          >
            Sign in
          </Typography>
        </div>

        {loginError && (
          <Alert severity="error" className="w-full rounded-lg">
            {loginError}
          </Alert>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form noValidate className="mt-8 space-y-6">
              <Grid container spacing={2} className="space-y-4">
                <Grid item xs={12}>
                  <Field name="email">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        autoComplete="email"
                        autoFocus
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        className="rounded-lg"
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="password">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        id="password"
                        autoComplete="current-password"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        className="rounded-lg"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev) => !prev)}
                                edge="end"
                                className="focus:outline-none"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    )}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>

        <Divider className="my-8" />

        <div className="text-center">
          <Link
            component={RouterLink}
            to="/register"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Don't have an account? Sign Up
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default Login;
