const ROOT_DOMAIN = 'http://103.226.249.210:8020';

const API_BASE_URL = {
  LOGIN: ROOT_DOMAIN + '/api/login-staff',
  REGISTER: ROOT_DOMAIN + '/api/register-staff',
  LOGOUT: ROOT_DOMAIN + '/auth/logout',
  USER: ROOT_DOMAIN + '/users',
  GET_LIST_STORE: ROOT_DOMAIN + '/api/store/list-store-with-owner',
};

export {API_BASE_URL};
