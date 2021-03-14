import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getUser: async (params) => {
    let url = `${API_BASE_URL.USER}/:${params}`;
    let response = callApiService.get(url, params);
    // console.log(response);
    return response;
  },
};
