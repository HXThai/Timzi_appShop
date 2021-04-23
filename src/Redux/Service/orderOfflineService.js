import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListOrderOffline: async (params, store_id, status) => {
    let url = `${API_BASE_URL.GET_LIST_ORDER_OFFLINE}?store_id=${store_id}&status=${status}`;
    let response = callApiService.get(url);
    return response;
  },
  orderOnlineDetail: async (params, id) => {
    let url = `${API_BASE_URL.ORDER_ONLINE_DETAIL}/${id}`;
    let response = callApiService.get(url);
    return response;
  },
  confirmOrderOnline: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_ORDER_ONLINE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  confirmOrderOnlineReceived: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_ORDER_ONLINE_RECEIVED}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  cancelOrderOnline: async (params, id) => {
    let url = `${API_BASE_URL.CANCEL_ORDER_ONLINE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
};
