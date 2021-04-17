import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListStorePromotion: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_STORE_PROMOTION}?store_id=${params.store_id}`;
    let response = callApiService.get(url);
    return response;
  },
  promotionRestaurantDetail: async (params) => {
    let url = `${API_BASE_URL.PROMOTION_STORE_DETAIL}/${params.id}`;
    let response = callApiService.get(url);
    return response;
  },
  addPromotionStore: async (params) => {
    let url = `${API_BASE_URL.ADD_PROMOTION_STORE}`;
    let response = callApiService.postFD(url, params);
    return response;
  },

  getListComboStore: async (params, id) => {
    let url = `${API_BASE_URL.GET_LIST_COMBO_STORE}/${id}`;
    let response = callApiService.get(url, params);
    return response;
  },
  addComboStore: async (params) => {
    let url = `${API_BASE_URL.ADD_COMBO_STORE}`;
    let response = callApiService.postFD(url, params);
    return response;
  },
  promotionComboDetail: async (params) => {
    let url = `${API_BASE_URL.PROMOTION_COMBO_DETAIL}/${params.id}`;
    let response = callApiService.get(url);
    return response;
  },
  editComboStore: async (params, id) => {
    let url = `${API_BASE_URL.EDIT_COMBO_STORE}/${id}`;
    let response = callApiService.postFD(url, params);
    return response;
  },
  deleteComboStore: async (params, id) => {
    let url = `${API_BASE_URL.DELETE_COMBO_STORE}/${id}`;
    let response = callApiService.delete(url, params);
    return response;
  },
};
