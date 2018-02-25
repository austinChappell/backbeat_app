import constants from './constants';

const initialState = {
  compatibleMusicians: [],
  currentUsername: '',
  currentUser: {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    city: '',
    skill_level: '',
  },
  currentUserInstruments: [],
  currentUserVids: [],
  currentUserTracks: [],
  loggedInUser: {},
  userInfo: {
    bio: '',
    city: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    username: '',
    skillLevel: '',
  },
  user: {
    id: '',
    userid: 'austin',
    token: '',
  },
  userStyleIds: [],
  token: null,
  onboardingStage: 0,
};

const reducer = (state = initialState, action) => {
  console.log('USER REDUCER RUNNING', action);
  switch (action.type) {
    case constants.HANDLE_FORM_INPUT_CHANGE: {
      const updateObject = {};
      const inputName = action.input;
      updateObject[inputName] = action.value;
      const newUserInfo = Object.assign({}, state.userInfo, updateObject);
      return Object.assign({}, state, { userInfo: newUserInfo });
    }
    case constants.SET_TOKEN: {
      return Object.assign({}, state, { token: action.token });
    }
    case constants.SET_USER: {
      const { user } = action;
      return Object.assign({}, state, { user: action.user });
    }
    default:
      return state;
  }
};

export default reducer;
