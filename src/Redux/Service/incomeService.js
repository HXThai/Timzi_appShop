import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListRevenueStore: async (params, storeId, page) => {
    let url = `${API_BASE_URL.GET_LIST_RENENUE_STORE}/${storeId}?page=${page}`;
    let response = callApiService.get(url);
    return response;
  },
  getListDiscountStore: async (params, storeId, page) => {
    let url = `${API_BASE_URL.GET_LIST_DISCOUNT_STORE}/${storeId}?page=${page}`;
    let response = callApiService.get(url);
    return response;
  },
  getListDiscountThisMonthStore: async (params, storeId) => {
    let url = `${API_BASE_URL.GET_LIST_DISCOUNT_THIS_MONTH_STORE}/${storeId}`;
    let response = callApiService.get(url);
    return response;
  },
};
