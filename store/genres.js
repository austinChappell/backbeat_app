const initialState = {
  genres: [],
};

const reducer = (state = initialState, action) => {
  console.log('GENRES REDUCER RUNNING', action.type);
  switch (action.type) {
    case 'SET_GENRES':
      return Object.assign({}, state, { genres: action.genres });
    default:
      return state;
  }
};

export default reducer;
