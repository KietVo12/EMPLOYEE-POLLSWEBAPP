import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { useAppSelector } from "../../../app/hooks";
import { Option } from "../../../../state/modules/questions";

export interface IOptionResultsProps {
  option: Option;
  overallVotes: number;
}
export default function OptionResults(props: IOptionResultsProps) {
  const { option, overallVotes } = props;
  const isVoted = useAppSelector(
    (state) =>
      state.authedUser.entities !== null &&
      option.votes.includes(state.authedUser.entities)
  );

  const votes = option.votes.length;
  const results = (votes / overallVotes) * 100;

  return (
    <Box width="100%">
      <Stack direction="row" width="100%" justifyContent="space-between">
        <Typography>{option.text}</Typography>
        {/* small devices and up */}
        <Box
          sx={{ display: { xs: "none", sm: "flex" } }}
          display="flex"
          gap={1}
        >
          <Typography fontSize="body2" color="text.secondary">
            {votes} Votes
          </Typography>

          <Typography fontSize="body1" fontWeight="bold">
            {results.toFixed(2)}%
          </Typography>
        </Box>
      </Stack>
      <LinearProgress
        sx={{
          width: "100%",
          height: "1.5rem",
          borderRadius: "0.5rem",
          [`& .${linearProgressClasses.bar}`]: {
            borderRadius: "0.5rem",
          },
        }}
        color={isVoted ? "success" : "primary"}
        variant="determinate"
        value={results}
      />
      <Box display="block">
        {isVoted && (
          <Typography sx={{ float: "left" }} color="success.main">
            Your Vote!
          </Typography>
        )}
        {/* x-small devices */}
        <Box
          sx={{
            display: { xs: "inhirit", sm: "none" },
            float: "right",
          }}
          gap={1}
        >
          <Stack direction="row" gap={1}>
            <Typography fontSize="body2" color="text.secondary">
              {votes} Votes
            </Typography>

            <Typography fontSize="body1" fontWeight="bold">
              {results.toFixed(2)}%
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
