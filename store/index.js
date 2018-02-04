import { createStore, combineReducers } from 'redux';

import general from './general';
import messages from './messages';
import user from './user';

const reducer = combineReducers({
  general,
  messages,
  user
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
