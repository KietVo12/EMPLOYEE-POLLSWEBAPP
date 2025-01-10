import { Question } from "../../../../state/modules/questions";
import { Grid } from "@mui/material";
import PollCard from "./poll_card";

export interface IPollsProps {
  polls: Question[];
  isAnswered?: boolean;
}

export default function QuestionPolls(props: IPollsProps) {
  const { polls, isAnswered } = props;

  const testid = isAnswered ? "answered" : "unanswered";

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="center"
      data-testid={`${testid}-poll-container`}
    >
      {polls.map((poll) => {
        return (
          <Grid item key={poll.id} xs={12} lg={6}>
            <PollCard question={poll} isAnswered={isAnswered} />
          </Grid>
        );
      })}
    </Grid>
  );
}
