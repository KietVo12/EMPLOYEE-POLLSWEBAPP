import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionCategory from "../Question/QuestionCategory";
import { Question, User } from "../../config/types";

const HomePage: React.FC = () => {
  const [newQuestions, setNewQuestions] = useState<Question[]>([]);
  const [doneQuestions, setDoneQuestions] = useState<Question[]>([]);
  const [isDefaultView, setIsDefaultView] = useState<boolean>(true);

  const authedId = useSelector((state: any) => state.auth.authedId);
  const users = useSelector((state: any) => state.user.users);
  const questions = useSelector((state: any) => state.question.questions);

  const dispatch = useDispatch();

  useEffect(() => {
    if (questions) {
      const newQuestion: Question[] = [];
      const doneQuestion: Question[] = [];
      Object.keys(questions).forEach((key) => {
        const q = { ...questions[key] } as Question;
        q.user = users[q.author];
        if (
          q.optionOne.votes.indexOf(authedId) < 0 &&
          q.optionTwo.votes.indexOf(authedId) < 0
        ) {
          newQuestion.push(q);
        } else {
          doneQuestion.push(q);
        }
      });
      setNewQuestions(
        newQuestion.sort((a, b) => b.timestamp - a.timestamp)
      );
      setDoneQuestions(
        doneQuestion.sort((a, b) => b.timestamp - a.timestamp)
      );
    }
  }, [dispatch, authedId, users, questions]);

  return (
    <div className="home">
      <div
        className="btn-group"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          checked={isDefaultView}
          onChange={() => setIsDefaultView(true)}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio1">
          Questions
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
          checked={!isDefaultView}
          onChange={() => setIsDefaultView(false)}
        />
        <label className="btn btn-outline-primary" htmlFor="btnradio2">
          Questions Completed
        </label>
      </div>
      {isDefaultView ? (
        <QuestionCategory title="New Questions" questions={newQuestions} />
      ) : (
        <QuestionCategory title="Questions Completed" questions={doneQuestions} />
      )}
    </div>
  );
};

export default HomePage;
