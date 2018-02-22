const initialState = {
  checking: false,
  loggedIn: false,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_LOGIN_REQUEST':
    case 'LOG_IN_REQUEST':
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        checking: true,
      };
    case 'CHECK_LOGIN_SUCCESS':
      return {
        ...state,
        checking: false,
        loggedIn: action.loggedIn,
      };
    case 'CHECK_LOGIN_FAILURE':
      return {
        ...state,
        checking: false,
        loggedIn: false,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        checking: false,
        loggedIn: true,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        checking: false,
        loggedIn: false,
      };
    case 'LOG_IN_FAILURE':
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        checking: false,
      };
    default:
      return state;
  }
};

export default login;

export const isLoginChecking = (state) => state.checking;
export const isLoggedIn = (state) => state.loggedIn;