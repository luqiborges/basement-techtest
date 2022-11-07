import { ReactNode, SelectHTMLAttributes } from 'react';

import styles from '../styles/select.module.scss';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
  isAnyOptionSelected: boolean;
  children: ReactNode;
}

export function Select({isAnyOptionSelected, children, ...rest}: SelectProps){
  return (
    <>
      {isAnyOptionSelected ? 
        <select {...rest} className={styles.select}>
          {children}
        </select> :
        <div className={styles.errorContainer}>
          <select {...rest} className={styles.selectError}>
            {children}
          </select>
          <h2 className={styles.errorMessage}>Selecione alguma categoria</h2>
        </div>
      }   
    </>
      
  );
}