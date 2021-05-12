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
import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';
import reactotron from 'reactotron-react-native';

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

  const [dataOrderOffline, setDataOrderOffline] = useState([]);

  const [store, setStore] = useState('');

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('dataStore').then((data) => {
      if (data) {
        // reactotron.log(data);
        setStore(data);
      }
    });
    services
      .orderOfflineDetail(null, props?.route?.params?.id)
      .then(function (response) {
        if (response) {
          if (response.data.code === 200) {
            setDataOrderOffline(response.data.data);
            setModalVisibleLoading(false);
          }
        } else {
          return;
        }
      });
  }, []);

  function nonAccentVietnamese(str) {
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'i');
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
    str = str.replace(/Đ/g, 'D');

    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    // Some system encode vietnamese combining accent as individual utf-8 characters
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // Huyền sắc hỏi ngã nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
    return str;
  }

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + '/' + month + '/' + year; //format: dd-mm-yyyy;
  };

  const getCurrenTime = () => {
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return hours + ':' + min + ':' + sec; //format: dd-mm-yyyy;
  };

  const printBillTest = () => {
    var dataPrint =
      '<R>Timzi.vn</R>\n\n<C><D>' +
      store.name +
      '</D></C>\n<C>' +
      store.address +
      '</C>\n\n<C><B>Hoa don ban hang</B></C>\n\n\n<L>Ngay: </L>\t<L>' +
      getCurrentDate() +
      '</L>\t\t\t<L>So: 1243</L>\n\n<L>Nhan vien xuat: </L>\t<L>' +
      'Chu shop</L>\n\n<L>In luc: </L>\t<L>' +
      getCurrenTime() +
      '</L>\n<C>-------------------------------------------</C>' +
      '\n<L>Ten khach hang: </L>\t<L>' +
      dataOrderOffline?.name +
      '</L>\n\n<L>So dien thoai: </L>\t<L>' +
      dataOrderOffline?.phone +
      '</L>\n\n<L>So ban: </L>\t<L>' +
      dataOrderOffline?.table_store?.number_table +
      '</L>\t\t\t<L>So khach: </L><L>' +
      dataOrderOffline?.number_people +
      '</L>\n<C>------------------------------------------</C>';

    dataOrderOffline?.book_food?.forEach((element, index) => {
      if (element?.food === null) {
        dataPrint +=
          '\n\n<L>' +
          element?.combo_food?.name +
          '</L>\t<L>\tx' +
          element?.quantity +
          '</L>\t<L>' +
          element?.price +
          '</L>';
      } else {
        dataPrint +=
          '\n\n<L>' +
          element?.food?.name +
          '</L>\t<L>\tx' +
          element?.quantity +
          '</L>\t<L>' +
          element?.price +
          '</L>';
      }
    });
    dataPrint +=
      '\n<C>-------------------------------------------</C>\n\n<D>Thanh tien: </D><L>' +
      dataOrderOffline?.total_money +
      ' d</L>\n\n\n<C>     ***CAM ON QUY KHACH VA HEN GAP LAI***</C>' +
      '<L>\n  Hotline: </L><L>' +
      store.hotline +
      '</L><L>   Website: Timzi.vn</L>' +
      '<C>\n\n\n\n\n.</C>';
    var newData = nonAccentVietnamese(dataPrint);
    // console.log(newData);
    // var name = 'Hoang Xuan Thai';
    // var dataPrint =
    //   '<C><B>Hoa don ban hang</B></C>\n\n<L>Ten khach hang: </L> \t<L>' +
    //   name +
    //   '</L>';
    NetPrinter.printBill(newData);
    // NetPrinter.printBill('\x1D\x56\x01');
    NetPrinter.printBill('\x00');
  };

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
                          Đang pv
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
                            Vị trí: Tầng{' '}
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
                          <Text style={{fontSize: 12, color: '#828282'}}></Text>
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
                <View
                  style={{
                    padding: 10,
                    backgroundColor: '#fff',
                    marginTop: 20,
                    borderRadius: 8,
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    // height: 166,
                  }}>
                  <Text style={{fontSize: 12, fontWeight: '700'}}>
                    Danh sách món ăn
                  </Text>
                  {dataOrderOffline?.book_food?.map((item, index) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          margin: 5,
                        }}>
                        <View
                          style={{
                            width: Dimensions.get('window').width * 0.35,
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontWeight: '400', fontSize: 12}}>
                            {item?.food === null
                              ? item?.combo_food?.name
                              : item?.food?.name}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: Dimensions.get('window').width * 0.1,
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: 'black',
                            }}>
                            x {item.quantity}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            {
                              item.status === 2
                                ? Alert.alert(
                                    'Xác nhận món ăn',
                                    'Bạn chắc chắn muốn xác nhận món ăn đã lên bàn?',
                                    [
                                      {text: 'Hủy', onPress: () => {}},
                                      {
                                        text: 'Đồng ý',
                                        onPress: async () => {
                                          services
                                            .confirmFoodOnTheTable(
                                              null,
                                              item.id,
                                            )
                                            .then(function (response) {
                                              if (response) {
                                                if (
                                                  response.data.code === 200
                                                ) {
                                                  services
                                                    .orderOfflineDetail(
                                                      null,
                                                      props?.route?.params?.id,
                                                    )
                                                    .then(function (response) {
                                                      if (response) {
                                                        if (
                                                          response.data.code ===
                                                          200
                                                        ) {
                                                          setDataOrderOffline(
                                                            response.data.data,
                                                          );
                                                        }
                                                      } else {
                                                        return;
                                                      }
                                                    });
                                                }
                                              } else {
                                                return;
                                              }
                                            });
                                        },
                                      },
                                    ],
                                    {cancelable: false},
                                  )
                                : null;
                            }
                          }}
                          style={{
                            height: 20,
                            width: 80,
                            borderRadius: 4,
                            borderWidth: 1,
                            borderColor: Color.main,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: Dimensions.get('window').width * 0.2,
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 11, color: Color.main}}>
                            {item.status === 1
                              ? 'Chờ gọi món'
                              : item.status === 2
                              ? 'Chờ lên bàn'
                              : 'Đã lên bàn'}
                          </Text>
                        </TouchableOpacity>
                        <View
                          style={{
                            width: Dimensions.get('window').width * 0.2,
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 12,
                              color: 'black',
                            }}>
                            {styles.dynamicSort(item.price)} đ
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
              <View
                style={{
                  height: 80,
                  width: '100%',
                  alignItems: 'center',
                  // justifyContent: 'center',
                  // borderRadius: 50,
                  backgroundColor: Color.white,
                  marginTop: 10,
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    source={Images.iconOrderOfflineYellow}
                    style={{height: 57, width: 57, marginLeft: 10}}
                  />
                  <Text
                    style={{fontSize: 17, fontWeight: '700', marginLeft: 10}}>
                    {styles.dynamicSort(dataOrderOffline?.total_money)} đ
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    printBillTest();
                    props.navigation.navigate('Utilities', {tab: 4});
                  }}
                  style={{
                    height: 44,
                    width: 104,
                    borderRadius: 6,
                    backgroundColor: Color.buttonColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 15}}>
                    Thanh toán
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
