const initialState = {
  instruments: [],
};

const reducer = (state = initialState, action) => {
  console.log('INSTRUMENT REDUCER RUNNING');
  switch (action.type) {
    case 'SET_INSTRUMENTS':
      return Object.assign({}, state, { instruments: action.instruments });
    default:
      return state;
  }
};

export default reducer;
