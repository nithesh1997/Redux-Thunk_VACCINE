import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import VaccineReducer from './reducer/VaccineReducer';
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

const allReducer = combineReducers({
  vaccine: VaccineReducer
})

const store = createStore(allReducer, applyMiddleware(thunk))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

