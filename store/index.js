import { createStore, combineReducers } from 'redux';

import general from './general';
import genresReducer from './genres';
import instrumentsReducer from './instruments';
import messages from './messages';
import userReducer from './user';

const reducer = combineReducers({
  general,
  genresReducer,
  instrumentsReducer,
  messages,
  userReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
