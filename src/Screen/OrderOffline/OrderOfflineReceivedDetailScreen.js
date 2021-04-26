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
import services from '../../Redux/Service/orderOfflineService';

const LoginScreen = (props) => {
  const [dataMenu, setDataMenu] = useState([
    {
      title: 'Trần Văn Tét',
      foodCore: 'Thời gian đặt',
      option1: 'Số lần đặt',
      option2: 'Thời gian phục vụ',
      priceFoodCore: '08:00, 12/12/2021',
      priceOption1: 3,
      priceOption2: '18:00 thứ 7 ngày 12/12/2021',
      discount: 'Không có',
    },
  ]);

  const [dataFood, setDataFood] = useState([
    {
      title: 'Trần Văn Tét',
      foodCore: 'Ngan sào',
      option1: 'Vịt hấp',
      option2: 'Bò tái',
      priceFoodCore: 1,
      priceOption1: 1,
      priceOption2: 1,
      discount: 1,
      price: 30000,
    },
  ]);

  const [dataNewOrder, setDataNewOrder] = useState({
    status: 'Chờ xử lý',
    name: 'Bàn số 1',
    code: 'TZ001 - 12122021',
    location: 'Tầng 1',
    service: 'Tất cả',
    numberCustommer: '2 - 8',
    numberTable: 1,
  });

  const [dataOrderOffline, setDataOrderOffline] = useState([]);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  useEffect(() => {
    setModalVisibleLoading(true);
    services
      .orderOfflineDetail(null, props?.route?.params?.id)
      .then(function (response) {
        if (response) {
          if (response.data.code === 200) {
            setDataOrderOffline(response.data.data);
            // setDataOrder(response.data.data);
            // setDataMenu(response.data.data.order_food_detail);
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
                <View style={{marginTop: 5}}>
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
                          height: 19,
                          width: 56,
                          borderRadius: 6,
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            color: Color.main,
                            fontSize: 10,
                          }}>
                          Đã nhận
                        </Text>
                      </View>
                      <View
                        style={{
                          height: 56,
                          width: 56,
                          borderRadius: 6,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Image
                          source={Images.iconOrderOfflineGreen}
                          style={{height: 44, width: 44}}
                        />
                        <View style={{position: 'absolute'}}>
                          <Text style={{color: '#fff'}}>
                            {dataOrderOffline?.table_store?.number_table}
                          </Text>
                        </View>
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
                              fontWeight: '700',
                              fontSize: 13,
                              marginLeft: 5,
                            }}>
                            Bàn số {dataOrderOffline?.table_store?.number_table}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 12, color: '#828282'}}>
                            Vị trí:{' '}
                            {dataOrderOffline?.table_store?.number_floor}
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
                            {dataOrderOffline?.code}
                          </Text>
                        </View>
                        <View>
                          <Text style={{fontSize: 12, color: '#828282'}}>
                            Dịch vụ:
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
                            style={{height: 10, width: 10}}
                          />
                          <Text
                            style={{
                              fontWeight: '600',
                              fontSize: 13,
                              marginLeft: 5,
                            }}>
                            Số khách: {dataOrderOffline?.number_people}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}></View>
                      </View>
                    </View>
                  </View>
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
                        height: 146,
                      }}>
                      <Text style={{fontSize: 12, fontWeight: '700'}}>
                        Khách hàng: {dataOrderOffline?.user?.name}
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
                        </View>
                        <View>
                          <Text style={{fontWeight: '400', fontSize: 12}}>
                            {dataOrderOffline?.time_booking}
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
                        </View>
                        <View>
                          <Text style={{fontWeight: '400', fontSize: 12}}>
                            {dataOrderOffline?.phone}
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
                            Nội dung đặt
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontWeight: '600',
                              fontSize: 12,
                              color: 'black',
                              // color: Color.main,
                            }}>
                            {dataOrderOffline?.note}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
              <TouchableOpacity
                style={{
                  height: 45,
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: Color.white,
                  marginTop: 10,
                  borderRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginBottom: 10,
                  backgroundColor: Color.main,
                }}>
                <Text style={{fontSize: 15, color: 'white'}}>Xác nhận</Text>
              </TouchableOpacity>
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
