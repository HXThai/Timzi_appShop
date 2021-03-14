import * as actions from '../Action/homeAction';

const initialHomeState = {
  isErrorCategory: false,
  responseCategory: null,
  loadingCategory: false,
  msgCategory: null,
};

const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case actions.ACTION_GET_CATEGORY:
      return {
        ...state,
        isErrorCategory: false,
        responseCategory: null,
        loadingCategory: true,
        msgCategory: null,
      };

    case actions.ACTION_GET_CATEGORY_SUCCESS:
      return {
        ...state,
        isErrorCategory: false,
        responseCategory: action.payload,
        loadingCategory: false,
        msgCategory: null,
      };

    case actions.ACTION_GET_CATEGORY_FAIL:
      return {
        ...state,
        isErrorCategory: true,
        responseCategory: null,
        loadingCategory: false,
        msgCategory: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
