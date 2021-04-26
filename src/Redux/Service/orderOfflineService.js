import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListOrderOffline: async (params, store_id, status) => {
    let url = `${API_BASE_URL.GET_LIST_ORDER_OFFLINE}?store_id=${store_id}&status=${status}`;
    let response = callApiService.get(url);
    return response;
  },
  orderOfflineDetail: async (params, id) => {
    let url = `${API_BASE_URL.ORDER_OFFLINE_DETAIL}/${id}`;
    let response = callApiService.get(url);
    return response;
  },
  confirmOrderOffline: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_ORDER_OFFLINE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  confirmOrderOnlineReceived: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_ORDER_ONLINE_RECEIVED}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  cancelOrderOffline: async (params, id) => {
    let url = `${API_BASE_URL.CANCEL_ORDER_OFFLINE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  rightToOrderOffline: async (params, id) => {
    let url = `${API_BASE_URL.RIGHT_TO_ORDER_OFFLINE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  getListTableOrderOffline: async (params, id) => {
    let url = `${API_BASE_URL.GET_LIST_TABLE_ORDER_OFFLINE}/${id}`;
    let response = callApiService.get(url);
    return response;
  },
  confirmFoodOnTheTable: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_FOOD_ON_THE_TABLE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
};
