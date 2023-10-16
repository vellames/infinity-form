"use client";
import styles from './page.module.css'
import { useEffect, useState } from 'react'
import { PrimaryQuestion } from './types';

export default function Home() {
  // vai inicializar com os dados vazios
  const [form, setForm] = useState<PrimaryQuestion>({
    title: "",
    secondaryQuestions: []
  });

  // aqui vc vai por os dados da questao primaria, cria um state pra cada campo
  const [primaryTitle, setPrimaryTitle] = useState("");
  const onQuestionTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrimaryTitle(e.target.value);
  }
  const onPrimaryQuestionAdded = () => {
    const formCopy = { ...form };
    formCopy.title = primaryTitle;
    setForm(formCopy);
    setPrimaryTitle("")
  }

  // aqui é tudo relacionado a secundaria
  const [secondaryTitle, setSecondaryTitle] = useState("");
  const oSecondaryTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondaryTitle(e.target.value);
  }
  const onSecondaryQuestionAdded = () => {
    const formCopy = { ...form };
    formCopy.secondaryQuestions?.push({
      id: Math.random().toString(),
      secondaryTitle,
      tertiaryQuestions: []
    });
    setForm(formCopy);
    setSecondaryTitle("")
  }

  // aqui é tudo relacionado a tercearia
  const [tertiaryTitle, setTertiaryTitle] = useState("");
  const onTertiaryTitleChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTertiaryTitle(e.target.value);
  }
  const onTertiaryQuestionAdded = (secondaryId: string) => {
    const formCopy = { ...form };
    for (const secondaryQuestion of formCopy.secondaryQuestions!) {
      if (secondaryQuestion.id === secondaryId) {
        secondaryQuestion.tertiaryQuestions?.push({
          tertiaryTitle
        });
        break;
      }
    }
    setForm(formCopy);
    setTertiaryTitle("")
  }

  const onFormSubmitted = () => {
    console.log(form);
  }

  return (
    <main className={styles.main}>
      <button onClick={onFormSubmitted}>Mandar pro servidor</button>
      {/* ISso aqui é como se fosse o form que insere a questao primaria */}
      <div>
        <input type="text" value={primaryTitle} onChange={onQuestionTitleChanged} />
        <button onClick={onPrimaryQuestionAdded}>Add Question</button>
        <hr />
      </div>

      {/* isso aqui renderiza a questao primaria */}
      {
        form.title && (
          <div>
            <div>
              <h1>{form.title}</h1>

              {/* isso aqui adicionar uma questao secundaria */}
              <input type="text" value={secondaryTitle} onChange={oSecondaryTitleChanged} />
              <button onClick={onSecondaryQuestionAdded}>adicionar secunaria</button>
              <hr />
            </div>

            {
              form.secondaryQuestions?.map((secondaryQuestion) => (
                <div key={secondaryQuestion.id}>
                  <h2>{secondaryQuestion.secondaryTitle}</h2>
                  <input type="text" value={tertiaryTitle} onChange={onTertiaryTitleChanged} />
                  <button onClick={() => onTertiaryQuestionAdded(secondaryQuestion.id)}>adicionar tercearia</button>
                  <hr />

                  {/* isso aqui renderiza a questao tercearia */}
                  <div>
                    {
                      secondaryQuestion.tertiaryQuestions?.map((tertiaryQuestion, index) => (
                        <div key={index}>
                          <h3>{tertiaryQuestion.tertiaryTitle}</h3>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>
        )
      }
    </main>
  )
}
