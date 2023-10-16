import { useState } from 'react'
import { Question as QuestionType } from './types'


type Props = {
  question: QuestionType;
  parentId?: string;
  onQuestionAdded: (newQuestion: QuestionType, createNewLevel: boolean, question: QuestionType, parentId?: string) => void;
  level: number;
}

export default function Question({
  question,
  parentId,
  onQuestionAdded,
  level,
}: Props) {
  const [questionTitle, setQuestionTitle] = useState<string>();

  const onAddQuestionClicked = (createNewLevel: boolean) => {
    if (!questionTitle) {
      return;
    }

    const newQuestion: QuestionType = {
      id: Math.random().toString(),
      title: questionTitle,
      questions: [],
    }

    onQuestionAdded(newQuestion, createNewLevel, question, parentId)
    setQuestionTitle('');
  }

  const onQuestionTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(e.target.value);
  }

  return (
    <div style={{
      marginLeft: `${(level-1) * 20}px`
    }}>
      <p>{question.title} - {level}</p>

      <div>
        <input type="text" value={questionTitle} onChange={onQuestionTitleChanged} />
        <button onClick={() => onAddQuestionClicked(false)}>Add Question</button>
        <button onClick={() => onAddQuestionClicked(true)}>Add Question + Level</button>
        <hr />
      </div>
    </div>
  )
}