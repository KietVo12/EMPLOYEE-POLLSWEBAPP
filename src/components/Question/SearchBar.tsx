import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

interface Poll {
  id: string;
  question: string;
}

interface SearchBarProps {
  polls: Poll[];
}

const validationSchema = Yup.object({
  searchTerm: Yup.string()
    .trim()
    .min(1, "Từ khóa phải có ít nhất 1 ký tự")
    .required("Từ khóa là bắt buộc"),
});

const SearchBar: React.FC<SearchBarProps> = ({ polls }) => {
  const [filteredPolls, setFilteredPolls] = useState<Poll[]>([]);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSearch(values.searchTerm);
    },
  });

  const handleSearch = (searchTerm: string) => {
    const results = polls.filter((poll) =>
      poll.question.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPolls(results);
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      if (formik.values.searchTerm.trim()) {
        formik.submitForm();
      } else {
        setFilteredPolls([]); // Nếu từ khóa rỗng, hiển thị trống
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [formik.values.searchTerm, polls]);

  return (
    <Box sx={{ maxWidth: "500px", margin: "0 auto" }}>
      <form onSubmit={formik.handleSubmit}>
        <Box display="flex" alignItems="center" gap={1}>
          <Input
            id="searchTerm"
            name="searchTerm"
            value={formik.values.searchTerm}
            onChange={formik.handleChange}
            placeholder="Tìm kiếm..."
            fullWidth
            sx={{
              padding: "8px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <IconButton type="submit" color="primary">
            <SearchIcon />
          </IconButton>
        </Box>
      </form>

      {filteredPolls.length > 0 ? (
        <List>
          {filteredPolls.map((poll) => (
            <ListItem
              key={poll.id}
              button
              onClick={() => navigate(`/poll-management/${poll.id}`)}
            >
              <ListItemText primary={poll.question} />
            </ListItem>
          ))}
        </List>
      ) : (
        formik.values.searchTerm.trim() && (
          <Typography variant="body2" color="text.secondary" mt={2}>
            Không tìm thấy kết quả phù hợp.
          </Typography>
        )
      )}
    </Box>
  );
};

export default SearchBar;
