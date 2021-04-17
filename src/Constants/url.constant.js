const ROOT_DOMAIN = 'http://103.226.249.210:8020/api';
// const ROOT_DOMAIN = 'http://127.0.0.1:8002/api';

const API_BASE_URL = {
  LOGIN: ROOT_DOMAIN + '/login-staff',
  REGISTER: ROOT_DOMAIN + '/register-staff',
  LOGOUT: ROOT_DOMAIN + '/auth/logout',
  USER: ROOT_DOMAIN + '/users',
  GET_USER_INFORMATION: ROOT_DOMAIN + '/get-user-infomation',

  GET_LIST_STORE: ROOT_DOMAIN + '/store/list-store-with-owner',
  STORE_DETAIL: ROOT_DOMAIN + '/store/store-detail-with-owner',
  GET_LIST_PRODUCT: ROOT_DOMAIN + '/store/list-food-with-category',
  ADD_FOOD: ROOT_DOMAIN + '/food/create-food',
  EDIT_FOOD: ROOT_DOMAIN + '/food/update-food',
  GET_LIST_STORE_PROMOTION: ROOT_DOMAIN + '/program-store/list-program-store',
  PROMOTION_STORE_DETAIL: ROOT_DOMAIN + '/program-store/program-store-detail',
  ADD_PROMOTION_STORE: ROOT_DOMAIN + '/program-store/create-program-store',
  FOOD_DETAIL: ROOT_DOMAIN + '/food-detail',
  LIST_CATEGORY_TOPPING: ROOT_DOMAIN + '/food/list-category-topping-food',
  UPDATE_TOPPING_FOOD: ROOT_DOMAIN + '/food/update-topping-food',

  GET_LIST_COMBO_STORE: ROOT_DOMAIN + '/combo-food/list-combo-food',
  ADD_COMBO_STORE: ROOT_DOMAIN + '/combo-food/create-combo-food',
  PROMOTION_COMBO_DETAIL: ROOT_DOMAIN + '/combo-food/combo-food-detail',
  EDIT_COMBO_STORE: ROOT_DOMAIN + '/combo-food/update-combo-food',
  DELETE_COMBO_STORE: ROOT_DOMAIN + '/combo-food/delete-combo-food',

  ADD_TABLE: ROOT_DOMAIN + '/table-store/create-table-store',
  EDIT_TABLE: ROOT_DOMAIN + '/table-store/update-table-store',

  GET_LIST_PROVINCE: ROOT_DOMAIN + '/list-province',
  GET_LIST_DISTRICT: ROOT_DOMAIN + '/list-district',
  GET_LIST_WARD: ROOT_DOMAIN + '/list-ward',
  SEARCH_STORE: ROOT_DOMAIN + '/store/search-store-with-staff',
  CHOOSE_STORE: ROOT_DOMAIN + '/store/choose-store',
  STORE_STAFF_CHOOSE: ROOT_DOMAIN + '/store/store-staff',
  DELETE_CHOOSE_STORE: ROOT_DOMAIN + '/store/delete-choose-store',

  GET_LIST_SHIPPER: ROOT_DOMAIN + '/store-shipper/list-shipper',
  GET_LIST_SHIPPER_STORE:
    ROOT_DOMAIN + '/store-shipper/list-shipper-with-store',
  CHOOSE_SHIPPER: ROOT_DOMAIN + '/store-shipper/choose-shipper',
  DELETE_SHIPPER: ROOT_DOMAIN + '/store-shipper/cancel-shipper-with-store',

  EDIT_STORE: ROOT_DOMAIN + '/store/update-store',

  GET_LIST_STAFF_WAIT_CONNECT: ROOT_DOMAIN + '/store/list-staff-in-store',
  DELETE_STAFF: ROOT_DOMAIN + '/store/delete-staff',
  CONFIRM_STAFF: ROOT_DOMAIN + '/store/confirm-staff',
  STOP_STAFF: ROOT_DOMAIN + '/store/stop-staff',
  ACTIVE_STAFF: ROOT_DOMAIN + '/store/active-staff',

  CHANGE_PASSWORD: ROOT_DOMAIN + '/change-password',

  GET_LIST_ORDER_ONLINE: ROOT_DOMAIN + '/order/list-order-with-owner',
  ORDER_ONLINE_DETAIL: ROOT_DOMAIN + '/order/order-detail-with-owner',
  CONFIRM_ORDER_ONLINE: ROOT_DOMAIN + '/order/confirm-order-with-owner',
  CONFIRM_ORDER_ONLINE_RECEIVED:
    ROOT_DOMAIN + '/order/shipper-received-order-with-owner',
  CANCEL_ORDER_ONLINE: ROOT_DOMAIN + '/order/cancel-order-with-owner',

  UPDATE_SIZE: ROOT_DOMAIN + '/food/update-size-food',
  UPDATE_CATEGORY_TOPPING: ROOT_DOMAIN + '/food/update-category-topping-food',
  UPDATE_TOPPING_FOOD: ROOT_DOMAIN + '/food/update-topping-food',

  LIST_STORE_OWNER: ROOT_DOMAIN + '/store/list-store-owner',
  CONFIRM_STORE_OWNER: ROOT_DOMAIN + '/store/confirm-store-owner',
};

export {API_BASE_URL};
