import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'; // importing redux-saga into project
import { takeLatest, put } from 'redux-saga/effects'
import axios from 'axios'

import App from './App';

const sagaMiddleware = createSagaMiddleware();

// this startingPlantArray should eventually be removed
const startingPlantArray = [
  { id: 1, name: 'Rose' },
  { id: 2, name: 'Tulip' },
  { id: 3, name: 'Oak' }
];

const plantList = (state = [], action) => {
  switch (action.type) {
    case 'SET_PLANTS':
      return action.payload
    default:
      return state;
  }
};

const store = createStore(
  combineReducers(
    { plantList }
    ),
  applyMiddleware(sagaMiddleware, logger),

);

function* fetchPlants() {
  try {
    const plantResponse = yield axios.get('/api/plant')
    yield put({ type: 'SET_PLANTS', payload: plantResponse.data})
  } catch (error) {
    console.log('Error in fetchPlants:', error)
  }
}

function* postPlant(action) {
  try {
    yield axios.post('/api/plant', action.payload);
    console.log('action is:', action)
    console.log('action.payload is:', action.payload);
    yield put({ type: 'FETCH_PLANTS' })
  } catch(error) {
    console.log('Error in postPlant:', error)
  }
}

function* deletePlant(action) {
  try {
    console.log('action.payload is:', action.payload)
    yield axios.delete(`/api/plant/${action.payload}`)
    yield put({ type: 'FETCH_PLANTS' })
  } catch(error) {
    console.log('Error in deletePlant function:', error)
  }
}

function* rootSaga () {
  yield takeLatest( 'FETCH_PLANTS', fetchPlants);
  yield takeLatest( 'ADD_PLANT', postPlant);
  yield takeLatest( 'DELETE_PLANT', deletePlant)
}

sagaMiddleware.run(rootSaga);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);