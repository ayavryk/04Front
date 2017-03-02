import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { edit } from './rEdit';
import { table } from './rTable';
import { config } from './rConfig';
import { message } from './rMessage';

const rootReducer = combineReducers({
  edit,
  table,
  config,
  message,
  routing: routerReducer
});

export default rootReducer;
