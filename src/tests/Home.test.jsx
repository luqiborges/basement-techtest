import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from '../pages/index';
import { api } from '../services/api';

describe('Home', () => {
  it('Renders the QuizApp heading', () => {
    render(<Home />)

    const quizAppHeading = screen.getByText('Quiz App');

    expect(quizAppHeading).toBeTruthy();
  })

  it('Renders the Jogador textInput', () => {
    render(<Home />)

    const jogadorTextInput = screen.getByLabelText('Jogador');

    expect(jogadorTextInput).toBeTruthy();
  })

  it('Renders the Categories select', () => {
    render(<Home />)

    const categoriaSelect = screen.getByRole('combobox');

    expect(categoriaSelect).toBeTruthy();
  })

})

describe('Api Testing', () => {
  it('Api returns correct number of categories', async () => {
    let categories = [];

    await api.get('/categories')
      .then(({ data }) => {
        categories = data.categories;
    });

    expect(categories.length).toEqual(3);
  })
})