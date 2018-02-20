const initialState = {
  token: null,
  checkedLoggedIn: false,
};

const logIn = (state = initialState, action) => {
  switch (action.type) {
    case 'CHECK_LOGGED_IN':
      return{
        ...state,
        token: action.token,
        checkedLoggedIn: true,
      }
    case 'SET_TOKEN':
      return{
        ...state,
        token: action.token,
      }
    default:
      return state;
  }
};

export default logIn;

export const getCheckedLoggedIn = (state) => state.checkedLoggedIn;
export const getToken = (state) => state.token;