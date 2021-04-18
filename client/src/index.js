import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';
import { getAllUsers } from './actions/users.actions';
import { getPost } from './actions/post.action';

const store = createStore(rootReducer, applyMiddleware(thunk))
store.dispatch(getAllUsers());
store.dispatch(getPost());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
