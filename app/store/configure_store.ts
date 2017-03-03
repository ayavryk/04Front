import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { autoRehydrate } from 'redux-persist';
import thunk from 'redux-thunk';

const createLogger = require('redux-logger');
import rootReducer from '../reducers';

// From webpack
declare const __DEV__: boolean;

export default function configureStore(history, initialState?: any) {

    const middlewares: any[] = [
      routerMiddleware(history),
      thunk,
    ];

    /** Add Only Dev. Middlewares */
    if (__DEV__) {
      const logger = createLogger();
      middlewares.push(logger);
    }

    const environment: any = window || this;

    const finalCreateStore = compose<any, any, any, any>(
      applyMiddleware(...middlewares),
      autoRehydrate(),
      __DEV__ && typeof environment.devToolsExtension !== 'undefined' ? environment.devToolsExtension() : f => f,
    )(createStore);

    const store = finalCreateStore(rootReducer, initialState);

    if (__DEV__ && (module as any).hot) {
      (module as any).hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers');
        store.replaceReducer(nextRootReducer);
      });
    }

    return store;
}