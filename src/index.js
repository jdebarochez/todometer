import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadState, saveState } from './local-storage';
import rootReducer from './reducers/index';
import Main from './Main';
import { loadBrowser } from './browser';

const persistedState = loadState();
let store = createStore(rootReducer,
    persistedState,
    composeWithDevTools(
      applyMiddleware(
        createLogger({ collapsed: true })
      )
    )
  );

store.subscribe(() => {
  saveState(store.getState());
});

const browser = loadBrowser();

window.onload = function() {
  ReactDOM.render(
    <Provider store={store}>
      <Main browser={browser} />
    </Provider>, document.getElementById('app'));
};
