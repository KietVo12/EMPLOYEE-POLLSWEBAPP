import React from 'react';
import Question from "../../redux/questionCatelory";
import { QuestionCategoryProps } from "../../config/types";

const QuestionCategory: React.FC<QuestionCategoryProps> = ({ title, questions }) => {
    return (
        <div className="mb-3">
            <h1 className="text-center mb-3">{title}</h1>
            <div className="row mb-3">
                {questions && questions.length > 0 ? (
                    questions.map((q) => (
                        <div className="col-md-4" key={q.id}>
                            <Question question={q} />
                        </div>
                    ))
                ) : (
                    <div className="col-md-12">
                        <div className="alert alert-info">Oh noooo!!! There’s nothing here.</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionCategory;
