import React, {useEffect, useState} from 'react';
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

const LoginScreen = (props) => {
  const [dataOrder, setDataOrder] = useState([
    {
      minute: 30,
      name: 'Trần Văn Tét',
      code: 'TZ001 - 12122021',
      distance: 2.5,
      number: 6,
      left: 5,
    },
  ]);

  const [dataMenu, setDataMenu] = useState([
    {
      title: 'Phở bò Hà Nội',
      foodCore: 'Phở bò tái',
      numberFoodCore: 1,
      option1: 'Bò thêm',
      numberOption1: 1,
      option2: 'Rau thêm',
      numberOption2: 1,
      priceFoodCore: 30000,
      priceOption1: 5000,
      priceOption2: 5000,
      discount: 5000,
    },
    {
      title: 'Phở bò Hà Nội',
      foodCore: 'Phở bò tái',
      numberFoodCore: 1,
      option1: 'Bò thêm',
      numberOption1: 1,
      option2: 'Rau thêm',
      numberOption2: 1,
      priceFoodCore: 30000,
      priceOption1: 5000,
      priceOption2: 5000,
      discount: 5000,
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{}}>
                {dataOrder.map((item, index) => {
                  return (
                    <View
                      key={index}
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
                            height: 19,
                            width: 56,
                            borderRadius: 6,
                            borderColor: Color.main,
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{color: Color.main, fontSize: 12}}>
                            {item.minute}
                            {' phút'}
                          </Text>
                        </View>
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
                              {item.name}
                            </Text>
                          </View>
                          <View>
                            <Text style={{fontSize: 12, color: '#828282'}}>
                              {'Khoảng cách '}
                              {item.distance}
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
                              {item.code}
                            </Text>
                          </View>
                          <View>
                            <Text style={{fontSize: 12, color: '#828282'}}>
                              {'Nhận từ khách: '}
                              {item.number}
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
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Image
                              source={Images.iconBike}
                              style={{height: 10, width: 15}}
                            />
                            <Text
                              style={{
                                fontWeight: '600',
                                fontSize: 13,
                                marginLeft: 5,
                              }}>
                              {'Còn lại: '}
                              {item.left}
                              {' phút'}
                            </Text>
                          </View>
                          {/* <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate(
                                'OrderOnlineDetailScreen',
                              );
                            }}
                            style={{
                              height: 19,
                              width: 56,
                              borderRadius: 6,
                              borderColor: Color.main,
                              borderWidth: 1,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{color: Color.main, fontSize: 12}}>
                              Chi tiết
                            </Text>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              {dataMenu.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 10,
                      backgroundColor: '#fff',
                      marginTop: 20,
                      borderRadius: 8,
                      flexDirection: 'column',
                      justifyContent: 'space-around',
                      height: 166,
                    }}>
                    <Text style={{fontSize: 12, fontWeight: '600'}}>
                      {item.title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '50%',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{}}>
                          <Text style={{fontWeight: '400', fontSize: 12}}>
                            {item.foodCore}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 12, fontWeight: '400'}}>
                            x {item.numberFoodCore}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{fontWeight: '400', fontSize: 12}}>
                          {styles.dynamicSort(item.priceFoodCore)} đ
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '50%',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{}}>
                          <Text style={{fontWeight: '400', fontSize: 12}}>
                            {item.option1}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 12, fontWeight: '400'}}>
                            x {item.numberOption1}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{fontWeight: '400', fontSize: 12}}>
                          {styles.dynamicSort(item.priceOption1)} đ
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: '50%',
                          justifyContent: 'space-between',
                        }}>
                        <View style={{}}>
                          <Text style={{fontWeight: '400', fontSize: 12}}>
                            {item.option2}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 12, fontWeight: '400'}}>
                            x {item.numberOption2}
                          </Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{fontWeight: '400', fontSize: 12}}>
                          {styles.dynamicSort(item.priceOption2)} đ
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
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
                          {styles.dynamicSort(item.discount)} đ
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
                          {styles.dynamicSort(
                            item.priceFoodCore +
                              item.priceOption1 * item.numberOption1 +
                              item.priceOption2 * item.numberOption2 -
                              item.discount,
                          )}{' '}
                          đ
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  // props.navigation.reset();
                  props.navigation.navigate('Home', {tab: 2});
                  // props.navigation.reset({
                  //   index: 0,
                  //   routes: [{name: 'Home'}],
                  // });
                }}
                style={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: Color.main,
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                  Đã lấy hàng
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
