// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import {Container,Paper,Typography,TextField,Button,Box,Link,Avatar,Grid,Checkbox,Divider} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuth } from '../context/auth/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import '../Style/auth.css';

const LoginPage: React.FC = () => {
  const { login,} = useAuth();
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

  const handleGithubLogin = async () => {
    setError(null);
    try {
      navigate('/');
    } catch (error: any) {
      setError('Đăng nhập bằng GitHub thất bại: ' + error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={10} sx={{ padding: 4, marginTop: 8, borderRadius: 3 }} className="bg-white shadow-md">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} className="bg-blue-500">
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" className="text-center text-gray-800">
            Đăng nhập
          </Typography>
          {error && <Typography color="error" variant="body2" sx={{ mt: 1 }}>{error}</Typography>}
          <Box component="form" onSubmit={handleLogin} sx={{ mt: 1 }} className="w-full">
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
              InputProps={{ sx: { borderRadius: 2, backgroundColor: 'white' } }}
              className="mb-4"
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
              InputProps={{ sx: { borderRadius: 2, backgroundColor: 'white' } }}
              className="mb-4"
            />
            <Box display="flex" alignItems="center" mt={1} className="mb-4">
              <Checkbox
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="text-blue-500"
              />
              <Typography variant="body2" className="text-gray-600">Nhớ tôi nhé</Typography>
            </Box>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, height: 45 }}
              className="bg-blue-500 hover:bg-blue-700 text-white"
            >
              Đăng nhập
            </Button>
            <Link
              component={RouterLink}
              to="/forgot-password"
              variant="body2"
              sx={{ display: 'block', textAlign: 'center', mb: 1 }}
              className="text-blue-500 hover:text-blue-700"
            >
              Quên mật khẩu?
            </Link>

            <Divider sx={{ my: 2 }} className="text-gray-500">hoặc</Divider>

            <Grid container spacing={2} justifyContent="center">
              {/* Loại bỏ phần đăng nhập bằng Google */}
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<GitHubIcon />}
                  sx={{ height: 45, color: '#333', borderColor: '#333' }}
                  onClick={handleGithubLogin}
                  className="hover:bg-gray-100"
                >
                  GitHub
                </Button>
              </Grid>
            </Grid>

            <Box mt={3} textAlign="center">
              <Typography variant="body2" className="text-gray-600">
                Không có tài khoản?{' '}
                <Link component={RouterLink} to="/register" className="text-blue-500 hover:text-blue-700">
                  Đăng ký
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