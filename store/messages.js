import constants from './constants';

const initialState = {
  messages: [],
  unreadMessages: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_MESSAGES':
      return Object.assign({}, state, { messages: action.messages });
    case 'SET_UNREAD_MESSAGES':
      return Object.assign({}, state, { unreadMessages: action.messages });
    default:
      return state;
  }
};

export default reducer;
