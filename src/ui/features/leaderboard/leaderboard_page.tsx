import { Container, LinearProgress } from "@mui/material";

import LoadingStatus from "../../../state/types/loading_status";
import { sortUsers } from "../../../state/utils/helpers";
import { useAppSelector } from "../../app/hooks";

import LeaderboardTable from "./components/leaderboard_table";
import Title from "../common/title";

export default function LeaderboardPage() {
  const { entities: users, loading } = useAppSelector((state) => state.users);
  const sortedUsers = sortUsers(users);

  if (loading === LoadingStatus.idle) {
    return <LinearProgress />;
  }
  return (
    <Container
      maxWidth="md"
      sx={{
        my: 3,
        py: 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        borderRadius: "1rem",
      }}
    >
      <Title title="Leaderboard" />
      <LeaderboardTable users={sortedUsers} />
    </Container>
  );
}
