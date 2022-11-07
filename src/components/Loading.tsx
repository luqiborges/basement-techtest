import React from 'react';
import ReactLoading from 'react-loading';

import styles from '../styles/round.module.scss';

export function Loading(){
  return (
    <div className={styles.loading}>
      <ReactLoading type={'bubbles'} color={"#9BE1FB"} height={50} width={50}/>
    </div>
  );
}