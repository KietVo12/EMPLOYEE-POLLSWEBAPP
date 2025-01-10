import { Avatar, Grid, Stack, Typography, Container } from "@mui/material";
import Answer from "../../../../state/types/answer";
import { handleAnswerQuestion } from "../../../../state/modules/questions/thunks/answer_question";
import { Question, Option } from "../../../../state/modules/questions";
import LoadingStatus from "../../../../state/types/loading_status";
import OptionChoice from "./option_choice";
import { useAppDispatch } from "../../../app/hooks";
import { User } from "../../../../state/modules/users";
import { setSnackbar } from "../../../../state/modules/snackbar/snackbarSlice";

export interface IAnswerPollProps {
  question: Question;
  poster?: User | null;
  loading: LoadingStatus;
}

export default function AnswerPoll(props: IAnswerPollProps) {
  const { question, poster, loading } = props;
  const { id, author, optionOne, optionTwo } = question;
  const isLoading = loading === LoadingStatus.pending;

  const dispatch = useAppDispatch();

  const handleSubmitChoice = (option: Option) => {
    const answer = option === optionOne ? Answer.optionOne : Answer.optionTwo;
    dispatch(handleAnswerQuestion({ qid: id!, answer: answer })).then(() =>
      dispatch(setSnackbar("vote submitted successfully!"))
    );
  };
  return (
    <Container
      data-testid="answer-poll-container"
      sx={{
        maxWidth: { md: "md", lg: "lg", xl: "xl" },
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
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} lg={5.5}>
            <OptionChoice
              optionNum="one"
              option={optionOne}
              isLoading={isLoading}
              submitChoice={handleSubmitChoice}
            />
          </Grid>
          <Grid item xs={12} lg={1}>
            <Typography
              variant="h6"
              fontWeight="bold"
              color="text.secondary"
              align="center"
            >
              OR
            </Typography>
          </Grid>
          <Grid item xs={12} lg={5.5}>
            <OptionChoice
              optionNum="two"
              option={optionTwo}
              isLoading={isLoading}
              submitChoice={handleSubmitChoice}
            />
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}
