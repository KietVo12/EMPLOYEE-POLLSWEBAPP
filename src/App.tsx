import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import Header from "./components/Header/Header";
import { Home } from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import Login from "./components/Login";
import { useAppDispatch } from "./redux/store";
import { QuestionManage, QuestionNew } from "./components/Question";
import { RequireAuth } from "./components/RequireAuth";
import { usersActions } from "./redux/users";
import { questionsActions } from "./redux/questions";
import { homeProps, leaderboardProps, CreatenewquestionProps, loginProps } from "./config/sections";
import { ThemeContextProvider } from "./context/ThemeContext";
const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.loadUsers());
    dispatch(questionsActions.loadQuestions());
  }, [dispatch]);

  return (
    <ThemeContextProvider>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            path={homeProps.path}
            element={
              <RequireAuth>
                <Header tabs={[homeProps, leaderboardProps, CreatenewquestionProps]} />
              </RequireAuth>
            }
          >
            <Route index element={<Home {...homeProps} />} />
            <Route
              path={leaderboardProps.path}
              element={<Leaderboard {...leaderboardProps} />}
            />
            <Route path={CreatenewquestionProps.path} element={<QuestionNew />} />
            <Route path="/questions/:id" element={<QuestionManage />} />
          </Route>

          <Route path={loginProps.path} element={<Login {...loginProps} />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  );
};

export default App;
