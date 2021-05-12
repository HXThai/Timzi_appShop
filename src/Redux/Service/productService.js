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
  getListProductType: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_PRODUCT}?category_food_id=${params.category_food_id}&store_id=${params.store_id}&type=${params.type}`;
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
  foodDetail: async (params, id) => {
    let url = `${API_BASE_URL.FOOD_DETAIL}/${id}`;
    let response = callApiService.get(url);
    return response;
  },
  listCategoryTopping: async (params, id) => {
    let url = `${API_BASE_URL.LIST_CATEGORY_TOPPING}/${id}`;
    let response = callApiService.get(url);
    return response;
  },
  updateToppingFood: async (params, id) => {
    let url = `${API_BASE_URL.UPDATE_TOPPING_FOOD}/${id}`;
    let response = callApiService.get(url);
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
  createStore: async (params) => {
    let url = `${API_BASE_URL.CREATE_STORE}`;
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
  updateToppingFood: async (params, id) => {
    let url = `${API_BASE_URL.UPDATE_TOPPING_FOOD}/${id}`;
    let response = callApiService.postFD(url, params);
    return response;
  },

  getListProvince: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_PROVINCE}`;
    let response = callApiService.get(url);
    return response;
  },
  getListDistrict: async (params, province_id) => {
    let url = `${API_BASE_URL.GET_LIST_DISTRICT}?province_id=${province_id}`;
    let response = callApiService.get(url);
    return response;
  },
  getListWard: async (params, province_id, district_id) => {
    let url = `${API_BASE_URL.GET_LIST_WARD}?province_id=${province_id}&district_id=${district_id}`;
    let response = callApiService.get(url);
    return response;
  },

  getListCategory: async (params, latitude, longtidue) => {
    let url = `${API_BASE_URL.LIST_CATEGORY}?latitude=${latitude}&longtidue=${longtidue}`;
    let response = callApiService.get(url);
    return response;
  },

  getLocationSuggest: async (params, suggest) => {
    let url = `${API_BASE_URL.GET_LOCATION_SUGGEST}?input=${suggest}&api_key=JCVWJnabFfQ7QF7Fts2FBKCBSWvpmB7MGBYEE5lS`;
    let response = callApiService.get(url);
    return response;
  },
  getLocationDetail: async (params, place_id) => {
    let url = `${API_BASE_URL.GET_LOCATION_DETAIL}?place_id=${place_id}&api_key=JCVWJnabFfQ7QF7Fts2FBKCBSWvpmB7MGBYEE5lS`;
    let response = callApiService.get(url);
    return response;
  },
  getListCategoryWithStore: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_CATEGORY_WITH_STORE}`;
    let response = callApiService.get(url);
    return response;
  },
  getListCategoryStoreFood: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_CATEGORY_STORE_FOOD}`;
    let response = callApiService.get(url);
    return response;
  },

  createCategoryStoreFood: async (params) => {
    let url = `${API_BASE_URL.CREATE_CATEGORY_STORE_FOOD}`;
    let response = callApiService.post(url, params);
    return response;
  },
  updateCategoryStoreFood: async (params, id) => {
    let url = `${API_BASE_URL.UPDATE_CATEGORY_STORE_FOOD}/${id}`;
    let response = callApiService.put(url, params);
    return response;
  },
  deleteCategoryStoreFood: async (params, id) => {
    let url = `${API_BASE_URL.DELETE_CATEGORY_STORE_FOOD}/${id}`;
    let response = callApiService.delete(url, params);
    return response;
  },

  deleteFood: async (params, id) => {
    let url = `${API_BASE_URL.DELETE_FOOD}/${id}`;
    let response = callApiService.delete(url, params);
    return response;
  },
  deleteTable: async (params, id) => {
    let url = `${API_BASE_URL.DELETE_TABLE}/${id}`;
    let response = callApiService.delete(url, params);
    return response;
  },
};
