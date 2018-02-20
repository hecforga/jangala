const initialState = {
  checkedLoggedIn: false,
  token: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_LOGGED_IN':
      return {
        ...state,
        token: action.token,
        checkedLoggedIn: true,
      };
    case 'LOG_IN_REQUEST':
    case 'LOG_OUT_REQUEST':
      return {
        ...state,
        checkedLoggedIn: false,
      };
    case 'LOG_IN_SUCCESS':
      return {
        ...state,
        checkedLoggedIn: true,
        token: action.token,
      };
    case 'LOG_OUT_SUCCESS':
      return {
        ...state,
        checkedLoggedIn: true,
        token: null,
      };
    case 'LOG_IN_FAILURE':
    case 'LOG_OUT_FAILURE':
      return {
        ...state,
        checkedLoggedIn: true,
      };
    default:
      return state;
  }
};

export default login;

export const getCheckedLoggedIn = (state) => state.checkedLoggedIn;
export const getToken = (state) => state.token;