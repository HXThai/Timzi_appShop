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

  getListProgramSystem: async (params, store_id, page) => {
    let url = `${API_BASE_URL.GET_LIST_PROGRAM_SYSTEM}?store_id=${store_id}&page=${page}`;
    let response = callApiService.get(url);
    return response;
  },
  promotionTimziDetail: async (params) => {
    let url = `${API_BASE_URL.PROMOTION_TIMZI_DETAIL}/${params.id}`;
    let response = callApiService.get(url);
    return response;
  },
  receiveProgramSystem: async (params) => {
    let url = `${API_BASE_URL.RECEIVE_PROGRAM_SYSTEM}`;
    let response = callApiService.post(url, params);
    return response;
  },

  getListProgramSystemWithStore: async (params, store_id) => {
    let url = `${API_BASE_URL.GET_LIST_PROGRAM_SYSTEM_WITH_STORE}/${store_id}`;
    let response = callApiService.get(url);
    return response;
  },
  stopProgramSystemWithStore: async (params) => {
    let url = `${API_BASE_URL.STOP_PROGRAM_SYSTEM_WITH_STORE}`;
    let response = callApiService.delete(url, params);
    return response;
  },

  getListRateOfUser: async (params, store_id, page) => {
    let url = `${API_BASE_URL.RATE_OF_USER}/${store_id}?page=${page}`;
    let response = callApiService.get(url);
    return response;
  },
};
