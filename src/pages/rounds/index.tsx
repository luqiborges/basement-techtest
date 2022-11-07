import React, { useEffect, useState } from "react";

import { QuestionModal } from "../../components/QuestionModal";
import { Loading } from "../../components/Loading";

import { DataProvidedProps, RoundContext } from "../../providers/round";
import { api } from '../../services/api';
import { EndModal } from "../../components/EndModal";

import styles from '../../styles/round.module.scss';

export default function Rounds(){
  const { round, result, setResult, setRound }: DataProvidedProps = React.useContext(RoundContext);

  const [optionSelectedId, setOptionSelectedId] = useState<number>();
  const [notAnsweredYet, setNotAnsweredYet] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    handleResult();
    if(!notAnsweredYet){
      sendAnswer(optionSelectedId);
      handleNewRound();
    }
    setNotAnsweredYet(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionSelectedId, round])

  async function handleResult(){
    try{
      setIsLoading(true);
      await api.get(`/rounds/${round?.id}/result`)
        .then(({ data }) => {
          setResult!(data.round);
          setIsLoading(false);
        });
      console.log('Result correctly loaded.')

    } catch(err){
      alert('Result does not loaded.');
      console.log(err);
    }
  }

  async function sendAnswer(optionSelectedId?: number){
    try{
      setIsLoading(true);
      await api.post(`/rounds/${round?.id}/answers`, {
        answer: {
          question_id: round!.questions[result!.total_answered_questions].id,
          option_id: optionSelectedId,
        }
      }).then(() => {
        console.log('Answer sucessfully sent.')
        setIsLoading(false);
      })
    } catch(err){
      alert('Error sending answer.');
      console.log(err);
    }
  }

  async function handleNewRound(){
    try{
      setIsLoading(true);
      await api.get(`/rounds/${round?.id}`)
      .then(({ data }) => {
        setRound?.(data.round);
        setNotAnsweredYet(true);
        setIsLoading(false);
      });
    } catch(err) {
      alert('Error getting new round.');
      console.log(err);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.appTitle}>Quiz App</h1>

      {!isLoading ? 
        result!.total_answered_questions !== result!.total_questions ?
          <QuestionModal
            roundId={round!.id} 
            totalAnsweredQuestions={result!.total_answered_questions} 
            totalCorrectQuestions={result!.total_correct_answers} 
            totalQuestions={result!.total_questions}
            question={round!.questions[result!.total_answered_questions]}
            setAnswerSelected={setOptionSelectedId}
          /> : 
          <EndModal 
            totalAnsweredQuestions={result!.total_answered_questions} 
            totalCorrectQuestions={result!.total_correct_answers}
          /> :
        <Loading />
      }
      

    </div>
  );
}