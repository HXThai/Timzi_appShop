import {
  ADD_TOPPING,
  UPDATE_QUANTITY,
  UPDATE_TEMP_COUNT,
  UPDATE_SIZE,
  UPDATE_CART,
  EAT_AT_SHOP,
} from '../Action/EatAtShop';
import reactotron from 'reactotron-react-native';
import {CALCULATION, TYPE_UPDATE_CART} from '../../Constants/Constant';
import {useRef} from 'react';
import * as actions from '../Action/homeAction';

const initialState = {
  data: {
    category_food: null,
    program_store: null,
    combo_food: null,
    store: null,
    category_store_food: null,
  },
  isLoading: true,
  isLoadingModalSub: true,
  error: false,
  cart: [],

  isErrorStoreDetailWithBookTableInStore: false,
  responseStoreDetailWithBookTableInStore: null,
  isLoading: false,
  msgStoreDetailWithBookTableInStore: null,
};

export default function async(state = initialState, action) {
  switch (action.type) {
    case actions.ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE:
      return {
        ...state,
        error: false,
        responseStoreDetailWithBookTableInStore: null,
        isLoading: action.payload.isLoading,
      };

    case actions.ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_SUCCESS:
      var dataTemp = action.payload.data;
      var program_store = action.payload.data.store.program_store;
      var combo_food = action.payload.data.store.combo_food;
      var category_food = action.payload.data.category_food;
      var category_store_food = action.payload.data.category_store_food;
      spShopDetailReducer(program_store, true, (value) => {
        Object.assign(dataTemp, {program_store: value});
      });
      spShopDetailReducer(category_food, false, (value) => {
        Object.assign(dataTemp, {category_food: value});
      });
      spShopDetailReducer(category_store_food, false, (value) => {
        Object.assign(dataTemp, {category_store_food: value});
      });
      Object.assign(dataTemp, {
        combo_food: [...action.payload.data.store.combo_food],
      });
      return {
        ...state,
        error: false,
        data: dataTemp,
        isLoading: false,
      };

    case actions.ACTION_STORE_DETAIL_WITH_BOOK_TABLE_IN_STORE_FAILD:
      return {
        ...state,
        error: true,
        isLoading: false,
        msgStoreDetailWithBookTableInStore: action.payload,
      };
    // case EAT_AT_SHOP: {
    //   return {
    //     ...state,
    //     isLoading: action.payload.loading ? true : false,
    //     isLoadingModalSub: true,
    //   };
    // }

    // case success(EAT_AT_SHOP): {
    //   // var dataTemp = action.payload;
    //   // var program_store = action.payload.store.program_store;
    //   // var combo_food = action.payload.store.combo_food;
    //   // var category_food = action.payload.category_food;
    //   // var category_store_food = action.payload.category_store_food;
    //   // spShopDetailReducer(program_store, true, value => {
    //   //     Object.assign(dataTemp, { program_store: value });
    //   // });
    //   // spShopDetailReducer(category_food, false, value => {
    //   //     Object.assign(dataTemp, { category_food: value });
    //   // });
    //   // spShopDetailReducer(category_store_food, false, value => {
    //   //     Object.assign(dataTemp, { category_store_food: value });
    //   // });
    //   // Object.assign(dataTemp, { combo_food: [...action.payload.store.combo_food] });
    //   // return {
    //   //     ...state,
    //   //     isLoading: false,
    //   //     error: false,
    //   //     isLoadingModalSub: false,
    //   //     data: dataTemp
    //   // };
    // }
    // case fail(EAT_AT_SHOP): {
    //   return {
    //     ...state,
    //     error: true,
    //     isLoading: false,
    //   };
    // }
    case UPDATE_CART: {
      if (action.payload.calculation == CALCULATION.SUBTRACTION) {
        state.data[switch6(action.payload.value.itemFood.type)][
          action.payload.value.itemFood.index
        ].food[action.payload.value.itemFood.indexitemfood].book_food[
          action.payload.value.itemCard.index
        ].quantity > 0 &&
          state.data[switch6(action.payload.value.itemFood.type)][
            action.payload.value.itemFood.index
          ].food[action.payload.value.itemFood.indexitemfood].book_food[
            action.payload.value.itemCard.index
          ].quantity--;
        state.data[switch6(action.payload.value.itemFood.type)][
          action.payload.value.itemFood.index
        ].food[action.payload.value.itemFood.indexitemfood].book_food[
          action.payload.value.itemCard.index
        ].quantity == 0 &&
          state.data[switch6(action.payload.value.itemFood.type)][
            action.payload.value.itemFood.index
          ].food[action.payload.value.itemFood.indexitemfood].book_food.splice(
            action.payload.value.itemCard.index,
            1,
          );
      } else {
        state.data[switch6(action.payload.value.itemFood.type)][
          action.payload.value.itemFood.index
        ].food[action.payload.value.itemFood.indexitemfood].book_food[
          action.payload.value.itemCard.index
        ].quantity++;
      }
      return {
        ...state,
      };
    }
    case ADD_TOPPING: {
      const {
        indexCategory,
        indexFood,
        indexCategoryTopping,
        indexToppingFood,
        type,
      } = action.payload.data;
      var data =
        type == TYPE_UPDATE_CART.CATEGORY
          ? state.data.category_food[indexCategory].food[indexFood]
          : type == TYPE_UPDATE_CART.PROGRAM
          ? state.data.program_store[indexCategory].food[indexFood]
          : state.data.category_store_food[indexCategory].food[indexFood];
      var data1 =
        data.category_topping_food[indexCategoryTopping].topping_food[
          indexToppingFood
        ];
      var data2 = data.category_topping_food[indexCategoryTopping];
      // if (type == TYPE_UPDATE_CART.CATEGORY) {
      data1.check = data1.check == 0 ? 1 : 0;

      if (data1.check == 0) {
        data.money_topping = data.money_topping - data1.price;
      }
      if (data1.check == 1) {
        data.money_topping = data.money_topping + data1.price;
      }
      var position = data.temp_arr_topping.indexOf(data1.id);
      position == -1 && data2.id != -1
        ? data.temp_arr_topping.push(data1.id)
        : data2.id != -1 && data.temp_arr_topping.splice(position, 1);
      data.total_temp = data.money_food + data.money_topping * data.count_temp;
      // }
      return {
        ...state,
      };
    }
    case UPDATE_SIZE: {
      const {
        indexToppingFood,
        indexCategory,
        indexFood,
        indexCategoryTopping,
        type,
      } = action.payload.data;
      var data =
        type == TYPE_UPDATE_CART.CATEGORY
          ? state.data.category_food[indexCategory].food[indexFood]
          : type == TYPE_UPDATE_CART.PROGRAM
          ? state.data.program_store[indexCategory].food[indexFood]
          : state.data.category_store_food[indexCategory].food[indexFood];
      // var data1 = data.category_topping_food[indexCategoryTopping].topping_food[indexToppingFood];
      var position_check = 0;
      var money = 0;
      action.payload.data.itemTopping.topping_food.map((item, index) => {
        if (item.check == 1) {
          position_check = index;
          money = item.price;
        }
      });
      action.payload.data.itemTopping.topping_food.map((item, index) => {
        if (indexToppingFood == index) {
          data.category_topping_food[indexCategoryTopping].topping_food[
            index
          ].check = 1;
          data.money_topping = data.money_topping + item.price - money;
          data.temp_size =
            data.category_topping_food[indexCategoryTopping].topping_food[
              index
            ].id;
        } else {
          data.category_topping_food[indexCategoryTopping].topping_food[
            index
          ].check = 0;
        }
      });
      data.total_temp = data.money_food + data.money_topping * data.count_temp;
      return {
        ...state,
      };
    }
    case UPDATE_TEMP_COUNT: {
      var price =
        action.payload.value.itemfood.price_discount_with_program ||
        action.payload.value.itemfood.price_discount ||
        action.payload.value.itemfood.price;
      var caculation = action.payload.caculation;
      var data =
        action.payload.type == TYPE_UPDATE_CART.CATEGORY
          ? state.data.category_food[action.payload.value.index].food[
              action.payload.value.indexitemfood
            ]
          : action.payload.type == TYPE_UPDATE_CART.PROGRAM
          ? state.data.program_store[action.payload.value.index].food[
              action.payload.value.indexitemfood
            ]
          : state.data.category_store_food[action.payload.value.index].food[
              action.payload.value.indexitemfood
            ];
      if (caculation == CALCULATION.ADD) {
        data.count_temp++;
        data.money_food = data.money_food + price;
      }
      if (caculation == CALCULATION.SUBTRACTION && data.count_temp > 0) {
        data.count_temp--;
        data.money_food = data.money_food - price;
      }
      data.total_temp = data.money_food + data.money_topping * data.count_temp;
      return {
        ...state,
      };
    }
    case UPDATE_QUANTITY: {
      var tempArr =
        action.payload.type === TYPE_UPDATE_CART.CATEGORY
          ? state.data.category_food
          : action.payload.type === TYPE_UPDATE_CART.PROGRAM
          ? state.data.program_store
          : action.payload.type === TYPE_UPDATE_CART.COMBO
          ? state.data.combo_food
          : state.data.category_store_food;

      if (action.payload.type === TYPE_UPDATE_CART.PROGRAM) {
        reactotron.log('reducesr', action.payload);
        action.payload.status == CALCULATION.ADD &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food++;
        action.payload.status == CALCULATION.SUBTRACTION &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food > 0 &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food--;
      }
      if (action.payload.type === TYPE_UPDATE_CART.CATEGORY) {
        action.payload.status == CALCULATION.ADD &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food++;
        action.payload.status == CALCULATION.SUBTRACTION &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food > 0 &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food--;
      }
      if (action.payload.type === TYPE_UPDATE_CART.CATEGORY_STORE_FOOD) {
        action.payload.status == CALCULATION.ADD &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food++;
        action.payload.status == CALCULATION.SUBTRACTION &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food > 0 &&
          tempArr[action.payload.index].food[action.payload.indexitemfood]
            .count_book_food--;
      }
      if (action.payload.type === TYPE_UPDATE_CART.COMBO) {
        action.payload.status == CALCULATION.ADD &&
          tempArr[action.payload.data.index].count_book_food++;
        action.payload.status == CALCULATION.SUBTRACTION &&
          tempArr[action.payload.data.index].count_book_food > 0 &&
          tempArr[action.payload.data.index].count_book_food--;
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}
const spShopDetailReducer = async (data, check, callback) => {
  var program_store = [...data];

  for (let index = 0; index < program_store.length; index++) {
    if (program_store[index].food.length > 0) {
      for (
        let index1 = 0;
        index1 < program_store[index].food.length;
        index1++
      ) {
        Object.assign(program_store[index].food[index1], {
          count_temp: 0,
          temp_arr_topping: [],
          total_temp: 0,
          temp_size: null,
          money_topping: 0,
          money_food: 0,
        });
        if (program_store[index].food[index1].size.length > 0) {
          program_store[index].food[index1].category_topping_food.splice(0, 0, {
            id: -1,
            name: 'Size',
            topping_food: [...program_store[index].food[index1].size],
          });
        }
      }
    }
  }
  callback(program_store);
};
export const switch6 = (type) =>
  type == TYPE_UPDATE_CART.CATEGORY
    ? 'category_food'
    : type == TYPE_UPDATE_CART.PROGRAM
    ? 'program_store'
    : type == TYPE_UPDATE_CART.CATEGORY_STORE_FOOD
    ? 'category_store_food'
    : 'combo_food';
