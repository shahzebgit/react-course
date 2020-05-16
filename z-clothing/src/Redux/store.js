import {createStore , applyMiddleware, compose}  from 'redux';
import { persistStore }  from 'redux-persist'

import logger from 'redux-logger';


import rootReducer from './root-reducer';

const middlewares = [logger];

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

 const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
        // other store enhancers if any
      );

export const store = createStore(rootReducer,enhancer)
export const persistor = persistStore(store);

