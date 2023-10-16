export type Question = {
  id: string;
  title: string;
  questions: Question[];
}

export type Form = {
  id: string;
  questions: Question[];
}