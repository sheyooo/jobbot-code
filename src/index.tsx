import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const initialState = {
  postDetails: { post: {}, comments: [] },
  posts: [],
  UI: { isLoading: false, isPostingComment: false },
};

ReactDOM.render(
  <Provider store={configureStore(initialState)}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
