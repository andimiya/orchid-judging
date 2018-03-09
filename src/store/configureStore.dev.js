import { createStore, applyMiddleware, compose } from 'redux';
import reduxReset from 'redux-reset';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const middleware = [thunk];

const finalCreateStore = compose(
  applyMiddleware(...middleware),
  reduxReset(),
  (window.devToolsExtension) ? window.devToolsExtension() : f => f
)(createStore);

export default function configureStore(preloadedState) {
  const store = finalCreateStore(rootReducer, preloadedState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      store.replaceReducer(rootReducer);
    });
  }

  return store;
}
