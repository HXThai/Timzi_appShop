export const ADD_TOPPING = 'ADD_TOPPING';
export const UPDATE_SIZE = 'UPDATE_SIZE';
export const UPDATE_TEMP_COUNT = 'UPDATE_TEMP_COUNT';
export const EAT_AT_SHOP = 'EAT_AT_SHOP';
export const UPDATE_CART = 'UPDATE_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const addTopping = (params) => {
  return {
    type: ADD_TOPPING,
    payload: params,
  };
};

export const updateQuantity = (params) => {
  return {
    type: UPDATE_QUANTITY,
    payload: params,
  };
};

export const updateSize = (params) => {
  return {
    type: UPDATE_SIZE,
    payload: params,
  };
};

export const updateTempCount = (params) => {
  return {
    type: UPDATE_TEMP_COUNT,
    payload: params,
  };
};

export const updateCart = (params) => {
  return {
    type: UPDATE_CART,
    payload: params,
  };
};
