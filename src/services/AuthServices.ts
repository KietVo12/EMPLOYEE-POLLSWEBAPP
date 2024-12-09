import axios from "axios";

const API_URL = "http://localhost:5000";

export const sendForgotPassword = async (email: string) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async (email: string, otp: string, newPassword: string) => {
  return await axios.post(`${API_URL}/reset-password`, { email, otp, newPassword });
};
