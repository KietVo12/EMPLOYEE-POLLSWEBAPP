import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Share, Edit, Delete } from "@mui/icons-material";
import { format } from "date-fns";
import {
  _saveQuestion,
  _getQuestions,
  _deleteQuestion,
  _editQuestion,
} from "../../service/_DATA";

interface Poll {
  id: string;
  question: string;
  createdAt: string;
}

const PollManagement: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [editPoll, setEditPoll] = useState<Poll | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch polls from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await _getQuestions();
        const formattedPolls = Object.values(data).map((poll: any) => ({
          id: poll.id,
          question: poll.optionOne.text,
          createdAt: new Date(poll.timestamp).toISOString(),
        }));
        setPolls(formattedPolls);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu câu hỏi:", error);
      }
    };

    fetchQuestions();
  }, []);

  // Add new poll
  const handleAddPoll = async () => {
    if (newQuestion.trim() === "") {
      setSnackbarMessage("Câu hỏi không được để trống!");
      return;
    }

    const questionData = {
      optionOneText: newQuestion,
      optionTwoText: "Default Option",
      author: "Admin",
    };

    try {
      const newPoll = await _saveQuestion(questionData);
      setPolls((prevPolls) => [
        {
          id: newPoll.id,
          question: newPoll.optionOne.text,
          createdAt: new Date(newPoll.timestamp).toISOString(),
        },
        ...prevPolls,
      ]);
      setNewQuestion(""); // Clear input
      setSnackbarMessage("Câu hỏi đã được thêm thành công!");
    } catch (error) {
      console.error("Lỗi khi thêm câu hỏi:", error);
      setSnackbarMessage("Không thể thêm câu hỏi.");
    }
  };

  // Delete poll
  const handleDeletePoll = async (id: string) => {
    try {
      await _deleteQuestion(id);
      setPolls((prevPolls) => prevPolls.filter((poll) => poll.id !== id));
      setSnackbarMessage("Câu hỏi đã được xóa!");
    } catch (error) {
      console.error("Lỗi khi xóa câu hỏi:", error);
      setSnackbarMessage("Không thể xóa câu hỏi.");
    }
  };

  // Save edits to a poll
  const handleSaveEdit = async () => {
    if (editPoll) {
      try {
        const updatedData = { optionOne: { text: editPoll.question, votes: [] } };
        await _editQuestion(editPoll.id, updatedData);
        setPolls((prevPolls) =>
          prevPolls.map((poll) =>
            poll.id === editPoll.id ? { ...poll, question: editPoll.question } : poll
          )
        );
        setEditPoll(null);
        setSnackbarMessage("Câu hỏi đã được chỉnh sửa!");
      } catch (error) {
        console.error("Lỗi khi chỉnh sửa câu hỏi:", error);
        setSnackbarMessage("Không thể chỉnh sửa câu hỏi.");
      }
    }
  };

  // Share poll URL
  const handleSharePoll = (id: string) => {
    const shareUrl = `${window.location.origin}/polls/${id}`;
    navigator.clipboard.writeText(shareUrl);
    setSnackbarMessage("Đã sao chép liên kết câu hỏi!");
  };

  return (
    <Box
      sx={{
        padding: "20px",
        maxWidth: "800px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <Typography variant="h4" mb={2}>
        Quản Lý Câu Hỏi
      </Typography>

      {/* Form thêm mới */}
      <Box mb={3}>
        <TextField
          fullWidth
          variant="outlined"
          label="Thêm câu hỏi mới"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          sx={{ marginBottom: "10px" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddPoll}
          disabled={!newQuestion.trim()}
        >
          Thêm Câu Hỏi
        </Button>
      </Box>

      {/* Danh sách câu hỏi */}
      <List>
        {polls.map((poll) => (
          <ListItem
            key={poll.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 0",
              borderBottom: "1px solid #ddd",
            }}
          >
            <ListItemText
              primary={poll.question}
              secondary={`Ngày tạo: ${format(
                new Date(poll.createdAt),
                "dd/MM/yyyy HH:mm:ss"
              )}`}
              sx={{ color: "#000" }}
            />
            <Box>
              <IconButton
                color="primary"
                onClick={() => handleSharePoll(poll.id)}
              >
                <Share />
              </IconButton>
              <IconButton
                color="secondary"
                onClick={() =>
                  setEditPoll({
                    id: poll.id,
                    question: poll.question,
                    createdAt: poll.createdAt,
                  })
                }
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                onClick={() => handleDeletePoll(poll.id)}
              >
                <Delete />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Dialog chỉnh sửa câu hỏi */}
      <Dialog open={!!editPoll} onClose={() => setEditPoll(null)}>
        <DialogTitle>Chỉnh Sửa Câu Hỏi</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            variant="outlined"
            value={editPoll?.question || ""}
            onChange={(e) =>
              setEditPoll((prev) =>
                prev ? { ...prev, question: e.target.value } : null
              )
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditPoll(null)} color="inherit">
            Hủy
          </Button>
          <Button
            onClick={handleSaveEdit}
            color="primary"
            disabled={!editPoll?.question.trim()}
          >
            Lưu
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar notification */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={3000}
        onClose={() => setSnackbarMessage("")}
        message={snackbarMessage}
      />
    </Box>
  );
};

export default PollManagement;
