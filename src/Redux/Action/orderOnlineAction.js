const ACTION_GET_LIST_STORE = '[ORDER_ONLINE] ACTION_GET_LIST_STORE';
const getListStore = (params) => {
  return {
    type: ACTION_GET_LIST_STORE,
    payload: params,
  };
};

const ACTION_GET_LIST_STORE_SUCCESS =
  '[ORDER_ONLINE] ACTION_GET_LIST_STORE_SUCCESS';
const getListStoreSuccess = (response) => {
  return {
    type: ACTION_GET_LIST_STORE_SUCCESS,
    payload: response,
  };
};

const ACTION_GET_LIST_STORE_FAILD =
  '[ORDER_ONLINE] ACTION_GET_LIST_STORE_FAILD';
const getListStoreFaild = (response) => {
  return {
    type: ACTION_GET_LIST_STORE_FAILD,
    payload: response,
  };
};

export {
  ACTION_GET_LIST_STORE,
  getListStore,
  ACTION_GET_LIST_STORE_SUCCESS,
  getListStoreSuccess,
  ACTION_GET_LIST_STORE_FAILD,
  getListStoreFaild,
};
