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

  addTable: async (params) => {
    let url = `${API_BASE_URL.ADD_TABLE}`;
    let response = callApiService.post(url, params);
    return response;
  },
  editTable: async (params, id) => {
    let url = `${API_BASE_URL.EDIT_TABLE}/${id}`;
    let response = callApiService.put(url, params);
    return response;
  },

  editStore: async (params, id) => {
    let url = `${API_BASE_URL.EDIT_STORE}/${id}`;
    let response = callApiService.postFD(url, params);
    return response;
  },

  updateSize: async (params, id) => {
    let url = `${API_BASE_URL.UPDATE_SIZE}/${id}`;
    let response = callApiService.postFD(url, params);
    return response;
  },
  updateCategoryTopping: async (params, id) => {
    let url = `${API_BASE_URL.UPDATE_CATEGORY_TOPPING}/${id}`;
    let response = callApiService.postFD(url, params);
    return response;
  },
};
