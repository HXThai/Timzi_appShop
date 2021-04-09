import * as actions from '../Action/loginAction';

const initialLoginState = {
  isErrorLogin: false,
  responseLogin: null,
  loadingLogin: false,
  msgLogin: null,

  isErrorUserInformation: false,
  responseUserInformation: null,
  loadingUserInformation: false,
  msgUserInformation: null,
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

    case actions.ACTION_GET_USER_INFORMATION:
      return {
        ...state,
        isErrorUserInformation: false,
        responseUserInformation: null,
        loadingUserInformation: true,
        msgUserInformation: null,
      };

    case actions.ACTION_GET_USER_INFORMATION_SUCCESS:
      return {
        ...state,
        isErrorUserInformation: false,
        responseUserInformation: action.payload,
        loadingUserInformation: false,
        msgUserInformation: null,
      };

    case actions.ACTION_GET_USER_INFORMATION_FAILD:
      return {
        ...state,
        isErrorUserInformation: true,
        responseUserInformation: null,
        loadingUserInformation: false,
        msgUserInformation: action.payload,
      };
    default:
      return state;
  }
};

export default loginReducer;
