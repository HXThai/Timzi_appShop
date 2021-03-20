const ROOT_DOMAIN = 'http://103.226.249.210:8020/api';

const API_BASE_URL = {
  LOGIN: ROOT_DOMAIN + '/login-staff',
  REGISTER: ROOT_DOMAIN + '/register-staff',
  LOGOUT: ROOT_DOMAIN + '/auth/logout',
  USER: ROOT_DOMAIN + '/users',
  GET_LIST_STORE: ROOT_DOMAIN + '/store/list-store-with-owner',
  STORE_DETAIL: ROOT_DOMAIN + '/store/store-detail-with-owner',
  GET_LIST_PRODUCT: ROOT_DOMAIN + '/store/list-food-with-category',
  ADD_FOOD: ROOT_DOMAIN + '/food/create-food',
  EDIT_FOOD: ROOT_DOMAIN + '/food/update-food',
  GET_LIST_STORE_PROMOTION: ROOT_DOMAIN + '/program-store/list-program-store',
  PROMOTION_STORE_DETAIL: ROOT_DOMAIN + '/program-store/program-store-detail',
  ADD_PROMOTION_STORE: ROOT_DOMAIN + '/program-store/create-program-store',
};

export {API_BASE_URL};
