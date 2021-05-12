import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListOrderOffline: async (params, store_id, status, page) => {
    let url = `${API_BASE_URL.GET_LIST_ORDER_OFFLINE}?store_id=${store_id}&status=${status}&page=${page}`;
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
  getListTableOrderOffline: async (params, id, page) => {
    let url = `${API_BASE_URL.GET_LIST_TABLE_ORDER_OFFLINE}/${id}?page=${page}`;
    let response = callApiService.get(url);
    return response;
  },
  confirmFoodOnTheTable: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_FOOD_ON_THE_TABLE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  confirmPaymentBookfood: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_PAYMENT_BOOKFOOD}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  bookTableWithStaff: async (params, id) => {
    let url = `${API_BASE_URL.BOOK_TABLE_WITH_STAFF}`;
    let response = callApiService.post(url, params);
    return response;
  },
  orderFoodWithBookTable: async (params, id) => {
    let url = `${API_BASE_URL.ORDER_FOOD_WITH_BOOK_TABLE_IN_STORE}`;
    let response = callApiService.post(url, params);
    return response;
  },
  subtractQuantityFood: async (params, id) => {
    let url = `${API_BASE_URL.SUBTRACT_QUANTITY_BOOK_FOOD_IN_STORE}`;
    let response = callApiService.put(url, params);
    return response;
  },
};
