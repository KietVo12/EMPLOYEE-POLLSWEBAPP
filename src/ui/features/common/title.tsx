import { Box, Typography } from "@mui/material";

export interface ITitleProps {
  title: string;
  subTitle?: string;
}

export default function Title(props: ITitleProps) {
  const { title, subTitle } = props;

  return (
    <Box>
      <Typography component="h1" variant="h3" align="center">
        {title}
      </Typography>
      {subTitle && (
        <Typography
          component="h2"
          variant="h4"
          align="center"
          color="text.secondary"
          gutterBottom
        >
          {subTitle}
        </Typography>
      )}
    </Box>
  );
}
