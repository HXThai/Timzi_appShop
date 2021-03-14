import * as actions from '../Action/loginAction';

const initialLoginState = {
  isErrorLogin: false,
  responseLogin: null,
  loadingLogin: false,
  msgLogin: null,
};

const loginReducer = (state = initialLoginState, action) => {
  switch (action.type) {
    case actions.ACTION_LOGIN:
      return {
        ...state,
        isErrorLogin: false,
        responseLogin: null,
        loadingLogin: true,
        msgLogin: null,
      };

    case actions.ACTION_LOGIN_SUCCESS:
      return {
        ...state,
        isErrorLogin: false,
        responseLogin: action.payload,
        loadingLogin: false,
        msgLogin: null,
      };

    case actions.ACTION_LOGIN_FAILD:
      return {
        ...state,
        isErrorLogin: true,
        responseLogin: null,
        loadingLogin: false,
        msgLogin: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
