import React, { useState } from "react";
import { Card, CardContent, Typography, Button, Stack, Avatar, Paper } from "@mui/material";
import { Question } from "../../config/types";
import { motion } from "framer-motion";

const QuestionCard = ({ question }: { question: Question }) => {
  const [isViewPoll, setIsViewPoll] = useState(false);

  const handleShowPoll = () => setIsViewPoll(true);
  const handleBack = () => setIsViewPoll(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: 8,
          borderRadius: 10,
          textAlign: "center",
          background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
          overflow: "hidden",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        {isViewPoll ? (
          <CardContent>
            {/* Hiển thị View Poll */}
            <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 2 }}>
              Poll by {question.author}
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "text.secondary", fontSize: "1rem", mb: 3 }}
            >
              Would you rather {question.optionOne.text} or {question.optionTwo.text}?
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleBack}
              sx={{
                background: "linear-gradient(90deg, #6200ea, #ff4081)",
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "20px",
              }}
            >
              BACK
            </Button>
          </CardContent>
        ) : (
          <CardContent>
            {/* Hiển thị thông tin cơ bản */}
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Avatar
                alt={question.author}
                sx={{
                  width: 56,
                  height: 56,
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                  backgroundColor: "#f50057",
                  color: "#fff",
                  fontSize: "1.5rem",
                }}
              >
                {question.author.charAt(0)}
              </Avatar>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {question.author}
              </Typography>
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {new Date(question.timestamp).toLocaleString()}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShowPoll}
              sx={{
                background: "linear-gradient(90deg, #ff4081, #6200ea)",
                color: "#fff",
                fontWeight: "bold",
                ":hover": {
                  background: "linear-gradient(90deg, #6200ea, #ff4081)",
                },
                borderRadius: "40px",
              }}
            >
              SHOW
            </Button>
          </CardContent>
        )}
      </Paper>
    </motion.div>
  );
};

export default QuestionCard;
