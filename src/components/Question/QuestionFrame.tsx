import { Avatar, Box, Button, Stack, TextField, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useState } from "react";
import { QuestionFrameProps } from "./types";
import { _saveQuestion } from "../../service/_DATA";

const QuestionFrame = ({ name, avatarURL }: QuestionFrameProps) => {
  const [optionOneText, setOptionOneText] = useState("");
  const [optionTwoText, setOptionTwoText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!optionOneText || !optionTwoText) {
      alert("Both options are required!");
      return;
    }

    setIsSubmitting(true);
    try {
      await _saveQuestion({
        optionOneText,
        optionTwoText,
        author: name, // Dùng tên người dùng hiện tại
      });
      alert("Question successfully created!");
      setOptionOneText("");
      setOptionTwoText("");
    } catch (error) {
      alert("Failed to create question.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        spacing={4}
        sx={{
          textAlign: "center",
          mt: 5,
          p: 4,
          backgroundColor: "#fff",
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Tiêu đề */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "primary.main",
            textTransform: "uppercase",
          }}
        >
          Poll by {name}
        </Typography>

        {/* Avatar */}
        <Avatar
          alt={name}
          src={avatarURL}
          sx={{
            width: 120,
            height: 120,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          }}
        />

        {/* Nội dung */}
        <Typography variant="h5" sx={{ color: "#555", fontStyle: "italic" }}>
          Would you rather...
        </Typography>

        {/* Form nhập liệu */}
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ width: "100%", maxWidth: 400 }}
        >
          <TextField
            fullWidth
            label="Option One"
            variant="outlined"
            value={optionOneText}
            onChange={(e) => setOptionOneText(e.target.value)}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            label="Option Two"
            variant="outlined"
            value={optionTwoText}
            onChange={(e) => setOptionTwoText(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            disabled={isSubmitting}
            sx={{
              textTransform: "uppercase",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #6200ea, #ff4081)",
              ":hover": {
                background: "linear-gradient(90deg, #ff4081, #6200ea)",
              },
            }}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Box>
      </Stack>
    </motion.div>
  );
};

export default QuestionFrame;
