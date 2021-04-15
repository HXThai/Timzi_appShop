import {API_BASE_URL} from '../../Constants/url.constant';
import callApiService from '../../utils/callAPI.service';

export default homeService = {
  getListProvince: async (params) => {
    let url = `${API_BASE_URL.GET_LIST_PROVINCE}`;
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

  getListStaffWaitConnect: async (params, id, status) => {
    let url = `${API_BASE_URL.GET_LIST_STAFF_WAIT_CONNECT}?store_id=${id}&status=${status}`;
    let response = callApiService.get(url);
    return response;
  },
  deleteStaff: async (params) => {
    let url = `${API_BASE_URL.DELETE_STAFF}`;
    let response = callApiService.delete(url, params);
    return response;
  },
  confirmStaff: async (params) => {
    let url = `${API_BASE_URL.CONFIRM_STAFF}`;
    let response = callApiService.put(url, params);
    return response;
  },
  stopStaff: async (params) => {
    let url = `${API_BASE_URL.STOP_STAFF}`;
    let response = callApiService.put(url, params);
    return response;
  },
  activeStaff: async (params) => {
    let url = `${API_BASE_URL.ACTIVE_STAFF}`;
    let response = callApiService.put(url, params);
    return response;
  },

  listStoreOwner: async (params, id) => {
    let url = `${API_BASE_URL.LIST_STORE_OWNER}/${id}`;
    let response = callApiService.get(url, params);
    return response;
  },
  confirmStoreOwner: async (params) => {
    let url = `${API_BASE_URL.CONFIRM_STORE_OWNER}`;
    let response = callApiService.put(url, params);
    return response;
  },
};
