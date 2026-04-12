export interface Question {
  text: string;
  answer: string;
}

export interface Lesson {
  id: number;
  title: string;
  questions: Question[];
}
