import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { handleInitialData } from "../../state/modules/shared/actions";
import { CssBaseline } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import PageRoutes from "../../state/types/page_routes";
import HomePage from "../features/home/home_page";
import LeaderboardPage from "../features/leaderboard/leaderboard_page";
import NewPollPage from "../features/new_poll/new_poll_page";
import PollPage from "../features/poll/poll_page";
import Login from "../features/login/login_page";
import PrivateRoutes from "../features/common/private_routes";
import SuccessSnackbar from "../features/common/success_snackbar";
import NotFoundPage from "../features/not_found/not_found_page";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(handleInitialData());
  }, [dispatch]);
  return (
    <>
      <CssBaseline />
      <SuccessSnackbar />
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route path={PageRoutes.Home} element={<HomePage />} />
          <Route path={PageRoutes.Leaderboard} element={<LeaderboardPage />} />
          <Route path={PageRoutes.Question} element={<PollPage />} />
          <Route path={PageRoutes.New} element={<NewPollPage />} />
          <Route path={PageRoutes.NotFound} element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to={PageRoutes.NotFound} />} />
        </Route>
        <Route path={PageRoutes.Login} element={<Login />} />
      </Routes>
    </>
  );
}
