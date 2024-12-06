import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Avatar, Paper } from '@mui/material';
import { LockOutlined as LockOutlinedIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';
import { useAuth } from '../context/auth/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import '../Style/auth.css';

const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Basic validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    setLoading(true);
    try {
      await register(email, password, { firstName, lastName, coverPhoto });
      setSuccess('Đăng ký thành công! Vui lòng đăng nhập.');
      setTimeout(() => navigate('/login'), 2000); // Redirect after 2 seconds
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Email đã được sử dụng.');
      } else if (error.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu.');
      } else {
        setError('Đăng ký thất bại: ' + error.message);
      }
    }
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Container component="main" maxWidth="sm">
        <Paper
          elevation={10}
          className="p-8 mt-8 rounded-lg bg-gray-800 text-white shadow-lg"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            className="space-y-6"
          >
            <Avatar className="bg-secondary-main">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" className="text-center mb-4">
              Đăng ký
            </Typography>
            {error && (
              <Typography color="error" variant="body2" className="mb-4">
                {error}
              </Typography>
            )}
            {success && (
              <Typography color="success.main" variant="body2" className="mb-4">
                {success}
              </Typography>
            )}
            <Box
              component="form"
              onSubmit={handleRegister}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row sm:space-x-4">
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  label="Họ"
                  name="firstName"
                  autoComplete="given-name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="filled"
                  className="bg-white rounded mb-4 sm:mb-0"
                  InputProps={{
                    sx: { borderRadius: 2, backgroundColor: 'white' },
                  }}
                />
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Tên"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  variant="filled"
                  className="bg-white rounded"
                  InputProps={{
                    sx: { borderRadius: 2, backgroundColor: 'white' },
                  }}
                />
              </div>
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
                variant="filled"
                className="bg-white rounded"
                InputProps={{
                  sx: { borderRadius: 2, backgroundColor: 'white' },
                }}
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
                onChange={(e) => setPassword(e.target.value)}
                variant="filled"
                className="bg-white rounded"
                InputProps={{
                  sx: { borderRadius: 2, backgroundColor: 'white' },
                }}
              />
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
                variant="filled"
                className="bg-white rounded"
                InputProps={{
                  sx: { borderRadius: 2, backgroundColor: 'white' },
                }}
              />

              <div className="my-4">
                <Typography variant="subtitle1" className="text-white mb-2">
                  Ảnh đại diện
                </Typography>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  className="mt-1 bg-blue-700 hover:bg-blue-800 text-white"
                >
                  Tải lên ảnh
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                {coverPhoto && (
                  <Typography variant="body2" className="mt-2 text-gray-300">
                    {coverPhoto.name}
                  </Typography>
                )}
              </div>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="mt-4 mb-2 bg-blue-500 hover:bg-blue-700 text-white h-12"
                disabled={loading}
              >
                {loading ? 'Đang đăng ký...' : 'Đăng ký'}
              </Button>
              <Box textAlign="center">
                <div className="flex justify-center items-center space-x-2">
                  <RouterLink
                    to="/"
                    className="text-blue-300 hover:text-blue-500"
                  >
                    Đã có tài khoản
                  </RouterLink>
                  <span className="text-white">|</span>
                  <RouterLink
                    to="/login"
                    className="text-blue-300 hover:text-blue-500"
                  >
                    Đăng nhập
                  </RouterLink>
                </div>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default RegisterPage;