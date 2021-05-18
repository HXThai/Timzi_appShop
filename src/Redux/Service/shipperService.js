import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListShipper: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_SHIPPER}`;
    let response = callApiService.get(url);
    return response;
  },
  getListShipperStore: async (params, storeId, status) => {
    let url = `${API_BASE_URL.GET_LIST_SHIPPER_STORE}?store_id=${storeId}&status=${status}`;
    let response = callApiService.get(url);
    return response;
  },
  chooseShipper: async (params) => {
    let url = `${API_BASE_URL.CHOOSE_SHIPPER}`;
    let response = callApiService.post(url, params);
    return response;
  },
  deleteShipper: async (params) => {
    let url = `${API_BASE_URL.DELETE_SHIPPER}`;
    let response = callApiService.delete(url, params);
    return response;
  },
  searchShipper: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_SHIPPER}?name=${params}`;
    let response = callApiService.get(url);
    return response;
  },

  searchStore: async (params, name, province_id) => {
    let url = `${API_BASE_URL.SEARCH_STORE}?name=${name}&province_id=${province_id}`;
    let response = callApiService.get(url);
    return response;
  },
  chooseStore: async (params, id) => {
    let url = `${API_BASE_URL.CHOOSE_STORE}/${id}`;
    let response = callApiService.post(url);
    return response;
  },
  storeStaffChoose: async (params, id) => {
    let url = `${API_BASE_URL.STORE_STAFF_CHOOSE}/${id}`;
    let response = callApiService.get(url);
    return response;
  },
  deleteChooseStore: async (params, id) => {
    let url = `${API_BASE_URL.DELETE_CHOOSE_STORE}/${id}`;
    let response = callApiService.delete(url);
    return response;
  },
};
