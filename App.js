import React, { useState } from 'react';
import { AppLoading } from 'expo';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
//will need to get removed on deployment
import { composeWithDevTools } from 'redux-devtools-extension';

import AppNavigator from './navigation/AppNavigator';
import surveyReducer from './store/reducers/survey';

const rootReducer = combineReducers({
  survey: surveyReducer,
});

//remove the composeWithDevTools on deployment
const store = createStore(rootReducer, composeWithDevTools());

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
