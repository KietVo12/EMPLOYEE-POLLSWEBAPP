import { Answer, Question, QuestionData, User } from "../config/types";

// Khởi tạo dữ liệu người dùng
export let users: { [key: string]: User } = {
  Kiet: {
    id: "Kiet",
    password: "password123",
    name: "Kiet Vo",
    avatarURL:
      "https://gravatar.com/avatar/ec652d7632db7cf63fa45091cb4b13a8?s=400&d=robohash&r=x",
    answers: {
      "8xf0y6ziyjabvozdd253nd": "optionOne",
      "6ni6ok3ym7mf1p33lnez": "optionTwo",
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
  },
  Thanh: {
    id: "Thanh",
    password: "password789",
    name: "Thanh Nguyen",
    avatarURL:
      "https://gravatar.com/avatar/7c4ff521986b4da4e046115b89e43d56?s=400&d=robohash&r=x",
    answers: {
      am8ehyc8byjqgar0jgpub9: "optionTwo",
      loxhs1bqm25b708cmbf3g: "optionOne",
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
    },
    questions: ["vthrdm985a262al8qx3do"],
  },
  Ngan: {
    id: "Ngan",
    password: "ngan246",
    name: "Ngan Tran",
    avatarURL:
      "https://gravatar.com/avatar/ab47a2b1c4774f4e9f835173243ef62c?s=400&d=robohash&r=x",
    answers: {
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
      "6ni6ok3ym7mf1p33lnez": "optionOne",
    },
    questions: ["loxhs1bqm25b708cmbf3g"],
  },
  Thao: {
    id: "Thao",
    password: "thao135",
    name: "Thao Le",
    avatarURL:
      "https://gravatar.com/avatar/eff8c72f5c48f9d4f4edee519b1df2dc?s=400&d=robohash&r=x",
    answers: {
      "6ni6ok3ym7mf1p33lnez": "optionOne",
      xj352vofupe1dqz9emx13r: "optionOne",
      vthrdm985a262al8qx3do: "optionTwo",
    },
    questions: [],
  },
};

// Khởi tạo dữ liệu câu hỏi
export let questions: { [key: string]: Question } = {
  "8xf0y6ziyjabvozdd253nd": {
    id: "8xf0y6ziyjabvozdd253nd",
    author: "Kiet",
    user: "Kiet",
    timestamp: Date.now(),
    optionOne: {
      votes: ["Kiet"],
      text: "Build our new application with JavaScript",
    },
    optionTwo: {
      votes: [],
      text: "Build our new application with TypeScript",
    },
  },
  "6ni6ok3ym7mf1p33lnez": {
    id: "6ni6ok3ym7mf1p33lnez",
    author: "Thao",
    user: "Thao",
    timestamp: Date.now(),
    optionOne: {
      votes: ["Thao", "Ngan"],
      text: "Hire more frontend developers",
    },
    optionTwo: {
      votes: ["Kiet"],
      text: "Hire more backend developers",
    },
  },
  am8ehyc8byjqgar0jgpub9: {
    id: "am8ehyc8byjqgar0jgpub9",
    author: "Kiet",
    user: "Kiet",
    timestamp: Date.now(),
    optionOne: {
      votes: [],
      text: "Conduct a release retrospective 1 week after a release",
    },
    optionTwo: {
      votes: ["Thanh"],
      text: "Conduct release retrospectives quarterly",
    },
  },
  loxhs1bqm25b708cmbf3g: {
    id: "loxhs1bqm25b708cmbf3g",
    author: "Ngan",
    user: "Ngan",
    timestamp: Date.now(),
    optionOne: {
      votes: ["Thanh"],
      text: "Have code reviews conducted by peers",
    },
    optionTwo: {
      votes: [],
      text: "Have code reviews conducted by managers",
    },
  },
  vthrdm985a262al8qx3do: {
    id: "vthrdm985a262al8qx3do",
    author: "Thanh",
    user: "Thanh",
    timestamp: Date.now(),
    optionOne: {
      votes: ["Thanh"],
      text: "Take a course on ReactJS",
    },
    optionTwo: {
      votes: ["Kiet", "Ngan"],
      text: "Take a course on unit testing with Jest",
    },
  },
  xj352vofupe1dqz9emx13r: {
    id: "xj352vofupe1dqz9emx13r",
    author: "Ngan",
    user: "Ngan",
    timestamp: Date.now(),
    optionOne: {
      votes: ["Ngan", "Thao", "Kiet"],
      text: "Deploy to production once every two weeks",
    },
    optionTwo: {
      votes: ["Thanh"],
      text: "Deploy to production once every month",
    },
  },
};

// Hàm tạo ID ngẫu nhiên
function generateUID(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

// Lấy tất cả câu hỏi
export function _getQuestions(): Promise<{ [key: string]: Question }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...questions }), 500);
  });
}

