import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  TouchableOpacity,
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
import {ScrollView} from 'react-native-gesture-handler';
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
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const [totalMoneyWithStaffLocal, setTotalMoneyWithStaffLocal] = useState(0);

  const [modalVisibleReturn, setModalVisibleReturn] = useState(false);

  const [quantityReturn, setQuantityReturn] = useState('');

  const [idFoodReturn, setIdFoodReturn] = useState('');

  const [moneyReturn, setMoneyReturn] = useState('');

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
            var oldMoney = 0;
            response.data.data.book_food?.forEach((element) => {
              if (element.status === 3) {
                oldMoney += element.price;
              }
            });
            setTotalMoneyWithStaffLocal(oldMoney);
            setModalVisibleLoading(false);
          }
        } else {
          return;
        }
      });

    // return () => {
    //   console.log('thai test');
    //   AsyncStorage.removeItem('isConnect');
    // };
  }, []);

  const handleReturnFood = () => {
    // console.log(idFoodReturn);
    Alert.alert(
      'Hoàn trả món ăn',
      'Bạn chắc chắn muốn hoàn trả món ăn?',
      [
        {text: 'Hủy', onPress: () => {}},
        {
          text: 'Đồng ý',
          onPress: async () => {
            // var moneyOld = totalMoneyWithStaffLocal;
            // moneyOld -= moneyReturn;
            // setTotalMoneyWithStaffLocal(moneyOld);
            var body = {
              book_food_id: idFoodReturn,
              quantity: quantityReturn,
            };
            // console.log(body);
            services.returnBookFood(body).then(function (response) {
              if (response) {
                if (response.data.code === 200) {
                  services
                    .orderOfflineDetail(null, props?.route?.params?.id)
                    .then(function (response) {
                      if (response) {
                        if (response.data.code === 200) {
                          setDataOrderOffline(response.data.data);
                          var oldMoney = 0;
                          response.data.data.book_food?.forEach((element) => {
                            if (element.status === 3) {
                              oldMoney += element.price;
                            }
                          });
                          setTotalMoneyWithStaffLocal(oldMoney);
                          setModalVisibleReturn(false);
                        }
                      } else {
                        return;
                      }
                    });
                } else {
                  Alert.alert(
                    'Thông báo!',
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
  };

  const staffPayment = () => {
    var totalPriceBill = 0;
    dataOrderOffline.book_food.forEach((element) => {
      if (element.status === 3) {
        totalPriceBill += element.price;
      }
    });
    // console.log(totalPriceBill);
    var body = {
      book_table_id: props?.route?.params?.id,
      total_money: totalPriceBill,
      payment_method_id: '2',
    };
    services.confirmPaymentBookfoodWithStaff(body).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          props.navigation.reset({
            routes: [
              {
                name: 'Utilities',
              },
            ],
          });
          props.navigation.navigate('Utilities');
        } else {
          Alert.alert(
            'Thông báo',
            response.data.message,
            [{text: 'Đồng ý', onPress: () => {}}],
            {cancelable: false},
          );
        }
      } else {
        Alert.alert(
          'Thông báo',
          'Lỗi hệ thống!',
          [{text: 'Đồng ý', onPress: () => {}}],
          {cancelable: false},
        );
        return;
      }
    });
  };

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
      store?.name +
      '</D></C>\n<C>' +
      store?.address +
      '</C>\n\n<C><B>Hoá đơn bán hàng</B></C>\n\n\n<L>Ngay: </L>\t<L>' +
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
      '</L>\t\t' +
      ' ' +
      '<L>So khach: </L><L>' +
      dataOrderOffline?.number_people +
      '</L>\n<C>------------------------------------------</C>';

    dataOrderOffline?.book_food?.forEach((element, index) => {
      if (element?.food === null) {
        dataPrint +=
          '\n\n<L>' +
          element?.combo_food?.name +
          '</L>\t\t<L>\tx' +
          element?.quantity +
          '</L>\t<L>' +
          styles.dynamicSort(parseFloat(element?.price)) +
          ' vnd</L>';
      } else {
        dataPrint +=
          '\n\n<L>' +
          element?.food?.name +
          '</L>\t<L>\tx' +
          element?.quantity +
          '</L>\t<L>' +
          styles.dynamicSort(parseFloat(element?.price)) +
          ' vnd</L>';
      }
    });
    dataPrint +=
      '\n<C>-------------------------------------------</C>\n\n<D>Thanh tien: </D><L>' +
      totalMoneyWithStaffLocal +
      ' vnd</L>\n\n\n<C>     ***CAM ON QUY KHACH VA HEN GAP LAI***</C>' +
      '<L>\n  Hotline: </L><L>' +
      store?.hotline +
      '</L><L>   Website: Timzi.vn</L>' +
      '<C>\n\n.</C>';

    // -----------------
    var newData = nonAccentVietnamese(dataPrint);
    // console.log(newData);
    // var name = 'Hoang Xuan Thai';
    // var dataPrint =
    //   '<C><B>Hoa don ban hang</B></C>\n\n<L>Ten khach hang: </L> \t<L>' +
    //   name +
    //   '</L>';
    //------------------

    // var dataPrint = '<C>Con mèo ngu ngốc</C>';

    // NetPrinter.printBill(dataPrint);
    // NetPrinter.printBill('\x1D\x56\x01');

    // const newData = '<L>Thai meo</L>\n<L>x3\t\t\t\t230000</L>';

    NetPrinter.printBill(newData);
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
          <Modal
            onBackdropPress={() => setModalVisibleReturn(false)}
            style={{alignItems: 'center', justifyContent: 'center'}}
            isVisible={modalVisibleReturn}>
            <View
              style={{
                height: Dimensions.get('window').height * 0.2,
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                // justifyContent: 'space-around',
              }}>
              <Text style={{marginTop: 15, fontSize: 15}}>
                Số lượng hoàn trả
              </Text>
              <TextInput
                style={{
                  width: Dimensions.get('window').width * 0.7,
                  height: 40,
                  borderBottomWidth: 0.8,
                  borderBottomColor: '#333333',
                  marginTop: 10,
                }}
                placeholder="Số lượng hoàn trả"
                placeholderTextColor="#9C9C9C"
                onChangeText={(text) => setQuantityReturn(text)}
                defaultValue={quantityReturn}
                keyboardType={'number-pad'}
              />
              <TouchableOpacity
                onPress={() => {
                  handleReturnFood();
                }}
                style={{
                  height: 40,
                  // padding: 3,
                  marginTop: 20,
                  width: Dimensions.get('window').width * 0.7,
                  backgroundColor: Color.main,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                }}>
                <Text
                  style={{color: Color.white, fontSize: 15, fontWeight: '700'}}>
                  Hoàn trả
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
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
                          borderBottomWidth: 0.5,
                          borderBottomColor: Color.main,
                          paddingBottom: 10,
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
                          <Text style={{fontWeight: '400', fontSize: 12}}>
                            Số lượng đã hoàn trả:{' '}
                            {item?.quantity_minus_group_food}
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
                        <View style={{flexDirection: 'column'}}>
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
                                            // var moneyOld = totalMoneyWithStaffLocal;
                                            // moneyOld += item.price;
                                            // setTotalMoneyWithStaffLocal(
                                            //   moneyOld,
                                            // );
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
                                                        props?.route?.params
                                                          ?.id,
                                                      )
                                                      .then(function (
                                                        response,
                                                      ) {
                                                        if (response) {
                                                          if (
                                                            response.data
                                                              .code === 200
                                                          ) {
                                                            setDataOrderOffline(
                                                              response.data
                                                                .data,
                                                            );
                                                            var oldMoney = 0;
                                                            response.data.data.book_food?.forEach(
                                                              (element) => {
                                                                if (
                                                                  element.status ===
                                                                  3
                                                                ) {
                                                                  oldMoney +=
                                                                    element.price;
                                                                }
                                                              },
                                                            );
                                                            setTotalMoneyWithStaffLocal(
                                                              oldMoney,
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
                              // height: 22,
                              // width: 80,
                              padding: 3,
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
                          {item.status === 3 ? (
                            <TouchableOpacity
                              onPress={() => {
                                {
                                  setModalVisibleReturn(true);
                                  setIdFoodReturn(item.id);
                                  setMoneyReturn(item.price);
                                }
                              }}
                              style={{
                                // height: 22,
                                // width: 80,
                                padding: 3,
                                borderRadius: 4,
                                borderWidth: 1,
                                borderColor: Color.buttonColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: Dimensions.get('window').width * 0.2,
                                justifyContent: 'center',
                                marginTop: 8,
                              }}>
                              <Text
                                style={{
                                  fontSize: 11,
                                  color: Color.buttonColor,
                                }}>
                                Hoàn trả
                              </Text>
                            </TouchableOpacity>
                          ) : null}
                        </View>
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
                    {/* {styles.dynamicSort(
                      dataOrderOffline.is_shop_book === 1
                        ? totalMoneyWithStaffLocal
                        : dataOrderOffline?.total_money,
                    )}{' '} */}
                    {styles.dynamicSort(totalMoneyWithStaffLocal)} đ
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Xác nhận thanh toán',
                      'Bạn chắc chắn muốn thanh toán bàn này?',
                      [
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            storage.getItem('isConnect').then((data) => {
                              if (data === 'true') {
                                printBillTest();
                              } else {
                                Alert.alert(
                                  'Thông báo!',
                                  'Bạn chưa kết nối với máy in!',
                                  [
                                    {
                                      text: 'Đồng ý',
                                      onPress: async () => {},
                                    },
                                  ],
                                  {cancelable: false},
                                );
                              }
                            });
                            staffPayment();
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                    // printBillTest();
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
