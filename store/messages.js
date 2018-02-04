import constants from './constants';

const initialState = {
  messages: []
}

const reducer = (state = initialState, action) => {
  console.log('MESSAGE REDUCER RUNNING', action.type)

  switch(action.type) {
    case 'SET_ALL_MESSAGES':
      return Object.assign({}, state, { messages: action.messages })
    default:
      return state;
  }
}

export default reducer;
