import React from "react";
import NextLink from "next/link";
// External libraries
import {
  Alert,
  Button,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form } from "formik";
// Schemas
import { LoginSchema } from "../schemas";
import { GitHub, Google } from "@mui/icons-material";
// Custom hooks
import { useAuth } from "../hooks";

export const Login = () => {
  //--> Hooks

  const {
    errorMessage,
    status,
    onSubmit,
    startGoogleSignIn,
    startGitHubSignIn,
  } = useAuth();

  //--> Renders

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={({ email, password }) => onSubmit(email, password)}
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  label="Email"
                  type="email"
                  aria-label="email-input"
                  {...getFieldProps("email")}
                  placeholder="email@domain.com"
                  fullWidth
                  error={!!errors.email && touched.email}
                  helperText={touched.email && errors.email}
                  disabled={status === "checking"}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Password"
                  type="password"
                  aria-label="password-input"
                  inputProps={{ "data-testid": "password-input" }}
                  {...getFieldProps("password")}
                  placeholder="********"
                  fullWidth
                  error={!!errors.password && touched.password}
                  helperText={touched.password && errors.password}
                  disabled={status === "checking"}
                />
              </Grid>
              {errorMessage && (
                <Grid item>
                  <Alert severity="error">{errorMessage}</Alert>
                </Grid>
              )}
              <Grid item>
                <Button
                  sx={{ mt: 1, mb: 1 }}
                  aria-label="signin-btn"
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={status === "checking"}
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      <Grid>
        <Grid item>
          <Button
            sx={{ mt: 1, mb: 1 }}
            aria-label="google-btn"
            color="secondary"
            fullWidth
            type="submit"
            variant="contained"
            disabled={status === "checking"}
            onClick={startGoogleSignIn}
          >
            <Google />
          </Button>
          <Button
            sx={{ mt: 1, mb: 1 }}
            aria-label="github-btn"
            color="secondary"
            fullWidth
            type="submit"
            variant="contained"
            disabled={status === "checking"}
            onClick={startGitHubSignIn}
          >
            <GitHub />
          </Button>
          {status !== "checking" && (
            <Typography sx={{ mt: 2 }}>
              If you do not have an account please click{" "}
              <Link component={NextLink} href="/register">
                here
              </Link>
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};
