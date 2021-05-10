const ACTION_GET_CATEGORY = '[HOME] ACTION_CATEGORY';
const getCategory = (params) => {
  return {
    type: ACTION_GET_CATEGORY,
    payload: params,
  };
};

const ACTION_GET_CATEGORY_SUCCESS = '[HOME] ACTION_CATEGORY_SUCCESS';
const getCategorySuccess = (response) => {
  return {
    type: ACTION_GET_CATEGORY_SUCCESS,
    payload: response,
  };
};

const ACTION_GET_CATEGORY_FAILD = '[HOME] ACTION_CATEGORY_FAILD';
const getCategoryFaild = (response) => {
  return {
    type: ACTION_GET_CATEGORY_FAILD,
    payload: response,
  };
};

const ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE =
  '[HOME] ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE';
const getStoreDetailWithBookTableInStore = (params) => {
  return {
    type: ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE,
    payload: params,
  };
};

const ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_SUCCESS =
  '[HOME] ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_SUCCESS';
const getStoreDetailWithBookTableInStoreSuccess = (response) => {
  return {
    type: ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_SUCCESS,
    payload: response,
  };
};

const ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_FAILD =
  '[HOME] ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_FAILD';
const getStoreDetailWithBookTableInStoreFaild = (response) => {
  return {
    type: ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_FAILD,
    payload: response,
  };
};

export {
  ACTION_GET_CATEGORY,
  getCategory,
  ACTION_GET_CATEGORY_SUCCESS,
  getCategorySuccess,
  ACTION_GET_CATEGORY_FAILD,
  getCategoryFaild,
  ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE,
  getStoreDetailWithBookTableInStore,
  ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_SUCCESS,
  getStoreDetailWithBookTableInStoreSuccess,
  ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_FAILD,
  getStoreDetailWithBookTableInStoreFaild,
};
