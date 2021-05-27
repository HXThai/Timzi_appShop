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
  CREATE_STORE: ROOT_DOMAIN + '/store/create-store',

  GET_LIST_STAFF_WAIT_CONNECT: ROOT_DOMAIN + '/store/list-staff-in-store',
  DELETE_STAFF: ROOT_DOMAIN + '/store/delete-staff',
  CONFIRM_STAFF: ROOT_DOMAIN + '/store/confirm-staff',
  STOP_STAFF: ROOT_DOMAIN + '/store/stop-staff',
  ACTIVE_STAFF: ROOT_DOMAIN + '/store/active-staff',

  CHANGE_PASSWORD: ROOT_DOMAIN + '/change-password',
  CONFIRM_OTP: ROOT_DOMAIN + '/check-otp-register',

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
  LIST_CATEGORY: ROOT_DOMAIN + '/list-category',

  GET_LIST_ORDER_OFFLINE:
    ROOT_DOMAIN + '/book-table/list-book-table-store-with-owner',
  ORDER_OFFLINE_DETAIL:
    ROOT_DOMAIN + '/book-table/book-table-store-detail-with-owner',
  CONFIRM_ORDER_OFFLINE: ROOT_DOMAIN + '/book-table/confirm-book-table-store',
  CANCEL_ORDER_OFFLINE: ROOT_DOMAIN + '/book-table/cancel-book-table-store',
  RIGHT_TO_ORDER_OFFLINE: ROOT_DOMAIN + '/book-table/right-to-order-with-owner',
  GET_LIST_TABLE_ORDER_OFFLINE: ROOT_DOMAIN + '/book-table/list-table-store',
  CONFIRM_FOOD_ON_THE_TABLE:
    ROOT_DOMAIN + '/book-table/confirm-food-on-the-table',
  RETURN_BOOK_FOOD: ROOT_DOMAIN + '/book-table/return-book-food',
  CONFIRM_PAYMENT_BOOKFOOD:
    ROOT_DOMAIN + '/book-table/confirm-payment-book-food-with-owner',
  CONFIRM_PAYMENT_BOOKFOOD_WITH_STAFF:
    ROOT_DOMAIN + '/book-table/payment-book-food-with-staff',

  GET_LOCATION_SUGGEST:
    'https://maps.googleapis.com/maps/api/place/autocomplete/json',
  GET_LOCATION_DETAIL:
    'https://maps.googleapis.com/maps/api/place/details/json',

  GET_LIST_CATEGORY_WITH_STORE: ROOT_DOMAIN + '/list-category-with-store',
  GET_LIST_CATEGORY_STORE_FOOD:
    ROOT_DOMAIN + '/category/list-category-store-food',

  GET_LIST_PROGRAM_SYSTEM: ROOT_DOMAIN + '/program/list-program-system',
  PROMOTION_TIMZI_DETAIL: ROOT_DOMAIN + '/program/program-system-detail',
  RECEIVE_PROGRAM_SYSTEM: ROOT_DOMAIN + '/program/receive-program-system',
  BOOK_TABLE_WITH_STAFF: ROOT_DOMAIN + '/book-table/book-table-with-staff',

  GET_LIST_PROGRAM_SYSTEM_WITH_STORE:
    ROOT_DOMAIN + '/program/list-program-system-with-store',
  STOP_PROGRAM_SYSTEM_WITH_STORE:
    ROOT_DOMAIN + '/program/stop-program-system-with-store',

  CREATE_CATEGORY_STORE_FOOD:
    ROOT_DOMAIN + '/category/create-category-store-food',
  UPDATE_CATEGORY_STORE_FOOD:
    ROOT_DOMAIN + '/category/update-category-store-food',
  DELETE_CATEGORY_STORE_FOOD:
    ROOT_DOMAIN + '/category/delete-category-store-food',
  DELETE_FOOD: ROOT_DOMAIN + '/food/delete-food',
  DELETE_TABLE: ROOT_DOMAIN + '/table-store/delete-table-store',

  RATE_OF_USER: ROOT_DOMAIN + '/order/list-evaluate-with-store',
  GET_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE:
    ROOT_DOMAIN + '/book-table/store-detail-with-book-table-in-store',
  ORDER_FOOD_WITH_BOOK_TABLE_IN_STORE:
    ROOT_DOMAIN + '/book-table/order-food-with-book-table-in-store',
  SUBTRACT_QUANTITY_BOOK_FOOD_IN_STORE:
    ROOT_DOMAIN + '/book-table/subtract-quantity-book-food-in-store',
  COMBO_BOOK_TABLE_IN_STORE:
    ROOT_DOMAIN + '/book-table/order-combo-with-book-table-in-store',

  GET_NOTIFICATION: ROOT_DOMAIN + '/notify/list-notify',
  CONFIRM_VIEW_NOTIFICATION: ROOT_DOMAIN + '/notify/confirm-view-notify',

  GET_LIST_RENENUE_STORE: ROOT_DOMAIN + '/store/list-revenue-store',
  GET_LIST_DISCOUNT_STORE: ROOT_DOMAIN + '/store/list-discount-store',
  GET_LIST_DISCOUNT_THIS_MONTH_STORE:
    ROOT_DOMAIN + '/store/discount-this-month-store',

  CONFIRM_OTP_REGISTER: ROOT_DOMAIN + '/check-otp-register',
  CONFIRM_OTP_FORGOT_PASSWORD: ROOT_DOMAIN + '/check-otp-verify',
  FORGOT_PASSWORD: ROOT_DOMAIN + '/forgot-password',
  CONFIRM_FORGOT_PASSWORD: ROOT_DOMAIN + '/update-new-password',

  GET_LIST_TABLE_EMPTY: ROOT_DOMAIN + '/store/list-table-empty',
  MERGE_TABLE_WITH_OWNER: ROOT_DOMAIN + '/book-table/table-merge-with-owner',

  SUBMIT_ORDER_FOOD: ROOT_DOMAIN + '/book-table/submit-order-food-with-staff',
  QR_CODE: ROOT_DOMAIN + '/book-table/book-table-qr-code-with-staff ',
  
};

export {API_BASE_URL};
