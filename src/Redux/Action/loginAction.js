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

export {
  ACTION_LOGIN,
  login,
  ACTION_LOGIN_SUCCESS,
  loginSuccess,
  ACTION_LOGIN_FAILD,
  loginFaild,
};
