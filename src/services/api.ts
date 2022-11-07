import axios from 'axios';

const api = axios.create({
  baseURL: 'https://test-quiz-app-backend.herokuapp.com/',
});

export { api };