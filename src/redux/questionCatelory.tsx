import { useNavigate } from "react-router-dom";
import { Question as QuestionType } from "../config/types";

interface QuestionProps {
  question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const navigate = useNavigate();

  const handleShow = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/questions/${question.id}`);
  };

  return (
    <div className="card border rounded mb-3">
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-around">
          <img
            height={100}
            width={100}
            className="bg-info rounded-circle mb-3"
            src={question.user.avatarURL}
            alt={question.user.name}
          />
        </div>
        <div className="d-block text-center mb-3">
          <strong>{question.user.name}</strong>
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleShow}
          >
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
