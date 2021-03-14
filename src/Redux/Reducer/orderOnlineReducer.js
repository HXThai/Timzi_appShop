import * as actions from '../Action/orderOnlineAction';

const initialHomeState = {
  isErrorListStore: false,
  responseListStore: null,
  loadingListStore: false,
  msgListStore: null,
};

const homeReducer = (state = initialHomeState, action) => {
  switch (action.type) {
    case actions.ACTION_GET_LIST_STORE:
      return {
        ...state,
        isErrorListStore: false,
        responseListStore: null,
        loadingListStore: true,
        msgListStore: null,
      };

    case actions.ACTION_GET_LIST_STORE_SUCCESS:
      return {
        ...state,
        isErrorListStore: false,
        responseListStore: action.payload,
        loadingListStore: false,
        msgListStore: null,
      };

    case actions.ACTION_GET_LIST_STORE_FAILD:
      return {
        ...state,
        isErrorListStore: true,
        responseListStore: null,
        loadingListStore: false,
        msgListStore: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;
