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
  BackHandler,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Theme/Color';
import Images from '../Theme/Images';

// Styles
import styles from './Styles/HomeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import * as actionsGetListStore from '../Redux/Action/orderOnlineAction';
import * as actionsLogin from '../Redux/Action/loginAction';
import Modal from 'react-native-modal';
import loginService from '../Redux/Service/LoginService';
import services from '../Redux/Service/orderOnlineService';

const Home = (props) => {
  const [tab, setTab] = useState(props?.route?.params?.tab ? 2 : 0);
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Mới'},
    {id: 1, name: 'Đã nhận'},
    {id: 2, name: 'Đã lấy'},
    {id: 3, name: 'Hoàn thành'},
    {id: 4, name: 'Đã hủy'},
  ]);

  const [dataOrder, setDataOrder] = useState([]);

  const [dataListStore, setDataListStore] = useState([]);

  const [storeName, setStoreName] = useState('');

  const [storeId, setStoreId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  // console.log(props?.route?.params?.tab);

  const onClickDetail = (id) => {
    // console.log(id);
    if (tab === 0) {
      props.navigation.navigate('NewOrderOnlineDetailScreen', {id: id});
    } else if (tab === 1) {
      props.navigation.navigate('OrderOnlineRecievedDetailScreen', {id: id});
    } else if (tab === 2) {
      props.navigation.navigate('OrderOnlineHasTakenDetailScreen', {id: id});
    } else if (tab === 3) {
      // props.navigation.navigate('OrderOnlineCancelledDetailScreen');
    } else if (tab === 4) {
      props.navigation.navigate('OrderOnlineCancelledDetailScreen', {id: id});
    }
  };

  // useEffect(() => {
  //   BackHandler.addEventListener('hardwareBackPress', () => true);
  //   return () =>
  //     BackHandler.removeEventListener('hardwareBackPress', () => true);
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (props?.route?.params?.tab) {
        setTab(2);
      }
    }, [props?.route?.params?.tab]),
  );

  useEffect(() => {
    props.onGetListStore({});
  }, [props.onGetListStore]);

  useEffect(() => {
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreName(data.name);
        setStoreId(data.id);
        services
          .getListOrderOnline(null, data?.id, 1)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataOrder(response?.data?.data);
              }
            } else {
              return;
            }
          });
      } else {
        setStoreName(props.data.responseListStore?.data[0]?.name);
        setStoreId(props.data.responseListStore?.data[0]?.id);
        storage.setItem('dataStore', props.data.responseListStore?.data[0]);
        services
          .getListOrderOnline(
            null,
            props.data.responseListStore?.data[0]?.id,
            1,
          )
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataOrder(response?.data?.data);
              }
            } else {
              return;
            }
          });
      }
    });
    setDataListStore(props.data.responseListStore);
  }, [props.data.responseListStore]);

  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    storage.getItem('role_id').then((data) => {
      if (data) {
        setRoleId(data);
        if (data === 6) {
          storage.setItem(
            'dataStore',
            props.dataLogin.responseUserInformation?.data?.data?.store,
          );
          setStoreName(
            props.dataLogin.responseUserInformation?.data?.data?.store?.name,
          );
          setStoreId(
            props.dataLogin.responseUserInformation?.data?.data?.store?.id,
          );
          // console.log(
          //   props.dataLogin.responseUserInformation?.data?.data?.store?.id,
          // );
          services
            .getListOrderOnline(
              null,
              props.dataLogin.responseUserInformation?.data?.data?.store?.id,
              1,
            )
            .then(function (response) {
              if (response) {
                if (response.data.code === 200) {
                  setDataOrder(response?.data?.data);
                  setStoreId(
                    props.dataLogin.responseUserInformation?.data?.data?.store
                      ?.id,
                  );
                }
              } else {
                return;
              }
            });
        } else {
          storage.getItem('dataStore').then((data) => {
            if (data) {
              setStoreName(data?.name);
              setStoreId(data?.id);
              services
                .getListOrderOnline(null, data?.id, 1)
                .then(function (response) {
                  if (response) {
                    if (response.data.code === 200) {
                      setDataOrder(response?.data?.data);
                    }
                  } else {
                    return;
                  }
                });
            } else {
              setStoreName(props.data.responseListStore?.data[0]?.name);
              setStoreId(props.data.responseListStore?.data[0]?.id);
              storage.setItem(
                'dataStore',
                props.data.responseListStore?.data[0],
              );
              services
                .getListOrderOnline(
                  null,
                  props.data.responseListStore?.data[0]?.id,
                  1,
                )
                .then(function (response) {
                  if (response) {
                    if (response?.data?.code === 200) {
                      setDataOrder(response?.data?.data);
                    }
                  } else {
                    return;
                  }
                });
            }
          });
          // setDataListStore(props.data.responseListStore);
        }
      } else {
      }
    });
  }, [props.dataLogin.responseUserInformation]);

  const handleChangeTab = (index) => {
    // console.log(storeId);
    setDataOrder([]);
    setTab(index);
    setModalVisibleLoading(true);
    services
      .getListOrderOnline(null, storeId, index + 1)
      .then(function (response) {
        // console.log(response);
        // props.onGetList(response?.data);
        if (response) {
          // console.log('thai mai', response);
          if (response.data.code === 200) {
            setDataOrder(response?.data?.data);
            setModalVisibleLoading(false);
          }
        } else {
          return;
        }
      });
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onClickDetail(item?.id)}
        style={{
          height: 100,
          backgroundColor: '#fff',
          borderRadius: 8,
          marginBottom: 10,
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
              height: 75,
              width: 75,
              borderRadius: 6,
              borderColor: tab === 4 ? 'red' : Color.main,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
            <Image
              source={tab === 4 ? Images.iconPrintRed : Images.iconPrint}
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
              width: Dimensions.get('window').width - 130,
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
                {item?.user_name}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12, color: '#828282'}}>
                {'Khoảng cách: '}
                {item?.distance?.text}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginLeft: 10,
              width: Dimensions.get('window').width - 130,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 12,
                  // marginLeft: 5,
                }}>
                {item?.code}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12, color: '#828282'}}>
                {'Nhận từ khách: '}
                {item?.quantity}
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
              width: Dimensions.get('window').width - 130,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}>
              {tab === 0 ? (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{marginRight: 10}}
                    onPress={() => {
                      // setTab(1);
                      // console.log(item.id);
                      Alert.alert(
                        'Xác nhận đơn hàng',
                        'Bạn chắc chắn muốn xác nhận đơn hàng?',
                        [
                          {text: 'Hủy', onPress: () => {}},
                          {
                            text: 'Đồng ý',
                            onPress: async () => {
                              services
                                .confirmOrderOnline(null, item?.id)
                                .then(function (response) {
                                  // console.log(response);
                                  // props.onGetList(response?.data);
                                  if (response) {
                                    // console.log('thai mai', response);
                                    if (response.data.code === 200) {
                                      handleChangeTab(1);
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
                      height: 19,
                      width: 56,
                      borderRadius: 4,
                      marginRight: 10,
                      borderColor: tab === 3 ? 'red' : Color.main,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: tab === 3 ? 'red' : Color.main,
                        fontSize: 12,
                      }}>
                      Xác nhận
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // setTab(1);
                      // console.log(item.id);
                      Alert.alert(
                        'Hủy đơn hàng',
                        'Bạn chắc chắn muốn hủy đơn hàng?',
                        [
                          {text: 'Hủy', onPress: () => {}},
                          {
                            text: 'Đồng ý',
                            onPress: async () => {
                              services
                                .cancelOrderOnline(null, item?.id)
                                .then(function (response) {
                                  // console.log(response);
                                  // props.onGetList(response?.data);
                                  if (response) {
                                    // console.log('thai mai', response);
                                    if (response.data.code === 200) {
                                      handleChangeTab(4);
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
                      height: 19,
                      width: 56,
                      borderRadius: 4,
                      marginRight: 10,
                      borderColor: 'red',
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'red',
                        fontSize: 12,
                      }}>
                      Hủy
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : tab === 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    Alert.alert(
                      'Xác nhận đã lấy hàng',
                      'Bạn chắc chắn muốn xác nhận đơn hàng này đã được shipper lấy?',
                      [
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .confirmOrderOnlineReceived(null, item?.id)
                              .then(function (response) {
                                // console.log(response);
                                // props.onGetList(response?.data);
                                if (response) {
                                  // console.log('thai mai', response);
                                  if (response.data.code === 200) {
                                    handleChangeTab(2);
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
                    height: 19,
                    width: 75,
                    borderRadius: 4,
                    marginRight: 10,
                    borderColor: tab === 3 ? 'red' : Color.main,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      color: tab === 3 ? 'red' : Color.main,
                      fontSize: 12,
                    }}>
                    Đã lấy hàng
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  onClickDetail(item?.id);
                }}
                style={{
                  height: 19,
                  width: 56,
                  borderRadius: 4,
                  borderColor: tab === 4 ? 'red' : Color.main,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: tab === 4 ? 'red' : Color.main,
                    fontSize: 12,
                  }}>
                  Chi tiết
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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
          <SafeAreaView style={{flex: 1}}>
            <View style={{padding: 10}}>
              <Modal
                style={{alignItems: 'center', justifyContent: 'center'}}
                isVisible={modalVisible}>
                <View
                  style={{
                    height: '40%',
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    {dataListStore?.data?.map((item, index) => {
                      return (
                        <View style={{}} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              setStoreName(item.name);
                              storage.setItem('dataStore', item);
                              props.navigation.reset({
                                index: 0,
                                routes: [{name: 'TabNav'}],
                              });
                              setModalVisible(false);
                            }}
                            style={{
                              // height: 45,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomWidth: 0.5,
                              borderColor: Color.main,
                              width: Dimensions.get('window').width * 0.8,
                            }}
                            key={index}>
                            <Text
                              style={{
                                fontWeight: '700',
                                fontSize: 15,
                                marginBottom: 15,
                                marginTop: 15,
                              }}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </ScrollView>
                  <TouchableOpacity
                    style={{marginTop: 10}}
                    onPress={() => setModalVisible(false)}>
                    <View
                      style={{
                        width: 90,
                        height: 35,
                        backgroundColor: Color.main,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 25,
                        marginBottom: 10,
                      }}>
                      <Text style={[styles.text, {color: '#fff'}]}>Đóng</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </Modal>
              <View>
                {roleId === 2 ? (
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(true);
                    }}
                    style={{
                      height: 45,
                      width: '100%',
                      backgroundColor: Color.main,
                      alignItems: 'center',
                      borderRadius: 20,
                      borderWidth: 1,
                      borderColor: Color.main,
                      marginBottom: 10,
                      justifyContent: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: '700',
                        color: Color.white,
                      }}>
                      {storeName}
                    </Text>
                    <MaterialIcons
                      name={'keyboard-arrow-down'}
                      size={25}
                      color={Color.white}
                    />
                  </TouchableOpacity>
                ) : null}
                <View
                  style={{
                    // marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // width: '100%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 70,
                        width: '100%',
                        marginTop: 25,
                      }}>
                      <TextInput
                        style={{
                          height: 45,
                          color: '#000000',

                          borderColor: Color.main,
                          borderWidth: 1,
                          borderRadius: 20,
                          paddingLeft: 20,
                        }}
                        placeholder="Tìm đơn?"
                        placeholderTextColor="gray"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // width: '100%',
                      justifyContent: 'flex-end',
                      alignSelf: 'flex-end',
                      height: 45,
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <TouchableOpacity onPress={() => {}}>
                      <MaterialIcons
                        name={'search'}
                        size={26}
                        color={Color.main}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
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
                          width: '19%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: tab === index ? Color.main : '#fff',
                          borderRadius: 6,
                        }}>
                        <Text style={{fontSize: 13}}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <FlatList
                  // key={}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  style={{
                    marginTop: 10,
                    marginBottom: 340,
                  }}
                  data={dataOrder}
                  renderItem={renderProduct}
                  // renderItem={({item}) =><TouchableOpacity></TouchableOpacity> <Text>{item.user_name}</Text>}
                  keyExtractor={(item, index) => index.toString()}
                  // extraData={dataOrder}
                  // onEndReached={handleLoadMore}
                  // onEndReachedThreshold={0}
                  // ListFooterComponent={renderFooter}
                />
              </View>
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
