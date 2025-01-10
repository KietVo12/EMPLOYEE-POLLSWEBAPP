import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Question } from "../../../../state/modules/questions";
import { formatDate } from "../../../../state/utils/helpers";
import { useAppSelector } from "../../../app/hooks";

export interface IPollCardProps {
  question: Question;
  isAnswered?: boolean;
}

export default function PollCard(props: IPollCardProps) {
  const { question, isAnswered } = props;
  const { author, optionOne, optionTwo, timestamp, id } = question;
  const { name, avatarURL } = useAppSelector(
    (state) => state.users.entities[author]
  );
  const date = formatDate(timestamp);
  return (
    <Card elevation={2} sx={{ display: "flex" }}>
      <CardMedia
        sx={{
          display: { xs: "none", sm: "block" },
          width: "7rem",
          height: "7rem",
          pt: 2,
          pl: 2,
        }}
      >
        <Avatar
          src={avatarURL}
          alt={name}
          sx={{
            width: "auto",
            height: "100%",
          }}
        ></Avatar>
      </CardMedia>
      <CardContent sx={{ flex: 1, display: "block" }}>
        <Box display="flex" justifyContent="space-between" flexWrap="wrap">
          <Box>
            <Typography component="span" color="primary">
              {name}
            </Typography>
            <Typography component="span"> ask</Typography>
          </Box>
          <Typography color="text.secondary" variant="body2">
            {date}
          </Typography>
        </Box>

        <Typography variant="h5" pb={1.5} pt={1}>
          Would you rather
        </Typography>
        <Typography textOverflow="ellipsis">{optionOne.text}</Typography>
        <Typography
          py={0.5}
          px="3rem"
          sx={{ textAlign: { lg: "center" } }}
          color="text.secondary"
        >
          or
        </Typography>

        <Typography pb={2} textOverflow="ellipsis">
          {optionTwo.text}
        </Typography>
        <Button
          component={Link}
          to={`questions/${id}`}
          fullWidth
          variant="contained"
          color={isAnswered ? "secondary" : "primary"}
        >
          {isAnswered ? (
            <Typography variant="body1">View Results</Typography>
          ) : (
            <Typography variant="body1">Vote</Typography>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
