import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  storeDetail: async (params) => {
    let url = `${API_BASE_URL.STORE_DETAIL}/${params}`;
    let response = callApiService.get(url);
    return response;
  },
  getListProduct: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_PRODUCT}?category_food_id=${params.category_food_id}&store_id=${params.store_id}`;
    let response = callApiService.get(url);
    return response;
  },
  addFood: async (params) => {
    let url = `${API_BASE_URL.ADD_FOOD}`;
    let response = callApiService.postFD(url, params);
    return response;
  },
  editFood: async (params, id) => {
    let url = `${API_BASE_URL.EDIT_FOOD}/${id}`;
    let response = callApiService.postFD(url, params);
    return response;
  },
};
