import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router-dom'
import createSagaMiddleware, { END } from 'redux-saga'
import logger from 'redux-logger'


import App from './containers/App'
import UserPage from './containers/UserPage'
import RepoPage from './containers/RepoPage'
import rootSaga from './sagas'


import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import registerServiceWorker from './registerServiceWorker';

import reducers from './reducers' // Or wherever you keep your reducers
import rootReducer from './reducers';


// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const rMiddleware = routerMiddleware(history)
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  rootReducer,
  applyMiddleware(logger, rMiddleware, sagaMiddleware)
)

sagaMiddleware.run(rootSaga)
store.close = () => store.dispatch(END)
const a2 = (
   <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <Route path='/' component={App} />
          <Route path="/:login" component={UserPage} />
          <Route path="/:login/:name" component={RepoPage} />
        </div>
      </ConnectedRouter>
    </Provider>
)

ReactDOM.render(
  a2,
  document.getElementById('root')
)

registerServiceWorker();
