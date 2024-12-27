import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { _saveQuestionAnswer } from "../../service/_DATA";
import { fetchUsers } from "../../redux/userSlice";
import { fetchQuestions } from "../../redux/questionSlice";
import NotFound from "./NotFound";
import { Answer, Question, User } from "../../config/types";

interface RootState {
  auth: { authedId: string };
  user: { users: Record<string, User> };
  question: { questions: Record<string, Question> };
}

const QuestionDetail: React.FC = () => {
  const { question_id } = useParams<{ question_id: string }>(); 
  const authedId = useSelector((state: RootState) => state.auth.authedId); 
  const users = useSelector((state: RootState) => state.user.users); 
  const questions = useSelector((state: RootState) => state.question.questions); 
  const [user, setUser] = useState<User | null>(null);
  const [question, setQuestion] = useState<Question & { isVoted: boolean; totalVoted: number; optionOne: { percent: number; isVoted: boolean } & Question["optionOne"]; optionTwo: { percent: number; isVoted: boolean } & Question["optionTwo"] } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleVote = async (ev: React.MouseEvent<HTMLButtonElement>, option: "optionOne" | "optionTwo") => {
    ev.preventDefault();

    if (!question_id) return;

    const answer: Answer = {
      authedUser: authedId,
      qid: question_id,
      answer: option,
    };

    setLoading(true); 
    try {
      await _saveQuestionAnswer(answer); 
      await dispatch(fetchUsers() as any); 
      await dispatch(fetchQuestions() as any); 
    } catch (error) {
      console.error("Failed to save answer:", error);
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    if (question_id && questions[question_id]) {
      const q = {
        ...questions[question_id],
        isVoted: false,
        totalVoted: 0,
        optionOne: { ...questions[question_id].optionOne, percent: 0, isVoted: false },
        optionTwo: { ...questions[question_id].optionTwo, percent: 0, isVoted: false },
      };

      const u = users[q.author];
      if (!u) return;

      q.totalVoted = q.optionOne.votes.length + q.optionTwo.votes.length;
      q.optionOne.percent = (q.optionOne.votes.length / (q.totalVoted === 0 ? 1 : q.totalVoted)) * 100;
      q.optionOne.isVoted = q.optionOne.votes.includes(authedId);
      q.optionTwo.percent = (q.optionTwo.votes.length / (q.totalVoted === 0 ? 1 : q.totalVoted)) * 100;
      q.optionTwo.isVoted = q.optionTwo.votes.includes(authedId);
      q.isVoted = q.optionOne.isVoted || q.optionTwo.isVoted;

      setUser(u);
      setQuestion(q);
    }
  }, [authedId, question_id, questions, users]);

  // Hiển thị lỗi nếu không tìm thấy câu hỏi
  if (!question) return <NotFound />;

  return (
    <div>
      <h1 className="mb-5 text-center">Poll by {user?.name}</h1>
      <div className="text-center">
        <strong>@{user?.id}</strong>
      </div>
      <div className="d-flex justify-content-center mb-3">
        <img
          src={user?.avatarURL}
          alt={user?.name}
          className="bg-info rounded-circle mb-3"
          style={{ width: "100px", height: "100px" }}
        />
      </div>
      <h4 className="text-center mb-3">Would you rather</h4>
      {question.isVoted && (
        <div className="text-center mb-3">Total Voted: {question.totalVoted}</div>
      )}
      <div className="row">
        <div className="col-md-6">
          <div
            className={
              question.optionOne.isVoted
                ? "d-grid p-3 border border-primary rounded text-center bg-primary text-white"
                : "d-grid p-3 border rounded text-center"
            }
          >
            <div className="mb-2 fw-bold">{question.optionOne.text}</div>
            {question.isVoted ? (
              <div>
                Voted: {question.optionOne.votes.length} - Percent:{" "}
                {question.optionOne.percent.toFixed(2)}%
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => handleVote(ev, "optionOne")}
                disabled={loading}
              >
                Vote
              </button>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={
              question.optionTwo.isVoted
                ? "d-grid p-3 border border-primary rounded text-center bg-primary text-white"
                : "d-grid p-3 border rounded text-center"
            }
          >
            <div className="mb-2 fw-bold">{question.optionTwo.text}</div>
            {question.isVoted ? (
              <div>
                Voted: {question.optionTwo.votes.length} - Percent:{" "}
                {question.optionTwo.percent.toFixed(2)}%
              </div>
            ) : (
              <button
                type="button"
                className="btn btn-primary"
                onClick={(ev) => handleVote(ev, "optionTwo")}
                disabled={loading}
              >
                Vote
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionDetail;
