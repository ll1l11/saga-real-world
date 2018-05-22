import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import createSagaMiddleware, { END } from 'redux-saga'


import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import rootSaga from './sagas'


import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers' // Or wherever you keep your reducers


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware, sagaMiddleware)
)

sagaMiddleware.run(rootSaga)
store.close = () => store.dispatch(END)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route path="/" component={App}>
          <Route path="/:login" component={UserPage} />
          <Route path="/:login/:name" component={RepoPage} />
        </Route>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
