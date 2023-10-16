
export type PrimaryQuestion = {
  title: string;
  secondaryQuestions?: SecondaryQuestion[];
}

export type SecondaryQuestion = {
  id: string;
  secondaryTitle: string;
  tertiaryQuestions?: TertiaryQuestion[];
}

export type TertiaryQuestion = {
  tertiaryTitle: string;
}