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
import productServices from '../../Redux/Service/productService';
import reactotron from 'reactotron-react-native';
import * as actionsLogin from '../../Redux/Action/loginAction';

const LoginScreen = (props) => {
  const [tab, setTab] = useState(0);
  const [storeId, setStoreId] = useState(null);

  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Đã kết nối'},
    {id: 1, name: 'Tạm dừng'},
    {id: 2, name: 'Chờ kết nối'},
  ]);

  const [dataStaff, setDataStaff] = useState([]);

  const [dataStore, setDataStore] = useState({});

  useEffect(() => {
    reactotron.log(
      props.dataLogin.responseUserInformation.data.data
        .is_store_owner_and_chain_owner,
    );
    props.getUserInformation(null);
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreId(data.id);
        services.listStoreOwner(null, data.id).then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataStaff(response.data.data);
              // reactotron.log('thai', response.data.data);
            } else {
              Alert.alert(
                'Thông báo',
                response.data.message,
                [
                  {
                    text: 'Đồng ý',
                    onPress: async () => {
                      props.navigation.goBack();
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          } else {
            return;
          }
        });
        productServices.storeDetail(data.id).then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataStore(response.data.data.owner_store.user);
            } else {
              Alert.alert(
                'Thông báo',
                response.data.message,
                [
                  {
                    text: 'Đồng ý',
                    onPress: async () => {
                      props.navigation.goBack();
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          } else {
            return;
          }
        });
      }
    });
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
                color: Color.main,
              }}>
              {item.code}
            </Text>
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('ActionDecentralizationStaffScreen');
                // console.log(item.id, storeId);
                Alert.alert(
                  'Thông báo',
                  'Bạn chắc chắn muốn xác nhận nhận viên này là chủ cửa hàng?',
                  [
                    {text: 'Hủy', onPress: () => {}},
                    {
                      text: 'Đồng ý',
                      onPress: async () => {
                        var body = {store_id: storeId, owner_id: item.id};
                        // console.log(body);
                        services
                          .confirmStoreOwner(body)
                          .then(function (response) {
                            if (response) {
                              if (response.data.code === 200) {
                                Alert.alert(
                                  'Thông báo',
                                  'Xác nhận chủ cửa hàng thành công!',
                                  [
                                    {
                                      text: 'Đồng ý',
                                      onPress: async () => {
                                        props.navigation.goBack();
                                      },
                                    },
                                  ],
                                  {cancelable: false},
                                );
                              } else {
                                Alert.alert(
                                  'Thông báo',
                                  response.data.message,
                                  [
                                    {
                                      text: 'Đồng ý',
                                      onPress: async () => {},
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
                width: 80,
                height: 25,
                borderRadius: 4,
                backgroundColor: Color.buttonColor,
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'flex-end',
              }}>
              <Text style={{fontSize: 12}}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const handleConfirmDoStoreOwner = () => {
    Alert.alert(
      'Thông báo!',
      'Bạn có chắc xác nhận làm chủ cửa hàng?',
      [
        {
          text: 'Hủy',
          onPress: async () => {},
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            var body = {
              store_id: storeId,
            };
            services.confirmDoStoreOwner(body).then(function (response) {
              if (response) {
                if (response.data.code === 200) {
                  Alert.alert(
                    'Thông báo',
                    response.data.message,
                    [
                      {
                        text: 'Đồng ý',
                        onPress: async () => {
                          props.navigation.goBack();
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  Alert.alert(
                    'Thông báo',
                    response.data.message,
                    [
                      {
                        text: 'Đồng ý',
                        onPress: async () => {
                          props.navigation.goBack();
                        },
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

  const handleCancelDoStoreOwner = () => {
    Alert.alert(
      'Thông báo!',
      'Bạn có chắc muốn huỷ làm chủ cửa hàng?',
      [
        {
          text: 'Hủy',
          onPress: async () => {},
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            var body = {
              store_id: storeId,
            };
            services.cancelDoStoreOwner(body).then(function (response) {
              if (response) {
                if (response.data.code === 200) {
                  Alert.alert(
                    'Thông báo',
                    response.data.message,
                    [
                      {
                        text: 'Đồng ý',
                        onPress: async () => {
                          props.navigation.goBack();
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  Alert.alert(
                    'Thông báo',
                    response.data.message,
                    [
                      {
                        text: 'Đồng ý',
                        onPress: async () => {
                          props.navigation.goBack();
                        },
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
            {dataStaff !== [] || dataStaff !== null ? (
              <View>
                {props?.dataLogin?.responseUserInformation?.data?.data
                  ?.is_store_owner_and_chain_owner === 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      handleConfirmDoStoreOwner();
                    }}
                    style={{
                      height: 40,
                      width: '100%',
                      backgroundColor: Color.buttonColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}>
                    <Text>Tôi là chủ cửa hàng!</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      handleCancelDoStoreOwner();
                    }}
                    style={{
                      height: 40,
                      width: '100%',
                      backgroundColor: Color.red,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 8,
                    }}>
                    <Text style={{color: Color.white}}>
                      Huỷ làm chủ cửa hàng!
                    </Text>
                  </TouchableOpacity>
                )}

                {props?.dataLogin?.responseUserInformation?.data?.data
                  ?.is_store_owner_and_chain_owner === 0 && (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    style={{
                      marginBottom: 230,
                    }}
                    data={dataStaff}
                    renderItem={renderProduct}
                    keyExtractor={(item, index) => index.toString()}
                    // onEndReached={handleLoadMore}
                    // onEndReachedThreshold={0}
                    // ListFooterComponent={renderFooter}
                  />
                )}
              </View>
            ) : (
              <View
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  backgroundColor: Color.white,
                  borderRadius: 8,
                  marginTop: 15,
                }}>
                <Image
                  source={{uri: dataStore.avatar}}
                  style={{width: 48, height: 48}}
                />
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
                    <Text style={{fontSize: 15, fontWeight: '400'}}>
                      {dataStore.name}
                    </Text>
                    <Text style={{fontSize: 15, fontWeight: '400'}}>
                      {dataStore.phone}
                    </Text>
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
                      Giới tính: {dataStore.gender === 1 ? 'Nam' : 'Nữ'}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'Xoá chủ cửa hàng',
                          'Bạn có chắc muốn xoá chủ cửa hàng?',
                          [
                            {
                              text: 'Hủy',
                              onPress: async () => {},
                            },
                            {
                              text: 'Đồng ý',
                              onPress: async () => {
                                var body = {
                                  store_id: storeId,
                                  owner_id: dataStore.id,
                                };
                                services
                                  .deleteStoreOwner(body)
                                  .then(function (response) {
                                    if (response) {
                                      if (response.data.code === 200) {
                                        Alert.alert(
                                          'Thông báo',
                                          response.data.message,
                                          [
                                            {
                                              text: 'Đồng ý',
                                              onPress: async () => {
                                                props.navigation.goBack();
                                              },
                                            },
                                          ],
                                          {cancelable: false},
                                        );
                                      } else {
                                        Alert.alert(
                                          'Thông báo',
                                          response.data.message,
                                          [
                                            {
                                              text: 'Đồng ý',
                                              onPress: async () => {
                                                props.navigation.goBack();
                                              },
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
                        padding: 5,
                        backgroundColor: Color.red,
                        borderRadius: 4,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: 'white', fontSize: 12}}>
                        Xoá chủ cửa hàng
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
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
    dataLogin: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetListStore: (params) => {
    dispatch(actionsGetListStore.getListStore(params));
  },
  onLogin: (params) => {
    dispatch(actionsLogin.login(params));
  },
  getUserInformation: (params) => {
    dispatch(actionsLogin.getUserInformation(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
