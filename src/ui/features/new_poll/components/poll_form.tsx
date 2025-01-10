import { LoadingButton } from "@mui/lab";
import { Box, FormControl, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";

export interface IPollFormProps {
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  isLoading: boolean;
}

export default function PollForm(props: IPollFormProps) {
  const { onSubmit, isLoading } = props;
  const [title, setTitle] = useState("");
  return (
    <Box component="form" onSubmit={onSubmit}>
      <FormControl fullWidth>
        <Stack spacing={2}>
          <TextField
            inputProps={{ "data-testid": "option-one-text-field" }}
            id="optionOne"
            label="Option One"
            name="optionOne"
            multiline
            required
            fullWidth
          />
          <TextField
            inputProps={{ "data-testid": "option-two-text-field" }}
            id="optionTwo"
            label="Option Two"
            name="optionTwo"
            multiline
            required
            fullWidth
          />
        </Stack>
        <LoadingButton
          data-testid="submit-poll-button"
          variant="contained"
          sx={{ my: 1 }}
          fullWidth
          type="submit"
          loading={isLoading}
          loadingPosition="center"
        >
          <Typography variant="h6">Submit</Typography>
        </LoadingButton>
      </FormControl>
    </Box>
  );
}
