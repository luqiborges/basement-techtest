import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";

import styles from '../styles/round.module.scss';

interface QuestionModalProps {
  roundId: number;
  totalQuestions: number;
  totalAnsweredQuestions: number;
  totalCorrectQuestions: number;
  question: {
    id: number;
    description: string;
    options: {
      id: number;
      label: string;
    }[]
  };
  setAnswerSelected: Dispatch<SetStateAction<number | undefined>>
}

export function QuestionModal(props: QuestionModalProps){
  const router = useRouter();

  function handleButtonOnClick(optionSelectedId: number){
    props.setAnswerSelected(optionSelectedId);
    router.push({
      pathname: '/rounds',
    })
  }

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizHeading}>
        <h2>{props.totalAnsweredQuestions + 1}/{props.totalQuestions}</h2>
        <h2>Certas: {props.totalCorrectQuestions}</h2>
      </div>

      <div className={styles.quizDescription}>
        <h2>{props.question.description}</h2>
      </div>

      <div className={styles.quizButtons}>
        {props.question.options.map( option => {
          return (
            <button 
              key={option.id} 
              onClick={() => handleButtonOnClick(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>

    </div>
  )

}