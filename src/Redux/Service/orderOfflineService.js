import { API_BASE_URL } from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListOrderOffline: async (params, store_id, status, page, from_date, to_date) => {
    let url = `${API_BASE_URL.GET_LIST_ORDER_OFFLINE}?store_id=${store_id}&status=${status}&page=${page}&from_date=${from_date}&to_date=${to_date}`;
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
  getListTableOrderOffline: async (params, id, page,) => {
    let url = `${API_BASE_URL.GET_LIST_TABLE_ORDER_OFFLINE}/${id}?page=${page}`;
    let response = callApiService.get(url);
    return response;
  },
  confirmFoodOnTheTable: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_FOOD_ON_THE_TABLE}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  returnBookFood: async (params) => {
    let url = `${API_BASE_URL.RETURN_BOOK_FOOD}`;
    let response = callApiService.put(url, params);
    return response;
  },
  confirmPaymentBookfood: async (params, id) => {
    let url = `${API_BASE_URL.CONFIRM_PAYMENT_BOOKFOOD}/${id}`;
    let response = callApiService.put(url);
    return response;
  },
  confirmPaymentBookfoodWithStaff: async (params) => {
    let url = `${API_BASE_URL.CONFIRM_PAYMENT_BOOKFOOD_WITH_STAFF}`;
    let response = callApiService.put(url, params);
    return response;
  },
  bookTableWithStaff: async (params, id) => {
    let url = `${API_BASE_URL.BOOK_TABLE_WITH_STAFF}`;
    let response = callApiService.post(url, params);
    return response;
  },

  getListTableEmpty: async (params, id) => {
    let url = `${API_BASE_URL.GET_LIST_TABLE_EMPTY}/${id}`;
    let response = callApiService.get(url, params);
    return response;
  },
  mergeTableWithOwner: async (params) => {
    let url = `${API_BASE_URL.MERGE_TABLE_WITH_OWNER}`;
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
  comboBookTable: async (params, id) => {
    let url = `${API_BASE_URL.COMBO_BOOK_TABLE_IN_STORE}`;
    let response = callApiService.post(url, params);
    return response;
  },
  submitOrderFood: async (params, id) => {
    let url = `${API_BASE_URL.SUBMIT_ORDER_FOOD}/${id}`;
    let response = callApiService.put(url, params);
    return response;
  },
  requestQrCode: async (params) => {
    let url = `${API_BASE_URL.QR_CODE}`;
    let response = callApiService.post(url, params);
    return response;
  },
};
