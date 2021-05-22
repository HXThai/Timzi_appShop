import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Dimensions,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Theme/Color';
import Images from '../Theme/Images';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {interpolate} from '@popmotion/popcorn';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStore,
  faChevronRight,
  faUsers,
  faUser,
  faTag,
  faClipboardList,
  faKey,
  faSignOutAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import storage from './asyncStorage/Storage';
import Modal from 'react-native-modal';
import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';

const Home = (props) => {
  const [storeId, setStoreId] = useState(null);

  // useEffect(() => {
  //   NetPrinter.init().then(() => {
  //     setPrinters([{host: '192.168.2.222', port: 9100}]);
  //     // console.log('success');
  //     NetPrinter.connectPrinter('192.168.2.222', 9100).then(
  //       (value) => {
  //         console.log('test');
  //         setCurrentPrinter(value);
  //       },
  //       (error) => console.log(error),
  //     );
  //   });
  // }, []);

  const handleConnectPrinter = () => {
    setModalVisibleLoading(true);
    NetPrinter.init().then(() => {
      // setPrinters([{host: ipAđdress, port: 9100}]);
      // console.log('success');
      NetPrinter.connectPrinter(ipAđdress, 9100).then(
        (value) => {
          console.log('test');

          Alert.alert(
            'Thông báo!',
            'Kết nối máy in thành công!',
            [
              {
                text: 'Đồng ý',
                onPress: () => {
                  setModalVisibleLoading(false);
                  setModalVisible(false);
                },
              },
            ],
            {cancelable: false},
          );
        },
        (error) => {
          console.log(error);

          Alert.alert(
            'Thông báo!',
            'Kết nối máy in thất bại, vui lòng kiểm tra lại thông tin!',
            [
              {
                text: 'Đồng ý',
                onPress: () => {
                  setModalVisibleLoading(false);
                },
              },
            ],
            {cancelable: false},
          );
        },
      );
    });
    // setTimeout(() => {
    //   console.log('thai');
    // }, 3000);
  };

  useEffect(() => {
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreId(data.id);
      } else {
        setStoreId(props.data.responseListStore?.data[0]?.id);
      }
    });
  }, [props.data.responseListStore]);

  const [dataUser, setDataUser] = useState({});

  const [phone, setPhone] = useState('0901945179');

  const [roleId, setRoleId] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [ipAđdress, setIpAddress] = useState('192.168.2.222');

  useEffect(() => {
    storage.getItem('role_id').then((data) => {
      // console.log(data);
      if (data) {
        // console.log('role', data);
        setRoleId(data);
        data === 6
          ? setDataCategories([
              {icon: faStore, name: 'Quán của bạn'},
              {icon: faTag, name: 'Chương trình khuyến mãi'},
              {icon: faUser, name: 'Tài khoản nhân viên'},
              // {icon: faUsers, name: 'Phân cấp quyền nhân viên'},
              {icon: faClipboardList, name: 'Đánh giá của người dùng'},
              {icon: faUser, name: 'Tài khoản shipper ruột'},
              {icon: faKey, name: 'Đổi mật khẩu'},
              {icon: faPhone, name: 'Hỗ trợ'},
              {icon: faSignOutAlt, name: 'Đăng xuất'},
            ])
          : setDataCategories([
              {icon: faStore, name: 'Quán của bạn'},
              {icon: faTag, name: 'Chương trình khuyến mãi'},
              // {icon: faUser, name: 'Tài khoản nhân viên'},
              {icon: faUsers, name: 'Chủ cửa hàng'},
              {icon: faClipboardList, name: 'Đánh giá của người dùng'},
              // {icon: faUser, name: 'Tài khoản shipper ruột'},
              {icon: faKey, name: 'Đổi mật khẩu'},
              {icon: faPhone, name: 'Hỗ trợ'},
              {icon: faSignOutAlt, name: 'Đăng xuất'},
            ]);
      } else {
      }
    });
  }, []);

  useEffect(() => {
    setDataUser(props.dataLogin.responseUserInformation?.data?.data);
    // console.log(props.dataLogin.responseUserInformation?.data?.data);
  }, [props.dataLogin.responseUserInformation]);

  const [dataCategories, setDataCategories] = useState([]);

  const onClickCate = (index, props) => {
    if (index === 0) {
      props.navigation.navigate('YourRestaurantScreen');
    } else if (index === 1) {
      props.navigation.navigate('PromotionScreen');
    } else if (index === 2) {
      props.navigation.navigate('DecentralizationStaffScreen');
    } else if (index === 3) {
      props.navigation.navigate('RateOfUserScreen');
    } else if (index === 4) {
      props.navigation.navigate('ChangePasswordScreen');
    } else if (index === 5) {
      // props.navigation.navigate('ChangePasswordScreen');
      Linking.openURL(`tel:${phone}`);
    } else {
      Alert.alert(
        'Đăng xuất',
        'Bạn chắc chắn muốn đăng xuất?',
        [
          {text: 'Hủy', onPress: () => {}},
          {
            text: 'Đồng ý',
            onPress: async () => {
              // await AsyncStorage.clear();
              await AsyncStorage.removeItem('dataLogin');
              props.navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  const onClickCateShop = (index, props) => {
    if (index === 0) {
      props.navigation.navigate('YourRestaurantScreen');
    } else if (index === 1) {
      props.navigation.navigate('PromotionScreen');
    } else if (index === 2) {
      props.navigation.navigate('ManageAccountStaffScreen', {
        store_id: storeId,
      });
    } else if (index === 3) {
      props.navigation.navigate('RateOfUserScreen');
    } else if (index === 4) {
      props.navigation.navigate('AccountShipperScreen', {
        store_id: storeId,
      });
    } else if (index === 5) {
      props.navigation.navigate('ChangePasswordScreen');
    } else if (index === 6) {
      // props.navigation.navigate('ChangePasswordScreen');
      Linking.openURL(`tel:${phone}`);
    } else {
      Alert.alert(
        'Đăng xuất',
        'Bạn chắc chắn muốn đăng xuất?',
        [
          {text: 'Hủy', onPress: () => {}},
          {
            text: 'Đồng ý',
            onPress: async () => {
              // await AsyncStorage.clear();
              await AsyncStorage.removeItem('dataLogin');
              props.navigation.navigate('Login');
            },
          },
        ],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 10}}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <Modal
                  onBackdropPress={() => setModalVisible(false)}
                  style={{alignItems: 'center', justifyContent: 'center'}}
                  isVisible={modalVisible}>
                  <Modal
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    isVisible={modalVisibleLoading}>
                    <View
                      style={{
                        height: 70,
                        width: 70,
                        backgroundColor: '#fff',
                        borderRadius: 10,
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <ActivityIndicator size="large" color={Color.main} />
                    </View>
                  </Modal>
                  <View
                    style={{
                      height: Dimensions.get('window').height * 0.22,
                      width: '100%',
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <View>
                      <Text>Địa chỉ Ip máy in</Text>
                      <TextInput
                        style={{
                          height: 40,
                          borderBottomWidth: 0.8,
                          borderBottomColor: '#333333',
                          width: Dimensions.get('window').width * 0.7,
                        }}
                        placeholder="Địa chỉ ip máy in"
                        placeholderTextColor="#9C9C9C"
                        onChangeText={(text) => setIpAddress(text)}
                        defaultValue={ipAđdress}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          handleConnectPrinter();
                        }}
                        style={{
                          width: Dimensions.get('window').width * 0.7,
                          marginTop: 20,
                          height: 40,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: Color.buttonColor,
                          borderRadius: 8,
                        }}>
                        <Text>Kết nối máy in</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
                <View
                  style={{
                    padding: 10,
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  <View
                    style={{
                      width: Dimensions.get('window').width - 30,
                      position: 'absolute',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        props.navigation.navigate('NotificationScreen');
                      }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        borderColor: Color.main,
                        borderWidth: 0.5,
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialIcons
                        name={'notifications'}
                        size={28}
                        color={Color.main}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get('window').width - 100,
                      position: 'absolute',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 50,
                        borderColor: Color.main,
                        borderWidth: 0.5,
                        position: 'absolute',
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <MaterialIcons
                        name={'print'}
                        size={28}
                        color={Color.main}
                      />
                    </TouchableOpacity>
                  </View>
                  <Image
                    source={{uri: dataUser?.avatar}}
                    style={{width: 60, height: 60}}
                  />
                  <View style={{marginLeft: 10, flexDirection: 'column'}}>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      {dataUser?.name}
                    </Text>
                    <Text
                      style={{fontSize: 13, fontWeight: '400', marginTop: 10}}>
                      Địa chỉ: {dataUser?.address}
                    </Text>
                    {/* <Text
                      style={{fontSize: 13, fontWeight: '400', marginTop: 10}}>
                      Số điện thoại: {dataUser?.phone}
                    </Text> */}
                    {/* <Text
                      style={{fontSize: 13, fontWeight: '400', marginTop: 10}}>
                      Ngày tham gia: {dataUser.date}
                    </Text> */}
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <TouchableOpacity
                        style={{
                          width: 80,
                          height: 22,
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                          borderRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Color.main,
                          }}>
                          Chỉnh sửa
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('WalletScreen')
                        }
                        style={{
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                          borderRadius: 4,
                          width: 80,
                          height: 22,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Color.main,
                          }}>
                          Ví tiền
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{marginBottom: 60}}>
                  {dataCategories.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          roleId === 6
                            ? onClickCateShop(index, props)
                            : onClickCate(index, props)
                        }
                        key={index}
                        style={{
                          padding: 15,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#fff',
                          borderRadius: 8,
                          marginTop: 10,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <FontAwesomeIcon
                            color="#898989"
                            icon={item.icon}
                            size={24}
                            style={{}}
                            color={Color.main}
                          />
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 15,
                              marginLeft: 10,
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <FontAwesomeIcon
                          color="#898989"
                          icon={faChevronRight}
                          size={20}
                          style={{}}
                          color={Color.main}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log("data : " ,state.homeReducer);
  return {
    data: state.orderOnlineReducer,
    dataLogin: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetListStore: (params) => {
    dispatch(actionsGetListStore.getListStore(params));
  },
  getUserInformation: (params) => {
    dispatch(actionsLogin.getUserInformation(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
