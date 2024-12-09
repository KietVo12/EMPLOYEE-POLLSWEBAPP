import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Avatar, Paper, } from '@mui/material';
import { LockOutlined as LockOutlinedIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useAuth } from '../context/auth/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import '../Style/auth.css';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, { coverPhoto });
      setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
      setTimeout(() => navigate('/login'), 2000); // Redirect sau 2 giây
    } catch (error: any) {
      setError('Đăng ký thất bại: ' + error.message);
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  // Hàm tính độ mạnh mật khẩu
  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return 'Yếu';
    if (password.match(/[a-z]/) && password.match(/[A-Z]/) && password.match(/[0-9]/) && password.length >= 8) {
      return 'Mạnh';
    }
    if (password.match(/[a-zA-Z]/) && password.match(/[0-9]/)) {
      return 'Trung bình';
    }
    return 'Yếu';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordStrength(checkPasswordStrength(value));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container component="main" maxWidth="xs">
        <Paper elevation={10} className="p-6 bg-white rounded-lg shadow-lg">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className="space-y-4"
          >
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
                  Register
              </Typography>

            {error && <Typography color="error" variant="body2">{error}</Typography>}
            {success && <Typography color="success.main" variant="body2">{success}</Typography>}

            <Box component="form" onSubmit={handleRegister} className="w-full">
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                className="bg-white rounded"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="new-password"
                value={password}
                onChange={handlePasswordChange}
                variant="outlined"
                className="bg-white rounded"
              />
              {/* Hiển thị độ mạnh của mật khẩu */}
              {password && (
                <Typography
                  variant="body2"
                  className={`mt-1 ${
                    passwordStrength === 'Mạnh'
                      ? 'text-green-600'
                      : passwordStrength === 'Trung bình'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  Độ mạnh mật khẩu: {passwordStrength}
                </Typography>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Xác nhận mật khẩu"
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                variant="outlined"
                className="bg-white rounded"
              />
              {/* Phần upload ảnh */}
              <div className="my-4">
                <Typography variant="subtitle1" className="text-gray-800 mb-2">
                  Ảnh 
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  className="mt-1 bg-blue-500 hover:bg-blue-700 text-white"
                >
                  Tải lên ảnh
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {coverPhoto && (
                  <Typography variant="body2" className="mt-2 text-gray-600">
                    {coverPhoto.name}
                  </Typography>
                )}
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="mt-4 mb-2 bg-blue-500 hover:bg-blue-700 text-white"
                disabled={loading}
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
              <Box mt={3} textAlign="center">
                <Typography variant="body2" className="text-gray-600">
                  Already have an account?{' '}
                    <RouterLink
                       to="/login"
                       className="text-blue-500 hover:text-blue-700">
                           Login now
                    </RouterLink>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterPage;
