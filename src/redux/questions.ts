import {
	createAsyncThunk,
	createSelector,
	createSlice,
} from "@reduxjs/toolkit";
import produce from "immer";
import {
	Answer,
	AsyncState,
	Question,
	QuestionData,
	QuestionStatus,
} from "../config/types";
import * as udacityApi from "../service/_DATA";
import { RootState } from "./store";
import { formatQuestion } from "../service/_DATA";
const name = "questions";
export const initialState: AsyncState<Question> = {
	items: [],
	status: "empty",
};

// Load questions from API
const loadQuestions = createAsyncThunk(`${name}/loadQuestions`, async () => {
	const response = await udacityApi._getQuestions();
	return Object.values(response).sort((a, b) => b.timestamp - a.timestamp);
});

// Save a new question
const saveQuestion = createAsyncThunk(
	`${name}/saveQuestion`,
	async (arg: QuestionData) => {
		const response = await udacityApi._saveQuestion(arg);
		return response;
	}
);

// Save an answer for a question
 const saveQuestionAnswer = createAsyncThunk(
 	`${name}/saveQuestionAnswer`,
	async (arg: Answer) => {
		await udacityApi._saveQuestionAnswer(arg);
		return arg; 
 	}
);

export const questionsSlice = createSlice({
	name,
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(loadQuestions.fulfilled, (state, { payload }) => {
				state.items = payload;
				state.status = "loaded";
			})

			.addCase(saveQuestion.pending, (state, { meta }) => {
				const draftQuestion = formatQuestion(meta.arg);
				state.items.unshift(draftQuestion);
			})
			 .addCase(saveQuestionAnswer.fulfilled, (state, { meta }) => {
			 	const question = state.items.find((q) => q.id === meta.arg.qid);
			 	if (question) {
			 		const answerKey = meta.arg.answer as "optionOne" | "optionTwo";
			 		question[answerKey].votes.push(meta.arg.authedUser);
			 	}
		 });
	},
	reducers: {},
});
// const areQuestionsEquivalent = (q1: Question, q2: Question): boolean => {
// 	return (
// 		q1.author === q2.author &&
// 		q1.optionOne.text === q2.optionOne.text &&
// 		q1.optionTwo.text === q2.optionTwo.text
// 	);
// };

const getQuestionParticipants = (question: Question): string[] => {
	return Array.from(
		new Set([...question.optionOne.votes, ...question.optionTwo.votes])
	);
};

const isParticipantInQuestion = (question: Question, participant: string): boolean => {
	return getQuestionParticipants(question).includes(participant);
};

export const getQuestions = () =>
	createSelector(
		(state: RootState) => state[name],
		(state) => state.items
	);

export const getQuestion = (id: string) =>
	createSelector(
		[(state: RootState) => state[name]],
		(state) => state.items.find((q) => q.id === id)
	);

export const getQuestionAnswer = (
	question: Question,
	user: string
): "optionOne" | "optionTwo" | "unanswered" => {
	if (question.optionOne.votes.includes(user)) return "optionOne";
	if (question.optionTwo.votes.includes(user)) return "optionTwo";
	return "unanswered";
};

export const getQuestionsByStatus = (status: QuestionStatus) =>
	createSelector(
		[
			(state: RootState) => state.questions,
			(state: RootState) => state.session,
		],
		(questions, session) => {
			const { userDetails } = session;
			if (userDetails) {
				switch (status) {
					case "NEW":
						return questions.items.filter(
							(q) => !isParticipantInQuestion(q, userDetails.id)
						);
					case "DONE":
						return questions.items.filter((q) =>
							isParticipantInQuestion(q, userDetails.id)
						);
					default:
						return questions.items;
				}
			}
			return [];
		}
	);
export const questionsActions = {
	loadQuestions,
	saveQuestion,
	saveQuestionAnswer,
};

export const questionSelectors = {
	getQuestionsByStatus,
	getQuestionAnswer,
	getQuestion,
	getQuestions,
};

export default questionsSlice.reducer;
