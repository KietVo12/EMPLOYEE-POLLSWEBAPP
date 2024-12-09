import React, { useState } from 'react';
import {Container,Paper,Typography,TextField,Button,Box,Link,Avatar,Checkbox,} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/auth/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import '../Style/auth.css';

const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (error: any) {
      setError('Đăng nhập thất bại: ' + error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={10}
        sx={{
          padding: 4,
          marginTop: 8,
          borderRadius: 3,
          backgroundColor: 'white',
        }}
        className="bg-white shadow-md"
      >
        <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar
              sx={{
                backgroundColor: '#007bff', 
                width: 60, 
                height: 60, 
                marginBottom: '10px', 
              }}
            >
              <LockOutlinedIcon style={{ color: '#ffffff' }} />
            </Avatar>
            <Typography component="h1" variant="h5" style={{ color: '#007bff', fontWeight: 'bold' }}>
              Login
            </Typography>
            {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-mail"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 2, backgroundColor: '#f9f9f9' } }}
              className="mb-4 shadow-sm"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mật khẩu"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              InputProps={{ sx: { borderRadius: 2, backgroundColor: '#f9f9f9' } }}
              className="mb-4 shadow-sm"
            />
            <Box display="flex" alignItems="center" mt={1} className="mb-4">
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="text-blue-500"
              />
              <Typography variant="body2" className="text-gray-600">
                Nhớ mật khẩu
              </Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, height: 45, borderRadius: 2 }}
              className="bg-blue-500 hover:bg-blue-700 text-white shadow-md"
            >
              Login
            </Button>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{ display: 'block', textAlign: 'center', mb: 1 }}
              className="text-blue-500 hover:text-blue-700"
            >
              Forgot Password?
            </Link>

            <Box mt={3} textAlign="center">
              <Typography variant="body2" className="text-gray-600">
                 Don't have an account?{' '}
                <Link
                  component={RouterLink}
                  to="/register"
                  className="text-blue-500 hover:text-blue-700"
                >
                  Register Now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
