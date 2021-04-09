const ACTION_LOGIN = '[LOGIN] ACTION_LOGIN';
const login = (params) => {
  return {
    type: ACTION_LOGIN,
    payload: params,
  };
};

const ACTION_LOGIN_SUCCESS = '[LOGIN] ACTION_LOGIN_SUCCESS';
const loginSuccess = (response) => {
  return {
    type: ACTION_LOGIN_SUCCESS,
    payload: response,
  };
};

const ACTION_LOGIN_FAILD = '[LOGIN] ACTION_LOGIN_FAILD';
const loginFaild = (response) => {
  return {
    type: ACTION_LOGIN_FAILD,
    payload: response,
  };
};

//-----------------

const ACTION_GET_USER_INFORMATION = '[USER] ACTION_GET_USER_INFORMATION';
const getUserInformation = (params) => {
  return {
    type: ACTION_GET_USER_INFORMATION,
    payload: params,
  };
};

const ACTION_GET_USER_INFORMATION_SUCCESS =
  '[USER] ACTION_GET_USER_INFORMATION_SUCCESS';
const getUserInformationSuccess = (response) => {
  return {
    type: ACTION_GET_USER_INFORMATION_SUCCESS,
    payload: response,
  };
};

const ACTION_GET_USER_INFORMATION_FAILD =
  '[USER] ACTION_GET_USER_INFORMATION_FAILD';
const getUserInformationFaild = (response) => {
  return {
    type: ACTION_GET_USER_INFORMATION_FAILD,
    payload: response,
  };
};

export {
  ACTION_LOGIN,
  login,
  ACTION_LOGIN_SUCCESS,
  loginSuccess,
  ACTION_LOGIN_FAILD,
  loginFaild,
  //------------------
  ACTION_GET_USER_INFORMATION,
  getUserInformation,
  ACTION_GET_USER_INFORMATION_SUCCESS,
  getUserInformationSuccess,
  ACTION_GET_USER_INFORMATION_FAILD,
  getUserInformationFaild,
};
