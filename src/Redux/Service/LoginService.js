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
};
