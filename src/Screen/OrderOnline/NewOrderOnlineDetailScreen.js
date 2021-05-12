import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/NotificationStyles';
import Color from '../../Theme/Color';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import services from '../../Redux/Service/orderOnlineService';

const LoginScreen = (props) => {
  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [dataOrder, setDataOrder] = useState({});

  const [dataMenu, setDataMenu] = useState([]);

  useEffect(() => {
    setModalVisibleLoading(true);
    services
      .orderOnlineDetail(null, props?.route?.params?.id)
      .then(function (response) {
        if (response) {
          if (response.data.code === 200) {
            setDataOrder(response.data.data);
            setDataMenu(response.data.data.order_food_detail);
            setModalVisibleLoading(false);
          }
        } else {
          return;
        }
      });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          {modalVisibleLoading === true ? (
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                position: 'absolute',
                // backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color={Color.main} />
            </View>
          ) : null}
          {modalVisibleLoading === false ? (
            <View
              style={{
                padding: 10,
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{}}>
                  <View
                    style={{
                      height: 100,
                      backgroundColor: '#fff',
                      borderRadius: 8,
                      // marginTop: 10,
                      flexDirection: 'row',
                      padding: 8,
                    }}>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                      }}>
                      <View
                        style={{
                          height: 56,
                          width: 56,
                          borderRadius: 6,
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={Images.iconPrint}
                          style={{height: 32, width: 32}}
                        />
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-around',
                        height: 100,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginLeft: 10,
                          width: Dimensions.get('window').width - 100,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={Images.iconPersonal}
                            style={{height: 10, width: 10}}
                          />
                          <Text
                            style={{
                              fontWeight: '600',
                              fontSize: 13,
                              marginLeft: 5,
                            }}>
                            {dataOrder?.user_name}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 12, color: '#828282'}}>
                            {'Khoảng cách: '}
                            {dataOrder?.distance?.text}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginLeft: 10,
                          width: Dimensions.get('window').width - 100,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={Images.iconPersonal}
                            style={{height: 10, width: 10, opacity: 0}}
                          />
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 12,
                              marginLeft: 5,
                            }}>
                            {dataOrder?.code}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 12, color: '#828282'}}>
                            {'Nhận từ khách: '}
                            {dataOrder?.quantity}
                            {' món'}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginLeft: 10,
                          width: Dimensions.get('window').width - 100,
                        }}></View>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#fff',
                    marginTop: 20,
                    borderRadius: 8,
                    flexDirection: 'column',
                    // justifyContent: 'space-around',
                    // height: 166,
                  }}>
                  {dataMenu.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          // padding: 10,
                          backgroundColor: '#fff',
                          marginBottom: 10,
                          borderRadius: 8,
                          flexDirection: 'column',
                          justifyContent: 'space-around',
                          // height: 130,
                          borderBottomWidth: 0.3,
                          borderBottomColor: 'grey',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginBottom: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: '50%',
                              justifyContent: 'space-between',
                            }}>
                            <View style={{}}>
                              <Text style={{fontWeight: '700', fontSize: 12}}>
                                {item.food === null
                                  ? item?.combo_food?.name
                                  : item?.food?.name}
                              </Text>
                            </View>
                            <View>
                              <Text style={{fontSize: 12, fontWeight: '400'}}>
                                x {item?.quantity}
                              </Text>
                            </View>
                          </View>
                          <View>
                            <Text style={{fontWeight: '400', fontSize: 12}}>
                              {styles.dynamicSort(item.price)} đ
                            </Text>
                          </View>
                        </View>
                        {item?.order_topping_food_detail?.map((item, index) => {
                          return (
                            <View
                              key={index}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginBottom: 10,
                              }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  width: '50%',
                                  justifyContent: 'space-between',
                                }}>
                                <View style={{}}>
                                  <Text
                                    style={{fontWeight: '400', fontSize: 12}}>
                                    {item.category_topping_food_name}
                                  </Text>
                                </View>
                                <View>
                                  <Text
                                    style={{fontSize: 12, fontWeight: '400'}}>
                                    {item.topping_food_name}
                                  </Text>
                                </View>
                              </View>
                              <View>
                                <Text style={{fontWeight: '400', fontSize: 12}}>
                                  {styles.dynamicSort(item.price)} đ
                                </Text>
                              </View>
                            </View>
                          );
                        })}
                      </View>
                    );
                  })}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 10,
                    }}>
                    <View>
                      <Text style={{fontSize: 12, fontWeight: '400'}}>
                        Giảm giá
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 12,
                          color: Color.main,
                        }}>
                        {'- '}
                        {styles.dynamicSort(dataOrder.discount)} đ
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View>
                      <Text style={{fontSize: 12, fontWeight: '700'}}>
                        Nhận từ tài xế
                      </Text>
                    </View>
                    <View>
                      <Text
                        style={{
                          fontWeight: '700',
                          fontSize: 12,
                          color: Color.main,
                        }}>
                        {styles.dynamicSort(dataOrder.total_money)} đ
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Hủy đơn hàng',
                      'Bạn chắc chắn muốn hủy đơn hàng?',
                      [
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .cancelOrderOnline(null, props?.route?.params?.id)
                              .then(function (response) {
                                if (response) {
                                  if (response.data.code === 200) {
                                    props.navigation.navigate('Home', {tab: 4});
                                  } else {
                                    Alert.alert(
                                      'Thông báo',
                                      response.data.message,
                                      [
                                        {
                                          text: 'Đồng ý',
                                        },
                                      ],
                                      {cancelable: false},
                                    );
                                  }
                                } else {
                                  return;
                                }
                              });
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
                  style={{
                    height: 50,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: Color.buttonColor,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 15}}>Từ chối</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Xác nhận đơn hàng',
                      'Bạn chắc chắn muốn xác nhận đơn hàng?',
                      [
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .confirmOrderOnline(
                                null,
                                props?.route?.params?.id,
                              )
                              .then(function (response) {
                                if (response) {
                                  if (response.data.code === 200) {
                                    props.navigation.navigate('Home', {tab: 1});
                                  } else {
                                    Alert.alert(
                                      'Thông báo',
                                      response.data.message,
                                      [
                                        {
                                          text: 'Đồng ý',
                                        },
                                      ],
                                      {cancelable: false},
                                    );
                                  }
                                } else {
                                  return;
                                }
                              });
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
                  style={{
                    height: 50,
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 50,
                    backgroundColor: Color.main,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </ImageBackground>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log("data : " ,state.homeReducer);
  return {
    data: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (params) => {
    dispatch(actionsLogin.login(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
