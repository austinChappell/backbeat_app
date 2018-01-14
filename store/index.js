import { createStore, combineReducers } from 'redux';

import general from './general';
import user from './user';

const reducer = combineReducers({
  general,
  user
})

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
