import { Container } from "@mui/material";
import Title from "../common/title";

export default function NotFoundPage() {
  return (
    <Container sx={{ mt: 4 }}>
      <Title
        title="404 Not Found"
        subTitle="The page you are looking for doesn't exist"
      />
    </Container>
  );
}
