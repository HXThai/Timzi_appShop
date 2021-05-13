import React, { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  Animated,
  FlatList
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { formatNumber, ShopDetailitem } from '../../component/ShopDetailitem';
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
import BottomSheetBehavior from '../../component/FiteBottomSheet';
import { BottomSheetShop } from '../../component/BottomSheetShop';
import { DishItem } from '../../component/DishItem';
const dimension = Dimensions.get('window');
const { width, height } = dimension;
const LoginScreen = (props) => {
  const { data, isLoading } = props.eatatshopState;
  const sheetTopping = useRef<any>('sheetTopping');
  const [itemFocus, setItemFocus] = useState({})
  const fall = new Animated.Value(1);
  reactotron.log(data)
  const timeOut = useRef('timeOut');
  const backgroundColor = fall.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", '#2c2c2fAA',]
  })
  useEffect(() => {
    getData(true)
  }, []);
  useEffect(() => {
    reactotron.log("reducer-state", data)
  }, [data]);
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
  const handleSubBookFood = async (payload, callback) => {
    try {
      const res = await services.subtractQuantityFood(payload)
      if (res.data.status == 1) {

      }
    } catch (error) {

    } finally {
      getData(false)
    }
  }
  const onPressCloseTopping = (value) => {
    sheetTopping.current.snapTo(1)
    // sheet.current.snapTo(0)
    getData(false)
  }
  const handleComoboFood = async (payload) => {
    try {
      const res = await services.comboBookTable(payload)
      if (res.data.status == 1) {

      }
    } catch (error) {

    } finally {
      getData(false)
    }
  }
  const renderItem = ({ item, index }) => {
    const infoComboFood = { item, index }
    return (
      <View style={{ marginTop: 50 }}>
        <DishItem
          onPress={(val) => {
            console.log(item);

            // NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAIL_DISH, {
            //   params: {
            //     id: val.id,
            //     props1: { infoComboFood },
            //     type: TYPE_UPDATE_CART.COMBO,

            //     store_id: id
            //   }
            // })
          }}
          infoFood={item}
          combo={true}
          onPressImage={(val) => {
            // NavigationUtil.navigate(SCREEN_ROUTER_APP.IMAGE_VIEW, val.image)
          }}
          price_discount={formatNumber(item.price)}
          onPressAdd={(val) => {
            if (item.quantity == 0) {
              Alert.alert(
                'Thông báo',
                'Sản phẩm đã hết.',
                [
                  // {
                  //   text: 'Cancel',
                  //   onPress: () => {},
                  //   style: 'cancel',
                  // },
                  { text: 'Hủy', onPress: () => { } },

                ],
                { cancelable: false },
              )
              return
            }
            props.updateQuantity({ type: TYPE_UPDATE_CART.COMBO, status: CALCULATION.ADD, data: infoComboFood, })
            clearTimeout(timeOut.current)
            if (item.book_food.length > 0) {
              timeOut.current = setTimeout(() => {
                handleSubBookFood({
                  "book_food_id": item.book_food[0].id,
                  "quantity": item.count_book_food,
                }, () => { })
              }, 500)
              return
            }
            timeOut.current = setTimeout(() => {
              handleComoboFood({
                book_table_id: props?.route?.params?.id,
                "combo_food_id": item.id,
                "quantity": item.count_book_food,
              })
            }, 500)
          }
          }
          onPressSubtract={(val) => {

            reactotron.log("ne", item.book_food.length);
            if (item.book_food.length <= 0) return
            props.updateQuantity({ type: TYPE_UPDATE_CART.COMBO, status: CALCULATION.SUBTRACTION, data: infoComboFood, })


            clearTimeout(timeOut.current)
            if (item.book_food.length > 0) {
              timeOut.current = setTimeout(() => {
                handleSubBookFood({
                  "book_food_id": item.book_food[0].id,
                  "quantity": item.count_book_food,
                }, () => { })
              }, 500)
              return
            }
          }}
          // infoFood={infoComboFood}
          combo
          urlImage={item.image}
          nameFood={item.name}
          count={item.count_book_food}
        />
      </View>
    )
  }
  const ComBoList = () => {
    return (
      <View >
        <Text children='COMBO' style={{ marginHorizontal: 20, fontSize: 15, marginTop: 10 }} />
        <FlatList
          data={data.combo_food}
          horizontal
          renderItem={renderItem}
        />
      </View>

    )
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
              {ComBoList()}
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
                  // if (itemfood.is_out_of_food == 1) {
                  //   console.log("da het hàng");

                  //   return
                  // }
                  if (itemfood.category_topping_food.length > 0) {
                    console.log("co topping");

                    setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM, })
                    fall.setValue(1)
                    sheetTopping.current.snapTo(0)
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

                  props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.ADD, data: itemfood, index, indexitemfood })
                  clearTimeout(timeOut.current)
                  timeOut.current = setTimeout(() => {
                    // reactotron.log(value);
                    if (data.program_store[index].food[indexitemfood].count_book_food < 0) return
                    handleSubBookFood({
                      "book_food_id": itemfood.book_food[0].id,
                      "quantity": data.program_store[index].food[indexitemfood].count_book_food,
                    }, () => { })
                  }, 500);
                  // }}
                }}
                onPressSubtract={({ itemfood, index, indexitemfood }) => {

                  if (itemfood.book_food.length == 1) {
                    props.updateQuantity({ type: TYPE_UPDATE_CART.PROGRAM, status: CALCULATION.SUBTRACTION, data: itemfood, index, indexitemfood, })
                    clearTimeout(timeOut.current)
                    timeOut.current = setTimeout(() => {
                      if (data.program_store[index].food[indexitemfood].count_book_food < 0) return
                      handleSubBookFood({
                        "book_food_id": itemfood.book_food[0].id,
                        "quantity": data.program_store[index].food[indexitemfood].count_book_food,
                      }, () => { })
                    }, 500);
                    return
                  }
                  if (itemfood.book_food.length > 1) {
                    console.log("vao ne 1");
                    return
                    fall.setValue(0.3)
                    sheetSub.current.snapTo(0)
                    // sheet.current.snapTo(1)
                    setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.PROGRAM })

                  }
                  return
                  props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.SUBTRACTION, data: itemfood, })
                  clearTimeout(timeOut.current)
                  timeOut.current = setTimeout(() => {
                    if (data.category_food[index].food[indexitemfood].count_book_food < 0) return
                    requestSubCartFood({
                      "card_id": data.category_food[index].food[indexitemfood].id,
                      "quantity": data.category_food[index].food[indexitemfood].count_book_food,
                    })
                  }, 500);
                }}
              />
              {/* danh mục ăn */}
              <ShopDetailitem
                combo={false}
                data1={data?.category_food}

                onPressImage={(val) => {
                  // NavigationUtil.navigate(SCREEN_ROUTER_APP.IMAGE_VIEW, val.itemfood.image)
                }}
                onPressSubtract={({ itemfood, index, indexitemfood }) => {

                  if (itemfood.book_food.length == 1) {
                    props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.SUBTRACTION, data: itemfood, index, indexitemfood })
                    clearTimeout(timeOut.current)
                    timeOut.current = setTimeout(() => {
                      if (data.category_food[index].food[indexitemfood].count_book_food < 0) return
                      handleSubBookFood({
                        "book_food_id": itemfood.book_food[0].id,
                        "quantity": data.category_food[index].food[indexitemfood].count_book_food,
                      }, () => { })
                    }, 500);
                    return
                  }
                  if (itemfood.book_food.length > 1) {
                    return
                    fall.setValue(0.3)
                    sheetSub.current.snapTo(0)
                    sheet.current.snapTo(1)
                    setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.CATEGORY })

                  }
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

                    setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.CATEGORY, })
                    fall.setValue(1)
                    sheetTopping.current.snapTo(0)
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
                  props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.ADD, data: itemfood, index, indexitemfood })
                  clearTimeout(timeOut.current)
                  timeOut.current = setTimeout(() => {
                    // reactotron.log(value);
                    if (data.category_food[index].food[indexitemfood].count_book_food < 0) return
                    handleSubBookFood({
                      "book_food_id": itemfood.book_food[0].id,
                      "quantity": data.category_food[index].food[indexitemfood].count_book_food,
                    }, () => { })
                  }, 500);
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

                    setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.CATEGORY_STORE_FOOD, })
                    fall.setValue(1)
                    sheetTopping.current.snapTo(0)
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
                  props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY_STORE_FOOD, status: CALCULATION.ADD, data: itemfood, index, indexitemfood })
                  clearTimeout(timeOut.current)
                  timeOut.current = setTimeout(() => {
                    // reactotron.log(value);
                    if (data.category_store_food[index].food[indexitemfood].count_book_food < 0) return
                    handleSubBookFood({
                      "book_food_id": itemfood.book_food[0].id,
                      "quantity": data.category_store_food[index].food[indexitemfood].count_book_food,
                    }, () => { })
                  }, 500);
                }}
                onPressSubtract={({ itemfood, index, indexitemfood }) => {

                  if (itemfood.book_food.length == 1) {
                    props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY_STORE_FOOD, status: CALCULATION.SUBTRACTION, data: itemfood, index, indexitemfood })
                    clearTimeout(timeOut.current)
                    timeOut.current = setTimeout(() => {
                      if (data.category_store_food[index].food[indexitemfood].count_book_food < 0) return
                      reactotron.log("VAO DAY NE")
                      handleSubBookFood({
                        "book_food_id": itemfood.book_food[0].id,
                        "quantity": data.category_store_food[index].food[indexitemfood].count_book_food,
                      }, () => { })
                    }, 500);
                    return
                  }
                  if (itemfood.book_food.length > 1) {
                    console.log("SO LUONG THỨC ĂN LỚN HƠN 2");

                    return
                    fall.setValue(0.3)
                    sheetSub.current.snapTo(0)
                    sheet.current.snapTo(1)
                    setItemFocus({ itemfood, index, indexitemfood, type: TYPE_UPDATE_CART.CATEGORY_STORE_FOOD })

                  }
                  return
                  props.updateQuantity({ type: TYPE_UPDATE_CART.CATEGORY, status: CALCULATION.SUBTRACTION, data: itemfood })
                  clearTimeout(timeOut.current)
                  timeOut.current = setTimeout(() => {
                    if (data.category_food[index].food[indexitemfood].count_book_food < 0) return
                    requestSubCartFood({
                      "card_id": data.category_food[index].food[indexitemfood].id,
                      "quantity": data.category_food[index].food[indexitemfood].count_book_food,
                    })
                  }, 500);
                }}
              />

            </ScrollView>
            <BottomSheetBehavior
              ref={sheetTopping}
              snapPoints={[height, -100]}
              initialSnap={1}
              enabledGestureInteraction={false}
              // callbackNode={fall}
              renderContent={() => (
                <BottomSheetShop
                  onPressClose={onPressCloseTopping}
                  onPressAdd={(value) => {
                    props.updateTempCount({
                      type: value.type,
                      caculation: CALCULATION.ADD,
                      value: value,
                    })
                  }}
                  // onPressClose
                  onPressSub={(value) => {
                    // if (value.type == TYPE_ADD_TOPPING.CATEGORY) {
                    // reactotron.log("ne")
                    props.updateTempCount({
                      type: value.type,
                      caculation: CALCULATION.SUBTRACTION,
                      value: value,
                    })
                    // }
                  }}
                  infoDish={itemFocus}
                  backgroundColor={backgroundColor}
                  // onPressClose={(data) => {
                  //   fall.setValue(0);
                  //   sheetTopping.current.snapTo(1)
                  // }}
                  // onPressClose={onPressCloseTopping}
                  OnPressTopping={(data) => {
                    // reactotron.log(data.itemTopping.id)
                    // reactotron.log(data.itemTopping.id)
                    // if (data.type == TYPE_UPDATE_CART.CATEGORY) {
                    data.itemTopping.id == -1 && props.updateSize({ type: data.type, data, })
                    data.itemTopping.id != -1 && props.addTopping({ type: data.type, data, })
                    return
                    // }

                  }}
                  OnPressFinal={(value) => {
                    if (value.itemfood.count_temp == 0) {
                      Alert.alert(
                        'Thông báo',
                        'vui lòng chọn số lượng',
                        [
                          // {
                          //   text: 'Cancel',
                          //   onPress: () => {},
                          //   style: 'cancel',
                          // },
                          { text: 'Hủy', onPress: () => { } },

                        ],
                        { cancelable: false },
                      )
                      return
                    }
                    if (value.itemfood.size.length > 0 && value.itemfood.temp_size == null) {
                      Alert.alert(
                        'Thông báo',
                        'vui lòng chọn size',
                        [
                          // {
                          //   text: 'Cancel',
                          //   onPress: () => {},
                          //   style: 'cancel',
                          // },
                          { text: 'Hủy', onPress: () => { } },

                        ],
                        { cancelable: false },
                      )
                      return
                    }
                    handleAddBookFood({
                      book_table_id: props?.route?.params?.id,
                      food_id: value.itemfood.id,
                      quantity: value.itemfood.count_temp,
                      topping_food_id: value.itemfood.temp_arr_topping,
                      size_id: value.itemfood.temp_size
                    }, () => {
                      sheetTopping.current.snapTo(1)
                      // sheet.current.snapTo(0)
                    })

                  }}
                />
              )}
            />
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
  updateSize: (params) => {
    dispatch(actionsEat.updateSize(params));
  },
  updateTempCount: (params) => {
    dispatch(actionsEat.updateTempCount(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
