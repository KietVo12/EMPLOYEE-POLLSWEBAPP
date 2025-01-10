export interface User {
  id: string;
  password: string;
  name: string;
  avatarURL: string;
  answers: Record<string, string>;
  questions: string[];
}
