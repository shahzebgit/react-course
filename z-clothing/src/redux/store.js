import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga'

import rootReducer from './root-reducer';

import rootSaga from '../redux/root-saga'

const sagaMiddleWare = createSagaMiddleware();

const middleware = [sagaMiddleWare];

if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middleware));

sagaMiddleWare.run(rootSaga)


export const persister = persistStore(store);

export default { store, persistStore };
