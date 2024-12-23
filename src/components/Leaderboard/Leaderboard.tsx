import { Avatar, Box, Container, Typography } from "@mui/material";
import { LeaderboardProps } from "./types";
import { DataGrid, GridColDef, GridSortItem } from "@mui/x-data-grid";
import { useAppSelector as select } from "../../redux/store";
import { getQuestions } from "../../redux/questions";
import { getUsers } from "../../redux/users";
import { useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";

const Leaderboard: React.FunctionComponent<LeaderboardProps> = (props) => {
  const questions = select(getQuestions());
  const users = select(getUsers());
  const rows = users.map((user) => {
    const answered = questions.filter((question) =>
      [...question.optionOne.votes, ...question.optionTwo.votes].includes(
        user.id
      )
    ).length;
    const created = questions.filter(
      (question) => question.author === user.id
    ).length;
    return {
      id: user.id,
      user: user.name,
      answered,
      created,
    };
  });

  const getUserAvatar = (id: string) => {
    const userDetails = users.find((u) => u.id === id);
    if (userDetails) {
      return (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
        >
          <Avatar
            src={userDetails.avatarURL}
            sx={{
              border: "2px solid #6200ea",
              width: 50,
              height: 50,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          />
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {userDetails.name}
          </Typography>
        </motion.div>
      );
    }
  };

  const columns: GridColDef[] = [
    {
      field: "user",
      headerName: "Users",
      flex: 2,
      renderCell: (params) => getUserAvatar(params.id as string),
    },
    {
      field: "answered",
      headerName: "Answered",
      flex: 1,
    },
    {
      field: "created",
      headerName: "Created",
      flex: 1,
    },
  ];

  const [sortModel, setSortModel] = useState<GridSortItem[]>([
    {
      field: "answered",
      sort: "desc",
    },
    {
      field: "created",
      sort: "desc",
    },
  ]);

  const handleHover = (target: HTMLDivElement | null) => {
    if (target) {
      anime({
        targets: target,
        backgroundColor: "#f3f3f3",
        duration: 300,
        easing: "easeInOutQuad",
      });
    }
  };

  return (
    <Container>
      <Typography
        variant="h3"
        textAlign="center"
        sx={{
          fontWeight: "bold",
          marginBottom: 4,
          fontSize: "2rem",
          color: "#333",
        }}
      >
        {props.title}
      </Typography>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          onMouseEnter={(e) => handleHover(e.currentTarget)}
          sx={{
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            disableSelectionOnClick
            autoHeight
            sortModel={sortModel}
            onSortModelChange={(model) => setSortModel(model)}
            sx={{
              "& .MuiDataGrid-row:hover": {
                backgroundColor: "#f5f5f5",
              },
              "& .MuiDataGrid-cell": {
                fontSize: "0.9rem",
                color: "#555",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#6200ea",
                color: "#fff",
                fontSize: "1rem",
                fontWeight: "bold",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#f9f9f9",
              },
            }}
          />
        </Box>
      </motion.div>
    </Container>
  );
};

export { Leaderboard };
