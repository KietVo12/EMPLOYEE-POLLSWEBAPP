import { Snackbar, Typography, IconButton } from "@mui/material";
import { clearSnackbar } from "../../../state/modules/snackbar/snackbarSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import CloseIcon from "@mui/icons-material/Close";
export default function SuccessSnackbar() {
  const dispatch = useAppDispatch();

  const { message, isOpen } = useAppSelector((state) => state.snackbar);

  const handleClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <Snackbar
      color="success"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      sx={{
        "& .MuiSnackbarContent-root": {
          background: (theme) => theme.palette.success.main,
        },
      }}
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={<Typography color="white">{message}</Typography>}
      action={[
        <IconButton key={message} onClick={handleClose}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>,
      ]}
    />
  );
}
