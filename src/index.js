import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';
import registerServiceWorker from './registerServiceWorker';

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

axios.interceptors.request.use(request => {
  return request;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    return Promise.reject(error);
  });

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
