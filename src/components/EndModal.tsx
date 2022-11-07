import { useRouter } from "next/router";

import styles from '../styles/round.module.scss';
import { CircularProgress } from "./CircularProgress";

interface EndModalProps {
  totalAnsweredQuestions: number;
  totalCorrectQuestions: number;
}

export function EndModal(props: EndModalProps){
  const router = useRouter();

  function goHomeButton(){
    router.push({
      pathname: '/',
    })
  }

  return (
    <div className={styles.endModalContainer}>
      <h2>Resultado</h2>
      
      <h2>{props.totalCorrectQuestions}/{props.totalAnsweredQuestions} Respostas certas</h2>
      
      <CircularProgress percentage={props.totalCorrectQuestions/props.totalAnsweredQuestions*100}/>
      
      <button
        onClick={goHomeButton} 
        className={styles.endModalButton}
      >
        Fim
      </button>
    </div>
  );
}