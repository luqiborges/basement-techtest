import React, { ReactNode, createContext, useState, SetStateAction, Dispatch } from 'react';

interface RoundProps {
  id: number;
  player_id: number;
  questions: {
    id: number;
    description: string;
    options: {
      id: number;
      label: string;
    }[]
  }[];
  answers: {
    id: number;
    question_id: number;
    option_id: number;
    correct: boolean;
  }[];
}

interface ResultProps {
  id: number;
  player_id: number;
  total_questions: number;
  total_answered_questions: number;
  total_correct_answers: number;
}

interface ProviderProps {
  children: ReactNode;
};

export interface DataProvidedProps {
  round?: RoundProps;
  result?: ResultProps;
  setRound?: Dispatch<SetStateAction<RoundProps | undefined>>
  setResult?: Dispatch<SetStateAction<ResultProps | undefined>>
}

export const RoundContext = createContext({});

export const RoundProvider = ({children}: ProviderProps) => {
  const [round, setRound] = useState<RoundProps>();
  const [result, setResult] = useState<ResultProps>();

  const value: DataProvidedProps = {round, setRound, result, setResult};
  
  return (
    <RoundContext.Provider value={value}>
      {children}
    </RoundContext.Provider>
  );
}