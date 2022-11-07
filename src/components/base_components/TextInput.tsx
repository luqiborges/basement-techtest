import { InputHTMLAttributes } from 'react';

import styles from '../../styles/textInput.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
  isInputFilled: boolean;
}

export function TextInput({isInputFilled, ...rest}: TextInputProps){
  return (
    <>
      {isInputFilled ? 
        <input {...rest} className={styles.textInput}/> : 
        <>
          <input {...rest} className={styles.textInputError}/>
          <h2 className={styles.errorMessage}>Digite o nome do jogador</h2>
        </>
      }   
    </>
      
  );
}