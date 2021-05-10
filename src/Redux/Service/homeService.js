import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListCategory: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_CATEGORY}`;
    let response = callApiService.get(url);
    return response;
  },
  getStoreDetailWithBookTableInStore: async (params) => {
    console.log('thái ssssss');
    let url = `${API_BASE_URL.GET_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE}?book_table_id=${params.id}`;
    let response = callApiService.get(url);
    return response;
  },
};
