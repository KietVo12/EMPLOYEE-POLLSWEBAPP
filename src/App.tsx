import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth/AuthContext';
import PrivateRoute from './Pages/PrivateRoute';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import NewQuestionsPage from './Pages/NewQuestionsPage';
import CategoriesPage from './Pages/CategoriesPage';
import CategoryListPage from './Pages/CategoryListPage';
import CategoryDetailPage from './Pages/CategoryDetailPage';
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Routes bảo vệ */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/new-questions"
            element={
              <PrivateRoute>
                <NewQuestionsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/categories"
            element={
              <PrivateRoute>
                <CategoriesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/category-list"
            element={
              <PrivateRoute>
                <CategoryListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/category/:id"
            element={
              <PrivateRoute>
                <CategoryDetailPage />
              </PrivateRoute>
            }
          />
          {/* Routes công khai */}
          <Route path="/" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App
