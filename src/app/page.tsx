"use client";
import styles from './page.module.css'
import { Form, Question as QuestionType } from './types'
import Question from './question'
import { useEffect, useState } from 'react'

export default function Home() {
  const [form, setForm] = useState<Form>({
    id: "id",
    questions: [],
  });

  const [questionTitle, setQuestionTitle] = useState<string>();

  const renderAllQuestions = (q: QuestionType, arr: React.ReactNode[] = [], parentId?: string, lvl: number = 1) => {
    arr.push((
        <Question
          question={q}
          key={q.id}
          parentId={parentId}
          onQuestionAdded={onQuestionAdded}
          level={lvl}
          />
    ))

    if (q.questions) {
      lvl++
      for (const question of q.questions) {
        renderAllQuestions(question, arr, q.id, lvl);
      }
    }

    return arr;
  };

  const onQuestionAdded = (newQuestion: QuestionType, createNewLevel: boolean, question: QuestionType, parentId?: string) => {
    const formCopy = { ...form };
    if (createNewLevel) {
      formCopy.questions = appendQuestion(newQuestion, question.id, formCopy.questions);
    } else if (parentId) {
      formCopy.questions = appendQuestion(newQuestion, parentId, formCopy.questions)
    } else {
      formCopy.questions.push(newQuestion);
    }
    setForm(formCopy);
  }

  const appendQuestion = (newQuestion: QuestionType, targetQuestionId: string, structure: QuestionType[]): QuestionType[] => {
    for (const question of structure) {
      if (question.id === targetQuestionId) {
        question.questions?.push(newQuestion);
        return structure;
      }
    }

    for (const question of structure) {
      if (question.questions) {
        appendQuestion(newQuestion, targetQuestionId, question.questions);
      }
    }

    return structure;
  }

  const onAddTopQuestionClicked = () => {
    if (!questionTitle) {
      return;
    }

    const newQuestion: QuestionType = {
      id: Math.random().toString(),
      title: questionTitle,
      questions: [],
    }

    const formCopy = { ...form };
    formCopy.questions.push(newQuestion);

    setForm(formCopy);
    setQuestionTitle('');
  }

  const onQuestionTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestionTitle(e.target.value);
  }

  useEffect(() => {
    console.log(form.questions)
  }, [form])

  return (
    <main className={styles.main}>
      <div>
        <input type="text" value={questionTitle} onChange={onQuestionTitleChanged} />
        <button onClick={onAddTopQuestionClicked}>Add Question</button>
        <hr />
      </div>

      {
        form.questions.map((question, i) => (
          <div key={i}>
            {renderAllQuestions(question)}
            <hr />
          </div>
        ))
      }
    </main>
  )
}
