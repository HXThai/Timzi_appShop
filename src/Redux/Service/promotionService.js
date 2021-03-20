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
};
