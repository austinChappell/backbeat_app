const initialState = {
  skills: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SKILLS':
      return Object.assign({}, state, { skills: action.skills });
    default:
      return state;
  }
};

export default reducer;
