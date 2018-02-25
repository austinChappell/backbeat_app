const initialState = {
  allInstruments: [],
  attemptedLogin: false,
  authToken: null,
  authorized: false,
  bandInstruments: [],
  numOfUnreadMessages: 0,
  selectedInstrumentIds: [],
  showUserAuthForm: true,
  userAuthType: 'Login',
  skillLevels: ['Professional', 'Semi-Professional', 'Amateur', 'Novice'],
  onboardingMaxStage: 3,
  onboardingReqMaxStage: 1,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
