import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListCategory: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_CATEGORY}`;
    let response = callApiService.get(url);
    return response;
  },
};
