import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './State/Store/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(store.getState());

root.render(
  <BrowserRouter basename='/flashcard-app'>
    <Provider store={store}>
        <App />
    </Provider>  
  </BrowserRouter>
);


