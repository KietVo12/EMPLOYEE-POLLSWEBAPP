import Answer from "../types/answer";
import { Question } from "../modules/questions";
import { User } from "../modules/users";
import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "./_DATA";

export function getInitialData(): Promise<{
  users: Record<string, User>;
  questions: Record<string, Question>;
}> {
  return Promise.all([_getUsers(), _getQuestions()]).then(
    ([users, questions]) => ({
      users,
      questions,
    })
  );
}

export function saveQuestion(question: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}): Promise<Question> {
  return _saveQuestion(question);
}

export function saveQuestionAnswer({
  authedUser,
  qid,
  answer,
}: {
  authedUser: string;
  qid: string;
  answer: Answer;
}): Promise<boolean> {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}
