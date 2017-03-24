import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
const { Router, hashHistory } = require('react-router');
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './store/configure_store';
import router from './containers/Router/router';
import { appConfigLoad } from 'lib/appConfig';
require('core-js');
require('./styles/global.css');

const store = configureStore(hashHistory, {});
const history = syncHistoryWithStore(hashHistory, store);

const renderApp = () =>
  ReactDOM.render(
    <Provider store={store} >
      <Router history={history} >
        {router}
      </Router>
    </Provider>,
    document.getElementById('root')
);


appConfigLoad(() => { renderApp(); });

