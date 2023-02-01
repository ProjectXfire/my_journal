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
import { RegisterSchema } from "../schemas";
// Custom hooks
import { useAuth } from "../hooks";

export const Register = () => {
  //--> Hooks

  const { errorMessage, status, startRegister } = useAuth();

  //--> Renders

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          displayName: "",
        }}
        validationSchema={RegisterSchema}
        onSubmit={({ displayName, email, password }) =>
          startRegister(displayName, email, password)
        }
      >
        {({ handleSubmit, getFieldProps, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={1}>
              <Grid item>
                <TextField
                  label="Username"
                  type="text"
                  {...getFieldProps("displayName")}
                  placeholder="username"
                  fullWidth
                  error={!!errors.displayName && touched.displayName}
                  helperText={touched.displayName && errors.displayName}
                  disabled={status === "checking"}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Email"
                  type="email"
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
                  {...getFieldProps("password")}
                  placeholder="********"
                  fullWidth
                  inputProps={{ "data-testid": "password-input" }}
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
                  aria-label="register-btn"
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={status === "checking"}
                >
                  Register
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      {status !== "checking" && (
        <Grid>
          <Grid item>
            <Typography sx={{ mt: 2 }}>
              If you already have an account click{" "}
              <Link component={NextLink} href="/login">
                here
              </Link>
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
