import { Dispatch } from "@reduxjs/toolkit";
import { getInitialData } from "../../apis/api";
import { receiveQuestions } from "../questions";
import { receiveUsers } from "../users";

export function handleInitialData() {
  return (dispatch: Dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
