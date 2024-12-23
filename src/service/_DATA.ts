import { Answer, Question, QuestionData, User } from "../config/types";

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
		},
		questions: [],
	},
};

export let questions: { [key: string]: Question } = {
	"8xf0y6ziyjabvozdd253nd": {
		id: "8xf0y6ziyjabvozdd253nd",
		author: "Kiet",
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
		timestamp: Date.now(),
		optionOne: {
			votes: ["Thao"],
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
		timestamp: Date.now(),
		optionOne: {
			votes: ["Thanh"],
			text: "Take a course on ReactJS",
		},
		optionTwo: {
			votes: [],
			text: "Take a course on unit testing with Jest",
		},
	},
	xj352vofupe1dqz9emx13r: {
		id: "xj352vofupe1dqz9emx13r",
		author: "Ngan",
		timestamp: Date.now(),
		optionOne: {
			votes: ["Ngan"],
			text: "Deploy to production once every two weeks",
		},
		optionTwo: {
			votes: [],
			text: "Deploy to production once every month",
		},
	},
};

function generateUID(): string {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

export function _getUsers(): Promise<{ [key: string]: User }> {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ ...users }), 1000);
	});
}

export function _getQuestions(): Promise<{ [key: string]: Question }> {
	return new Promise((resolve) => {
		setTimeout(() => resolve({ ...questions }), 1000);
	});
}

export function formatQuestion({
	optionOneText,
	optionTwoText,
	author,
}: QuestionData): Question {
	return {
		id: generateUID(),
		timestamp: Date.now(), // Lấy thời gian thực
		author,
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

export function _saveQuestion(question: QuestionData): Promise<Question> {
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
			resolve(formattedQuestion);
		}, 1000);
	});
}

export function _saveQuestionAnswer({
	authedUser,
	qid,
	answer,
}: Answer): Promise<boolean> {
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
						...users[authedUser].answers,
						[qid]: answer,
					},
				},
			};

			questions = {
				...questions,
				[qid]: {
					...questions[qid],
					[answer]: {
						...questions[qid as keyof Question][
							answer as "optionOne" | "optionTwo"
						],
						votes: questions[qid as keyof Question][
							answer as "optionOne" | "optionTwo"
						].votes.concat([authedUser]),
					},
				},
			};

			resolve(true);
		}, 500);
	});
}
