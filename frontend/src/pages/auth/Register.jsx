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
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters"),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setRegisterError(null);
      await register({
        firstName: values.firstName,
        lastName: values.lastName,
        username: values.username,
        email: values.email,
        password: values.password,
      });
      navigate("/login", { replace: true });
    } catch (err) {
      setRegisterError(err.response?.data?.message || "Failed to register");
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
            Sign up
          </Typography>
        </div>

        {registerError && (
          <Alert severity="error" className="w-full rounded-lg">
            {registerError}
          </Alert>
        )}

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
        >
          {({ isSubmitting }) => (
            <Form noValidate className="mt-8 space-y-6">
              <Grid container spacing={2} className="space-y-4">
                <Grid item xs={12} sm={6} className="sm:pr-2">
                  <Field name="firstName">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoComplete="given-name"
                        autoFocus
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        className="rounded-lg"
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12} sm={6} className="sm:pl-2">
                  <Field name="lastName">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        autoComplete="family-name"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        className="rounded-lg"
                      />
                    )}
                  </Field>
                </Grid>
                <Grid item xs={12}>
                  <Field name="username">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        autoComplete="username"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        className="rounded-lg"
                      />
                    )}
                  </Field>
                </Grid>
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
                        autoComplete="new-password"
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
                  <Field name="confirmPassword">
                    {({ field, meta }) => (
                      <TextField
                        {...field}
                        required
                        fullWidth
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        autoComplete="new-password"
                        error={meta.touched && Boolean(meta.error)}
                        helperText={meta.touched && meta.error}
                        className="rounded-lg"
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() =>
                                  setShowConfirmPassword((prev) => !prev)
                                }
                                edge="end"
                                className="focus:outline-none"
                              >
                                {showConfirmPassword ? (
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
                    {isSubmitting ? "Signing up..." : "Sign Up"}
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
            to="/login"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Already have an account? Sign in
          </Link>
        </div>
      </Box>
    </Container>
  );
};

export default Register;
