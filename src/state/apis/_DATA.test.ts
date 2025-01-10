import Answer from "../types/answer";
import { _saveQuestion, _saveQuestionAnswer } from "./_DATA";
describe("_DATA", () => {
  describe("_saveQuestion", () => {
    it("should return error if passed invalid parameters", async () => {
      const question = { optionOneText: "", optionTwoText: "", author: "" };
      await expect(_saveQuestion(question)).rejects.toBe(
        "Please provide optionOneText, optionTwoText, and author"
      );
    });
    it("should return question if passed valid parameters", async () => {
      const question = {
        optionOneText: "option text",
        optionTwoText: "option text",
        author: "tylermcginnis",
      };
      await expect(_saveQuestion(question)).resolves.toBeDefined();
    });
  });
  describe("_saveQuestionAnswer", () => {
    it("should return true if passed valid parameters", async () => {
      const answer = {
        authedUser: "mtsamis",
        qid: "8xf0y6ziyjabvozdd253nd",
        answer: Answer.optionOne,
      };
      await expect(_saveQuestionAnswer(answer)).resolves.toBeTruthy();
    });

    it("should return error if passed invalid parameters", async () => {
      const answer = {
        authedUser: "",
        qid: "",
        answer: Answer.optionOne,
      };
      await expect(_saveQuestionAnswer(answer)).rejects.toBe(
        "Please provide authedUser, qid, and answer"
      );
    });
  });
});
