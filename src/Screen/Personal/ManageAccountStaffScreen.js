import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  FlatList,
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import services from '../../Redux/Service/staffService';

const LoginScreen = (props) => {
  const store_id = props?.route?.params?.store_id || null;

  const [tab, setTab] = useState(0);

  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Chờ kết nối'},
    {id: 1, name: 'Đã kết nối'},
    {id: 2, name: 'Tạm dừng'},
  ]);

  const [dataStaff, setDataStaff] = useState([]);

  const handleChangeTab = (index) => {
    setTab(index);
    services
      .getListStaffWaitConnect(null, store_id, index)
      .then(function (response) {
        // console.log(response);
        // props.onGetList(response?.data);
        if (response) {
          // console.log('thai mai', response);
          if (response.data.code === 200) {
            setDataStaff(response.data.data);
          }
        } else {
          return;
        }
      });
  };

  const getData = () => {
    // console.log(store_id);
    services
      .getListStaffWaitConnect(null, store_id, 0)
      .then(function (response) {
        // console.log(response);
        // props.onGetList(response?.data);
        if (response) {
          // console.log('thai mai', response);
          if (response.data.code === 200) {
            setDataStaff(response.data.data);
          }
        } else {
          return;
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          backgroundColor: Color.white,
          borderRadius: 8,
          marginTop: 15,
        }}>
        <Image source={{uri: item.avatar}} style={{width: 48, height: 48}} />
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            marginLeft: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: Dimensions.get('window').width - 100,
            }}>
            <Text style={{fontSize: 15, fontWeight: '400'}}>{item.name}</Text>
            <Text style={{fontSize: 15, fontWeight: '400'}}>{item.phone}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: 'black',
              }}>
              Giới tính: {item.gender === 1 ? 'Nam' : 'Nữ'}
            </Text>
            {tab === 1 ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Thông báo',
                      'Bạn chắc chắn muốn loại bỏ nhân viên?',
                      [
                        // {
                        //   text: 'Cancel',
                        //   onPress: () => {},
                        //   style: 'cancel',
                        // },
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .stopStaff({
                                store_id: store_id,
                                staff_id: item.id,
                              })
                              .then(function (response) {
                                // console.log(response);
                                // props.onGetList(response?.data);
                                if (response) {
                                  // console.log('thai mai', response);
                                  if (response.data.code === 200) {
                                    props.navigation.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: 'ManageAccountStaffScreen',
                                          params: {
                                            store_id: store_id,
                                          },
                                        },
                                      ],
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
                    );
                  }}
                  style={{
                    width: 66,
                    height: 25,
                    borderRadius: 4,
                    backgroundColor: Color.buttonColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 12, color: 'black'}}>Loại bỏ</Text>
                </TouchableOpacity>
              </View>
            ) : tab === 2 ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Thông báo',
                      'Bạn chắc chắn muốn kích hoạt nhân viên?',
                      [
                        // {
                        //   text: 'Cancel',
                        //   onPress: () => {},
                        //   style: 'cancel',
                        // },
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .activeStaff({
                                store_id: store_id,
                                staff_id: item.id,
                              })
                              .then(function (response) {
                                // console.log(response);
                                // props.onGetList(response?.data);
                                if (response) {
                                  // console.log('thai mai', response);
                                  if (response.data.code === 200) {
                                    props.navigation.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: 'ManageAccountStaffScreen',
                                          params: {
                                            store_id: store_id,
                                          },
                                        },
                                      ],
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
                    );
                  }}
                  style={{
                    width: 66,
                    height: 25,
                    marginLeft: 10,
                    borderRadius: 4,
                    borderColor: Color.main,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 12, color: Color.main}}>
                    Kích hoạt
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Thông báo',
                      'Bạn chắc chắn muốn xoá nhân viên?',
                      [
                        // {
                        //   text: 'Cancel',
                        //   onPress: () => {},
                        //   style: 'cancel',
                        // },
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .deleteStaff({
                                store_id: store_id,
                                staff_id: item.id,
                              })
                              .then(function (response) {
                                // console.log(response);
                                // props.onGetList(response?.data);
                                if (response) {
                                  // console.log('thai mai', response);
                                  if (response.data.code === 200) {
                                    props.navigation.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: 'ManageAccountStaffScreen',
                                          params: {
                                            store_id: store_id,
                                          },
                                        },
                                      ],
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
                    );
                  }}
                  style={{
                    width: 66,
                    height: 25,
                    borderRadius: 4,
                    backgroundColor: Color.buttonColor,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 12, color: 'black'}}>Từ chối</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Thông báo',
                      'Bạn chắc chắn muốn xác nhận nhân viên?',
                      [
                        // {
                        //   text: 'Cancel',
                        //   onPress: () => {},
                        //   style: 'cancel',
                        // },
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .confirmStaff({
                                store_id: store_id,
                                staff_id: item.id,
                              })
                              .then(function (response) {
                                // console.log(response);
                                // props.onGetList(response?.data);
                                if (response) {
                                  // console.log('thai mai', response);
                                  if (response.data.code === 200) {
                                    props.navigation.reset({
                                      index: 0,
                                      routes: [
                                        {
                                          name: 'ManageAccountStaffScreen',
                                          params: {
                                            store_id: store_id,
                                          },
                                        },
                                      ],
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
                    );
                  }}
                  style={{
                    width: 66,
                    height: 25,
                    marginLeft: 10,
                    borderRadius: 4,
                    borderColor: Color.main,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{fontSize: 12, color: Color.main}}>
                    Xác nhận
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  };

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
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {dataTab.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      handleChangeTab(index);
                    }}
                    key={index}
                    style={{
                      height: 32,
                      width: Dimensions.get('window').width * 0.3,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: tab === index ? Color.main : '#fff',
                      borderRadius: 6,
                      // backgroundColor: 'red',
                    }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              style={{
                width: Dimensions.get('window').width - 10,
                marginTop: 5,
                // marginLeft: 10,
                borderRadius: 5,
                marginBottom: 10,
                flex: 1,
                // paddingLeft: 5,
                paddingRight: 5,
              }}
              data={dataStaff}
              renderItem={renderProduct}
              keyExtractor={(item, index) => index.toString()}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0}
              // ListFooterComponent={renderFooter}
            />
            {/* {tab === 0 ? (
              <TouchableOpacity
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: Color.buttonColor,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontWeight: '700', fontSize: 15}}>
                  Từ chối tất cả
                </Text>
              </TouchableOpacity>
            ) : null}
            {tab === 0 ? (
              <TouchableOpacity
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: Color.main,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 10,
                  marginBottom: 15,
                }}>
                <Text
                  style={{fontWeight: '700', fontSize: 15, color: Color.white}}>
                  Xác nhận tất cả
                </Text>
              </TouchableOpacity>
            ) : null} */}
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
