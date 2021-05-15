import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  login: async (params) => {
    let url = `${API_BASE_URL.LOGIN}`;
    let response = callApiService.post(url, params);
    // console.log(response);
    return response;
  },
  register: async (params) => {
    let url = `${API_BASE_URL.REGISTER}`;
    console.log(params);
    let response = callApiService.post(url, params);
    // console.log(response);
    return response;
  },
  logout: async (params) => {
    let url = `${API_BASE_URL.LOGOUT}`;
    let response = callApiService.get(url, params);
    // console.log(response);
    return response;
  },

  getUserInformation: async (params) => {
    let url = `${API_BASE_URL.GET_USER_INFORMATION}`;
    let response = callApiService.get(url, params);
    // console.log(url, params);
    // console.log(response);
    return response;
  },

  changePassword: async (params) => {
    let url = `${API_BASE_URL.CHANGE_PASSWORD}`;
    let response = callApiService.put(url, params);
    // console.log(response);
    return response;
  },
  confirmOTPRegister: async (params) => {
    let url = `${API_BASE_URL.CONFIRM_OTP_REGISTER}`;
    let response = callApiService.put(url, params);
    // console.log(response);
    return response;
  },
  confirmOTPForgotPassword: async (params) => {
    let url = `${API_BASE_URL.CONFIRM_OTP_FORGOT_PASSWORD}`;
    let response = callApiService.put(url, params);
    // console.log(response);
    return response;
  },
  forgotPassword: async (params) => {
    let url = `${API_BASE_URL.FORGOT_PASSWORD}`;
    let response = callApiService.put(url, params);
    // console.log(response);
    return response;
  },
  confirmForgotPassword: async (params) => {
    let url = `${API_BASE_URL.CONFIRM_FORGOT_PASSWORD}`;
    let response = callApiService.put(url, params);
    // console.log(response);
    return response;
  },
};
