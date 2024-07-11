import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../slices/authSlice";
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Link,
  Box,
  Alert,
  Card,
  CardContent,
} from "@mui/material";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [credentials, setCredentials] = React.useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      return alert("Passwords do not match");
    }
    dispatch(
      register({
        username: credentials.username,
        password: credentials.password,
      })
    ).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/products");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card
        style={{
          width: "100%",
          border: "2px solid rgb(25 118 210)",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 4px 8px 0px",
          marginTop: "16px",
        }}
      >
        <CardContent>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={credentials.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={credentials.password}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                value={credentials.confirmPassword}
                onChange={handleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
                disabled={authStatus === "loading"}
              >
                Sign Up
              </Button>
              {authStatus === "failed" && (
                <Alert severity="error">{authError}</Alert>
              )}
              <Typography variant="body2" color="textSecondary" align="center">
                Already have an account?{" "}
                <Link href="/login" variant="body2">
                  Sign in
                </Link>
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
