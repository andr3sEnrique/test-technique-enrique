import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../slices/authSlice';
import { Container, CssBaseline, Typography, TextField, Button, Link, Box, Alert, Card, CardContent } from '@mui/material';

export default function LoginFinal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);

  const [credentials, setCredentials] = React.useState({ username: '', password: '' });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/products');
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card style={{
          width: '100%',
          border: '2px solid rgb(25 118 210)',
          boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px',
          marginTop: '16px',
      }}>
        <CardContent>
        <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Welcome!
        </Typography>
        <Typography component="h2" variant="body2">
          Sign in to continue.
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
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, mb: 2 }}
            disabled={authStatus === 'loading'}
          >
            Log in
          </Button>
          {authStatus === 'failed' && <Alert severity="error">{authError}</Alert>}
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
          >
            Don&apos;t have an account?{' '}
            <Link href="/register" variant="body2">
              Sign up
            </Link>
          </Typography>
        </Box>
      </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
