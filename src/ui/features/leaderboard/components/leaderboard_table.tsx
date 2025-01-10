import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { User } from "../../../../state/modules/users";

export interface ILeaderboardTableProps {
  users: User[];
}

export default function LeaderboardTable(props: ILeaderboardTableProps) {
  const { users } = props;
  return (
    <TableContainer
      component={Paper}
      sx={{
        overflow: "auto",
      }}
    >
      <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "primary.400"
                    : "primary.main",
              }}
            >
              <TableCell colSpan={2}>
                <Typography variant="body1" color="white">
                  Users
                </Typography>
              </TableCell>
              <TableCell align="center">
                {" "}
                <Typography variant="body1" color="white">
                  Answers
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" color="white">
                  Created
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body1" color="white">
                  Score
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody data-testid="leaderboard-table-body">
            {users.map((user) => {
              const numAnswers = Object.keys(user.answers).length;
              const numQuestions = user.questions.length;
              const score = numAnswers + numQuestions;
              return (
                <TableRow key={user.id}>
                  <TableCell colSpan={2}>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Avatar
                        src={user.avatarURL}
                        alt={user.name}
                        sx={{ display: { xs: "none", sm: "flex" } }}
                      ></Avatar>
                      <Box sx={{ flexDirection: "column" }}>
                        <Typography variant="body1">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {user.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell align="center">{numAnswers}</TableCell>
                  <TableCell align="center">{numQuestions}</TableCell>
                  <TableCell align="center">{score}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
    </TableContainer>
  );
}
