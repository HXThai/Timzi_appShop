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

export {
  ACTION_GET_CATEGORY,
  getCategory,
  ACTION_GET_CATEGORY_SUCCESS,
  getCategorySuccess,
  ACTION_GET_CATEGORY_FAILD,
  getCategoryFaild,
};
