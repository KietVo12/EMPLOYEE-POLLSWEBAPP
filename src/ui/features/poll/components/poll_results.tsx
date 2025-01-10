import { Typography, Container, Avatar, Stack, Paper } from "@mui/material";
import { Question } from "../../../../state/modules/questions";

import OptionResults from "./option_results";
import { User } from "../../../../state/modules/users";

export interface IPollResultsProps {
  question: Question;
  poster?: User | null;
}

export default function PollResults(props: IPollResultsProps) {
  const { question, poster } = props;
  const { optionOne, optionTwo, author } = question;
  const overallVotes = optionOne.votes.length + optionTwo.votes.length;
  return (
    <Container
      maxWidth="md"
      data-testid="poll-results-container"
      sx={{
        my: 3,
        py: 3,
        display: "flex",
        flexDirection: "column",

        gap: 3,
      }}
    >
      <Stack alignItems="center" gap={4}>
        <Typography component="h1" variant="h3" align="center">
          Poll By {poster?.name ?? author}
        </Typography>
        <Avatar
          src={poster?.avatarURL}
          alt={author}
          sx={{
            width: { lg: "12rem", md: "8rem", xs: "6rem" },
            height: { lg: "12rem", md: "8rem", xs: "6rem" },
          }}
        />
        <Typography component="h1" variant="h3" align="center">
          Would You Rather
        </Typography>

        <Stack component={Paper} p={2} width="100%" gap={2}>
          <OptionResults option={optionOne} overallVotes={overallVotes} />
          <OptionResults option={optionTwo} overallVotes={overallVotes} />
        </Stack>
      </Stack>
    </Container>
  );
}