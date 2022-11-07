import React, { FormEvent, useEffect, useState } from "react";
import { api } from '../services/api';
import { useRouter } from 'next/router';
import { DataProvidedProps, RoundContext } from '../providers/round';

import { TextInput } from "../components/base_components/TextInput";
import { Select } from "../components/base_components/Select";

import styles from '../styles/home.module.scss'

interface categoryProps{
  id: number;
  name: string;
}

export default function Home() {
  const { setRound }: DataProvidedProps = React.useContext(RoundContext);

  const [categories, setCategories] = useState<Array<categoryProps>>([]);
  const [isNameFilled, setIsNameFilled] = useState<boolean>(true);
  const [isSelectFilled, setIsSelectFilled] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [categorySelectedId, setCategorySelectedId] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    handleLoadCategories();
  }, [isNameFilled, isSelectFilled])

  async function handleLoadCategories(){
    try{
      await api.get('/categories')
        .then(({ data }) => {
          setCategories(data.categories);
          console.log('Categories sucessfully loaded.')
        });

    } catch(err){
      alert('Error loading categories.');
      console.log(err);
    }
  }

  async function handleNewRound(event: FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    let stopSignal = false;

    if(Object.entries(data).length < 2) {
      setIsSelectFilled(false);
      stopSignal = true;
    } else {
      setCategorySelectedId(Number(data.category));
      setIsSelectFilled(true);
    }
    
    if(data.name === ''){
      setIsNameFilled(false);
      stopSignal = true;
    } else {
      setName(String(data.name));
      setIsNameFilled(true);
    }

    if(stopSignal){
      return;
    }

    try{
      await api.post('/rounds', {
        round: {
          player_name: data.name,
          category_id: data.category,
        }
      }).then(({data}) => {
        setRound?.(data.round);
        router.push({
          pathname: '/rounds',
        })  
      })
      console.log('Round of questions received.')

    } catch(err){
      alert('Error creating new round.');
      console.log(err);
    }
  }


  return (
    <div className={styles.container}>
      <h1 className={styles.appTitle}>Quiz App</h1>

      <form onSubmit={handleNewRound}>
        <div className={styles.formContainer}>
          <section className={styles.playerContainer}>
            <label htmlFor="name" className={styles.playerLabel}>Jogador</label>
            <TextInput isInputFilled={isNameFilled} id="name" name="name" type="text" defaultValue={name} placeholder="Nome" className={styles.nameInput}/>
          </section>

          <section className={styles.categoryContainer}>
            <label htmlFor="category" className={styles.categoryLabel}>Categoria</label>
            <Select id="category" name="category" defaultValue={categorySelectedId} required isAnyOptionSelected={isSelectFilled}>
              <option value={0} disabled hidden>Selecione a categoria</option>

              {categories && categories.map(category => {
                return (
                  <option key={category.id} value={category.id}>{category.name}</option>
                );
              })}

            </Select>
          </section>

          <button className={styles.button}>
            Jogar
          </button>
        </div>
        
      </form>

    </div>
  )
}
