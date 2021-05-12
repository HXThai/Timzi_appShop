import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopDetailitem } from '../../component/ShopDetailitem';
import { CALCULATION, TYPE_UPDATE_CART } from '../../Constants/Constant'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/NotificationStyles';
import Color from '../../Theme/Color';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import * as actionsHome from '../../Redux/Action/homeAction';
import * as actionsEat from '../../Redux/Action/EatAtShop';
import { SafeAreaView } from 'react-native-safe-area-context';
import services from '../../Redux/Service/orderOfflineService';
import reactotron from 'reactotron-react-native';
import { useRef } from 'react'
const LoginScreen = (props) => {
  const { data, isLoading } = props.eatatshopState;
  reactotron.log(data)
  const timeOut = useRef('timeOut');
  useEffect(() => {
    getData(true)
  }, []);
  const getData = (isLoading) => {
    props.onGetStoreDetail({ params: null, id: props?.route?.params?.id, isLoading: isLoading });
  }
  const handleAddBookFood = async (payload, callback) => {
    try {
      const res = await services.orderFoodWithBookTable(payload)
      if (res.data.status == 1) {

      }
    } catch (error) {

    } finally {
      getData(false)
    }
  }
  if (isLoading) return <Text>dfsafsa</Text>

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{ width: '100%', height: '100%' }}>
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Chương trình */}
              <ShopDetailitem
                combo={false}
                data1={data?.program_store}
                isLabelPromotion
                onPressImage={(val) => {
                  // NavigationUtil.navigate(SCREEN_ROUTER_APP.IMAGE_VIEW, val.itemfood.image)
                }}
                onPress={(val) => {
                  // NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_DISH, {
                  //   params: {
                  //     id: val.itemfood.id,
                  //     props1: val,
                  //     type: TYPE_UPDATE_CART.PROGRAM,
                  //     itemfood: val.itemfood,
                  //     index: val.index,
                  //     indexitemfood: val.indexitemfood,
                  //     store_id: id
                  //   }
                  // })
                }}
                onPressAdd={({ itemfood, index, indexitemfood }) => {
                  reactotron.log("réafsda", itemfood, index, indexitemfood)
                  // if (itemfood.is_out_of_food == 1) {
                  //   console.log("da het hàng");

                  //   return
                  // }
                  if (itemfood.category_topping_food.length > 0) {
                    console.log("co topping");

                    // setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM, })
                    // fall.setValue(1)
                    // sheetTopping.current.snapTo(0)
                    // sheet.current.snapTo(1)
                    return
                  }
                  if (itemfood.book_food.length == 0) {
                    props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.ADD, data: itemfood, index, indexitemfood })
                    clearTimeout(timeOut.current)
                    timeOut.current = setTimeout(() => {
                      handleAddBookFood({
                        book_table_id: props?.route?.params?.id,
                        "food_id": itemfood.id,
                        "quantity": data.program_store[index].food[indexitemfood].count_book_food
                      }, null)
                    }, 500)
                    return
                  }
                  //   props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.ADD, data: itemfood,  index, indexitemfood })
                  //   clearTimeout(timeOut.current)
                  //   timeOut.current = setTimeout(() => {
                  //     // reactotron.log(value);
                  //     if (data.program_store[index].food[indexitemfood].count_book_food < 0) return
                  //     handleSubBookFood({
                  //       "book_food_id": itemfood.book_food[0].id,
                  //       "quantity": data.program_store[index].food[indexitemfood].count_book_food,
                  //     }, setTemp, () => { })
                  //   }, 500);
                  // }}
                }}
                onPressSubtract={({ itemfood, index, indexitemfood }) => {

                  // if (itemfood.card.length == 1) {
                  props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.SUBTRACTION, data: itemfood, index, indexitemfood, })
                  //   clearTimeout(timeOut.current)
                  //   timeOut.current = setTimeout(() => {
                  //     if (data.program_store[index].food[indexitemfood].count_card < 0) return
                  //     callApiSubCartFood({
                  //       "card_id": itemfood.card[0].id,
                  //       "quantity": data.program_store[index].food[indexitemfood].count_card,
                  //     }, setTemp, () => { })
                  //   }, 500);
                  //   return
                  // }
                  // if (itemfood.card.length > 1) {
                  //   console.log("vao ne 1");

                  //   fall.setValue(0.3)
                  //   sheetSub.current.snapTo(0)
                  //   // sheet.current.snapTo(1)
                  //   setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM })

                  // }
                  // return
                  // props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.SUBTRACTION, data: itemfood,  })
                  // clearTimeout(timeOut.current)
                  // timeOut.current = setTimeout(() => {
                  //   if (data.category_food[index].food[indexitemfood].count_card < 0) return
                  //   requestSubCartFood({
                  //     "card_id": data.category_food[index].food[indexitemfood].id,
                  //     "quantity": data.category_food[index].food[indexitemfood].count_card,
                  //   })
                  // }, 500);
                }}
              />
              {/* danh mục ăn */}
              <ShopDetailitem
                combo={false}
                data1={data?.category_food}

                onPressImage={(val) => {
                  // NavigationUtil.navigate(SCREEN_ROUTER_APP.IMAGE_VIEW, val.itemfood.image)
                }}
                onPress={(val) => {
                  // NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_DISH, {
                  //   params: {
                  //     id: val.itemfood.id,
                  //     props1: val,
                  //     type: TYPE_UPDATE_CART.PROGRAM,
                  //     itemfood: val.itemfood,
                  //     index: val.index,
                  //     indexitemfood: val.indexitemfood,
                  //     store_id: id
                  //   }
                  // })
                }}
                onPressAdd={({ itemfood, index, indexitemfood }) => {
                  reactotron.log("réafsda", itemfood, index, indexitemfood)
                  // if (itemfood.is_out_of_food == 1) {
                  //   console.log("da het hàng");

                  //   return
                  // }
                  if (itemfood.category_topping_food.length > 0) {
                    console.log("co topping");

                    // setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM, })
                    // fall.setValue(1)
                    // sheetTopping.current.snapTo(0)
                    // sheet.current.snapTo(1)
                    return
                  }
                  if (itemfood.book_food.length == 0) {
                    console.log("dsafdsad");

                    props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.ADD, data: itemfood, index, indexitemfood })
                    clearTimeout(timeOut.current)
                    timeOut.current = setTimeout(() => {
                      handleAddBookFood({
                        book_table_id: props?.route?.params?.id,
                        "food_id": itemfood.id,
                        "quantity": data.category_food[index].food[indexitemfood].count_book_food
                      }, null)
                    }, 500)
                    return
                  }
                  //   props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.ADD, data: itemfood,  index, indexitemfood })
                  //   clearTimeout(timeOut.current)
                  //   timeOut.current = setTimeout(() => {
                  //     // reactotron.log(value);
                  //     if (data.category_food[index].food[indexitemfood].count_book_food < 0) return
                  //     handleSubBookFood({

                  //       "book_food_id": itemfood.book_food[0].id,
                  //       "quantity": data.category_food[index].food[indexitemfood].count_book_food,
                  //     }, setTemp, () => { })
                  //   }, 500);
                  // }}
                  // onPressSubtract={({ itemfood, index, indexitemfood }) => {

                  //   if (itemfood.book_food.length == 1) {
                  //     props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.SUBTRACTION, data: itemfood,  index, indexitemfood })
                  //     clearTimeout(timeOut.current)
                  //     timeOut.current = setTimeout(() => {
                  //       if (data.category_food[index].food[indexitemfood].count_book_food < 0) return
                  //       handleSubBookFood({
                  //         "book_food_id": itemfood.book_food[0].id,
                  //         "quantity": data.category_food[index].food[indexitemfood].count_book_food,
                  //       }, setTemp, () => { })
                  //     }, 500);
                  //     return
                  //   }
                  //   if (itemfood.book_food.length > 1) {
                  //     console.log("vao ne 1");

                  //     fall.setValue(0.3)
                  //     sheetSub.current.snapTo(0)
                  //     sheet.current.snapTo(1)
                  //     setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM })

                  //   }
                  //   return
                  //   props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.SUBTRACTION, data: itemfood,  })
                  //   clearTimeout(timeOut.current)
                  //   timeOut.current = setTimeout(() => {
                  //     if (data.category_food[index].food[indexitemfood].count_book_food < 0) return
                  //     requestSubCartFood({
                  //       "card_id": data.category_food[index].food[indexitemfood].id,
                  //       "quantity": data.category_food[index].food[indexitemfood].count_book_food,
                  //     })
                  //   }, 500);
                }}
              />
              {/* Món ăn */}
              <ShopDetailitem
                combo={false}
                data1={data?.category_store_food}

                onPressImage={(val) => {
                  // NavigationUtil.navigate(SCREEN_ROUTER_APP.IMAGE_VIEW, val.itemfood.image)
                }}
                onPress={(val) => {
                  // NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_DISH, {
                  //   params: {
                  //     id: val.itemfood.id,
                  //     props1: val,
                  //     type: TYPE_UPDATE_CART.PROGRAM,
                  //     itemfood: val.itemfood,
                  //     index: val.index,
                  //     indexitemfood: val.indexitemfood,
                  //     store_id: id
                  //   }
                  // })
                }}
                onPressAdd={({ itemfood, index, indexitemfood }) => {
                  reactotron.log("réafsda", itemfood, index, indexitemfood)
                  // if (itemfood.is_out_of_food == 1) {
                  //   console.log("da het hàng");

                  //   return
                  // }
                  if (itemfood.category_topping_food.length > 0) {
                    console.log("co topping");

                    // setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM, })
                    // fall.setValue(1)
                    // sheetTopping.current.snapTo(0)
                    // sheet.current.snapTo(1)
                    return
                  }
                  if (itemfood.book_food.length == 0) {
                    console.log("dsafdsad");

                    props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY_STORE_FOOD, status: CALCULATION.ADD, data: itemfood, index, indexitemfood })
                    clearTimeout(timeOut.current)
                    timeOut.current = setTimeout(() => {
                      handleAddBookFood({
                        book_table_id: props?.route?.params?.id,
                        "food_id": itemfood.id,
                        "quantity": data.category_store_food[index].food[indexitemfood].count_book_food
                      }, null)
                    }, 500)
                    return
                  }
                  //   props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.ADD, data: itemfood, index, indexitemfood })
                  //   clearTimeout(timeOut.current)
                  //   timeOut.current = setTimeout(() => {
                  //     // reactotron.log(value);
                  //     if (data.category_store_food[index].food[indexitemfood].count_book_food < 0) return
                  //     handleSubBookFood({

                  //       "book_food_id": itemfood.book_food[0].id,
                  //       "quantity": data.category_store_food[index].food[indexitemfood].count_book_food,
                  //     }, setTemp, () => { })
                  //   }, 500);
                  // }}
                  // onPressSubtract={({ itemfood, index, indexitemfood }) => {

                  //   if (itemfood.book_food.length == 1) {
                  //     props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.SUBTRACTION, data: itemfood,  index, indexitemfood })
                  //     clearTimeout(timeOut.current)
                  //     timeOut.current = setTimeout(() => {
                  //       if (data.category_store_food[index].food[indexitemfood].count_book_food < 0) return
                  //       handleSubBookFood({
                  //         "book_food_id": itemfood.book_food[0].id,
                  //         "quantity": data.category_store_food[index].food[indexitemfood].count_book_food,
                  //       }, setTemp, () => { })
                  //     }, 500);
                  //     return
                  //   }
                  //   if (itemfood.book_food.length > 1) {
                  //     console.log("vao ne 1");

                  //     fall.setValue(0.3)
                  //     sheetSub.current.snapTo(0)
                  //     sheet.current.snapTo(1)
                  //     setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM })

                  //   }
                  //   return
                  //   props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.SUBTRACTION, data: itemfood, })
                  //   clearTimeout(timeOut.current)
                  //   timeOut.current = setTimeout(() => {
                  //     if (data.category_store_food[index].food[indexitemfood].count_book_food < 0) return
                  //     requestSubCartFood({
                  //       "card_id": data.category_store_food[index].food[indexitemfood].id,
                  //       "quantity": data.category_store_food[index].food[indexitemfood].count_book_food,
                  //     })
                  //   }, 500);
                }}
              />

            </ScrollView>

          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log("data : " ,state.homeReducer);
  return {
    eatatshopState: state.EatAtShopReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetStoreDetail: (params) => {
    dispatch(actionsHome.getStoreDetailWithBookTableInStore(params));
  },
  addTopping: (params) => {
    dispatch(actionsEat.addTopping(params));
  },
  updateQuantity: (params) => {
    dispatch(actionsEat.updateQuantity(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
