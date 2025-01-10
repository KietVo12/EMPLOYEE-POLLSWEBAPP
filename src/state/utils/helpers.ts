import { Question } from "../modules/questions";
import { User } from "../modules/users";

export function splitQuestions(
  questions: Question[],
  userAnswers: Record<string, string>
): Question[][] {
  return questions.reduce(
    ([p, f], e) => (userAnswers[e.id] ? [[...p, e], f] : [p, [...f, e]]),
    [[] as Question[], [] as Question[]]
  );
}

export function sortUsers(users: Record<string, User>): User[] {
  return Object.values(users).sort((a, b) => {
    const scoreA = Object.values(a.answers).length + a.questions.length;
    const scoreB = Object.values(b.answers).length + b.questions.length;
    return scoreB - scoreA;
  });
}

export function sortQuestions(questions: Record<string, Question>): Question[] {
  return Object.values(questions).sort((a, b) => b.timestamp - a.timestamp);
}

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substring(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}