// Lấy tất cả người dùng
export function _getUsers(): Promise<{ [key: string]: User }> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ ...users }), 1000);
  });
}

// Format câu hỏi
export function formatQuestion({
  optionOneText,
  optionTwoText,
  author,
}: QuestionData): Question {
  return {
    id: generateUID(),
    timestamp: Date.now(),
    author,
    user: author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    },
  };
}
export function _saveQuestion(question: {
  optionOneText: string;
  optionTwoText: string;
  author: string;
}) {
  return new Promise((resolve, reject) => {
    if (
      !question.optionOneText ||
      !question.optionTwoText ||
      !question.author
    ) {
      reject("Please provide optionOneText, optionTwoText, and author");
    }
 
    const formattedQuestion = formatQuestion(question);
    setTimeout(() => {
      questions = {
        ...questions,
        [formattedQuestion.id]: formattedQuestion,
      };
 
      users = {
        ...users,
        [question.author]: {
          ...users[question.author],
          questions: [
            ...(users[question.author].questions || []),
            formattedQuestion.id,
          ],
        },
      };
 
      resolve(formattedQuestion);
    }, 1000);
  });
}
 
export function _saveQuestionAnswer({
  authedUser,
  qid,
  answer,
}: {
  authedUser: string;
  qid: string;
  answer: string;
}) {
  return new Promise((resolve, reject) => {
    if (!authedUser || !qid || !answer) {
      reject("Please provide authedUser, qid, and answer");
    }
  
    setTimeout(() => {
      users = {
        ...users,
        [authedUser]: {
          ...users[authedUser],
          answers: {
            ...users[authedUser]?.answers,
            [qid]: answer,
          },
        },
      };
    
      questions = {
        ...questions,
        [qid]: {
          ...questions[qid],
          [answer]: {
            ...(questions[qid][answer as 'optionOne' | 'optionTwo']),
            votes: questions[qid][answer as 'optionOne' | 'optionTwo'].votes.concat([authedUser]),
          },
        },
      };
 
      resolve(true);
    }, 500);
  });
}
// //Thêm câu hỏi 
// export function _saveQuestion(questionData: QuestionData): Promise<Question> {
//   return new Promise((resolve, reject) => {
//     if (!questionData.optionOneText || !questionData.optionTwoText || !questionData.author) {
//       reject("Please provide optionOneText, optionTwoText, and author");
//     }

//     const formattedQuestion = formatQuestion(questionData);

//     setTimeout(() => {
//       questions = {
//         ...questions,
//         [formattedQuestion.id]: formattedQuestion,
//       };

//       if (users[questionData.author]) {
//         users[questionData.author].questions?.push(formattedQuestion.id);
//       }

//       resolve(formattedQuestion);
//     }, 1000);
//   });
// }

// // Lưu câu trả lời cho câu hỏi
// export function _saveQuestionAnswer({ authedUser, qid, answer }: Answer): Promise<boolean> {
//   return new Promise((resolve, reject) => {
//     if (!authedUser || !qid || !answer) {
//       reject("Please provide authedUser, qid, and answer");
//     }

//     if (!questions[qid]) {
//       reject("Question not found");
//     }

//     setTimeout(() => {
//       const question = questions[qid];
//       const option = answer === "optionOne" ? question.optionOne : question.optionTwo;

//       if (!option.votes.includes(authedUser)) {
//         option.votes.push(authedUser);

//         users[authedUser].answers = {
//           ...users[authedUser].answers,
//           [qid]: answer,
//         };

//         resolve(true);
//       } else {
//         reject("User has already voted");
//       }
//     }, 500);
//   });
// }

// // Xóa câu hỏi
// export function _deleteQuestion(qid: string): Promise<boolean> {
//   return new Promise((resolve, reject) => {
//     if (!questions[qid]) {
//       reject("Question not found");
//     }

//     const author = questions[qid].author;

//     setTimeout(() => {
//       const { [qid]: _, ...remainingQuestions } = questions;
//       questions = remainingQuestions;

//       if (users[author]) {
//         users[author].questions = users[author].questions?.filter((id) => id !== qid);
//       }

//       resolve(true);
//     }, 500);
//   });


