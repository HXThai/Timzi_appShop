import React, {useEffect, useState, useCallback, useRef} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Color from '../Theme/Color';
import Images from '../Theme/Images';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import {useFocusEffect} from '@react-navigation/native';
import * as actionsGetListStore from '../Redux/Action/orderOnlineAction';
import {connect} from 'react-redux';
import services from '../Redux/Service/orderOfflineService';
import reactotron from 'reactotron-react-native';
import moment from 'moment';
import * as actionsLogin from '../Redux/Action/loginAction';
// import {
//   USBPrinter,
//   NetPrinter,
//   BLEPrinter,
// } from 'react-native-thermal-receipt-printer';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const [isVisibleTime, setIsVisibleTime] = useState(false);
  const [minimumDate, setMinimumDate] = useState(false);
  const [isVisibleTime2, setIsVisibleTime2] = useState(false);
  const [selectTime, setSelectTime] = useState(false);
  const [date1, setDate1] = useState(
    moment(new Date()).utcOffset(7).format('DD/MM/YYYY'),
  );
  const [timestamp1, setTimeStamp1] = useState(new Date(Date.now()));
  const [timestamp2, setTimeStamp2] = useState(new Date(Date.now()));
  const [date2, setDate2] = useState(
    moment(new Date()).utcOffset(7).format('DD/MM/YYYY'),
  );
  const [tab, setTab] = useState(0);
  const refDateEnd = useRef('refDateEnd');
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Danh s??ch b??n'},
    {id: 1, name: 'M???i'},
    {id: 2, name: '???? nh???n'},
    {id: 3, name: '??ang ph???c v???'},
    {id: 4, name: '???? thanh to??n'},
    {id: 5, name: '???? h???y'},
  ]);

  const [dataOrder, setDataOrder] = useState([]);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [modalVisibleMergeTable, setModalVisibleMergeTable] = useState(false);

  const [modalVisibleChangeTable, setModalVisibleChangeTable] = useState(false);

  const [page, setPage] = useState(1);

  const [dataMergeTable, setDataMergeTable] = useState([]);

  const [dataChooseTable, setDataChooseTable] = useState([]);

  const [totalTableMerge, setTotalTableMerge] = useState([]);

  const [bookTableId, setBookTableId] = useState([]);

  const handleLoadMore = () => {
    // console.log('thai meo');
    dataOrder.length >= 12 ? setPage(page + 1) : null;
  };

  useEffect(() => {
    page > 1 ? getData() : null;
    return () => {};
  }, [page]);
  useEffect(() => {
    if (selectTime) {
      setSelectTime(false);
      setPage(1);
      getData();
    }
  }, [selectTime]);
  const getData = () => {
    // console.log('page', page);
    if (tab === 0) {
      services
        .getListTableOrderOffline(null, storeId, page)
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder((prev) => [...prev, ...response?.data?.data?.data]);
              setModalVisibleLoading(false);
            } else {
              setModalVisibleLoading(false);
            }
          } else {
            setModalVisibleLoading(false);
            return;
          }
        });
    } else {
      services
        .getListOrderOffline(
          null,
          storeId,
          tab,
          page,
          moment(timestamp1).utcOffset(7).format('YYYY-MM-DD'),
          moment(timestamp2).utcOffset(7).format('YYYY-MM-DD'),
        )
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder((prev) => [...prev, ...response?.data?.data?.data]);
              setModalVisibleLoading(false);
            } else {
              setModalVisibleLoading(false);
            }
          } else {
            setModalVisibleLoading(false);
            return;
          }
        });
    }
  };

  const onClickDetail = (id) => {
    if (tab === 1) {
      props.navigation.navigate('NewOrderOfflineDetailScreen', {id: id});
    } else if (tab === 2) {
      props.navigation.navigate('OrderOfflineReceivedDetailScreen', {id: id});
    } else if (tab === 3) {
      props.navigation.navigate('OrderOfflineServingDetailScreen', {id: id});
    } else if (tab === 4) {
      props.navigation.navigate('OrderOfflineServedDetailScreen', {id: id});
    } else if (tab === 5) {
      props.navigation.navigate('OrderOfflineCancelledDetailScreen', {id: id});
    } else if (tab == 0) {
      props.navigation.navigate('OrderTable', {id: id});
    }
  };

  useFocusEffect(
    useCallback(() => {
      // console.log(props?.route?.params?.tab);
      // if (props?.route?.params?.tab === 4) {
      //   setTab(4);
      // } else if (props?.route?.params?.tab === 3) {
      //   setTab(3);
      // } else if (props?.route?.params?.tab === 2) {
      //   setTab(2);
      // }
    }, [props?.route?.params?.tab]),
  );

  const [dataListStore, setDataListStore] = useState([]);

  const [storeName, setStoreName] = useState('');

  const [storeId, setStoreId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    // console.log(tab);
    // setDataOrder([]);
    setRefreshing(true);
    if (tab === 0) {
      services
        .getListTableOrderOffline(null, storeId, 1)
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder(response?.data?.data?.data);
              setModalVisibleLoading(false);
            }
          } else {
            return;
          }
        });
    } else {
      services
        .getListOrderOffline(
          null,
          storeId,
          tab,
          1,
          moment(timestamp1).utcOffset(7).format('YYYY-MM-DD'),
          moment(timestamp2).utcOffset(7).format('YYYY-MM-DD'),
        )
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder(response?.data?.data?.data);
              setModalVisibleLoading(false);
            }
          } else {
            return;
          }
        });
    }
    wait(1000).then(() => {
      setRefreshing(false);
    });
  });

  useEffect(() => {
    props?.data?.responseListStore?.data?.forEach((element, index) => {
      if (element.status === 1) {
        setStoreName(element.name);
        setStoreId(element.id);
        storage.setItem('dataStore', element);
        services
          .getListTableOrderOffline(null, element.id, 1)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataOrder(response?.data?.data?.data);
                setModalVisibleLoading(false);
              } else {
                setModalVisibleLoading(false);
              }
            } else {
              setModalVisibleLoading(false);
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
          reactotron.log(
            'thai',
            props.dataLogin.responseUserInformation?.data?.data?.store?.id,
          );
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
          services
            .getListTableOrderOffline(
              null,
              props.dataLogin.responseUserInformation?.data?.data?.store?.id,
              1,
            )
            .then(function (response) {
              if (response) {
                if (response.data.code === 200) {
                  setDataOrder(response?.data?.data?.data);
                  setModalVisibleLoading(false);
                } else {
                  setModalVisibleLoading(false);
                }
              } else {
                setModalVisibleLoading(false);
                return;
              }
            });
        } else {
          props?.data?.responseListStore?.data?.forEach((element, index) => {
            if (element.status === 1) {
              setStoreName(element.name);
              setStoreId(element.id);
              storage.setItem('dataStore', element);
              services
                .getListOrderOnline(null, element.id, 2, 1)
                .then(function (response) {
                  if (response) {
                    if (response?.data?.code === 200) {
                      setDataOrder(response?.data?.data?.data);
                      setModalVisibleLoading(false);
                    } else {
                      reactotron.log('Thaiiiiiiitest2');
                      setModalVisibleLoading(false);
                    }
                  } else {
                    Alert.alert(
                      'Th??ng b??o',
                      'Kh??ng t??m th???y c???a h??ng!',
                      [
                        {
                          text: '?????ng ??',
                          onPress: async () => {},
                        },
                      ],
                      {cancelable: false},
                    );
                    return;
                  }
                });
            }
          });
        }
      } else {
      }
    });
  }, [props.dataLogin.responseUserInformation]);

  // useEffect(() => {
  //   return () => {
  //     console.log('thai');
  //   };
  // }, []);

  const handleChangeTab = async (index) => {
    await setDataOrder([]);
    setTab(index);
    setPage(1);
    setModalVisibleLoading(true);
    if (index === 0) {
      services
        .getListTableOrderOffline(null, storeId, 1)
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder(response?.data?.data?.data);
              setModalVisibleLoading(false);
            } else {
              Alert.alert(
                'Th??ng b??o',
                'Kh??ng t??m th???y c???a h??ng!',
                [
                  {
                    text: '?????ng ??',
                    onPress: async () => {},
                  },
                ],
                {cancelable: false},
              );
              setModalVisibleLoading(false);
            }
          } else {
            Alert.alert(
              'Th??ng b??o',
              'Kh??ng t??m th???y c???a h??ng!',
              [
                {
                  text: '?????ng ??',
                  onPress: async () => {},
                },
              ],
              {cancelable: false},
            );
            setModalVisibleLoading(false);
            return;
          }
        });
    } else {
      services
        .getListOrderOffline(
          null,
          storeId,
          index,
          1,
          moment(timestamp1).utcOffset(7).format('YYYY-MM-DD'),
          moment(timestamp2).utcOffset(7).format('YYYY-MM-DD'),
        )
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder(response?.data?.data?.data);
              setModalVisibleLoading(false);
            } else {
              Alert.alert(
                'Th??ng b??o',
                'Kh??ng t??m th???y c???a h??ng!',
                [
                  {
                    text: '?????ng ??',
                    onPress: async () => {},
                  },
                ],
                {cancelable: false},
              );
              setModalVisibleLoading(false);
            }
          } else {
            Alert.alert(
              'Th??ng b??o',
              'Kh??ng t??m th???y c???a h??ng!',
              [
                {
                  text: '?????ng ??',
                  onPress: async () => {},
                },
              ],
              {cancelable: false},
            );
            setModalVisibleLoading(false);
            return;
          }
        });
    }
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          // console.log(item.status);
          if (tab === 0) {
            if (item.status === 1) {
              onClickDetail(item.id);
            } else {
              Alert.alert(
                'Th??ng b??o!',
                'B??n ???? h???t ch???, vui l??ng ch???n b??n kh??c!',
                [
                  {
                    text: '?????ng ??',
                  },
                ],
                {cancelable: false},
              );
            }
          } else {
            onClickDetail(item.id);
          }

          // reactotron.log('day ne');
        }}
        style={{
          height: 100,
          backgroundColor: '#fff',
          borderRadius: 8,
          flexDirection: 'row',
          padding: 8,
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              height: 19,
              width: 60,
              borderRadius: 6,
              borderColor:
                tab === 0
                  ? item.status === 1
                    ? Color.buttonColor
                    : item.status === 2
                    ? '#828282'
                    : Color.main
                  : tab === 1
                  ? Color.buttonColor
                  : tab === 4
                  ? '#828282'
                  : tab === 5
                  ? Color.red
                  : Color.main,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color:
                  tab === 0
                    ? item.status === 1
                      ? Color.buttonColor
                      : item.status === 2
                      ? '#828282'
                      : Color.main
                    : tab === 1
                    ? Color.buttonColor
                    : tab === 4
                    ? '#828282'
                    : tab === 5
                    ? Color.red
                    : Color.main,
                fontSize: 11,
              }}>
              {tab === 0
                ? item.status === 1
                  ? 'C??n ch???'
                  : 'H???t ch???'
                : tab === 1
                ? 'Ch??? duy???t'
                : tab === 2
                ? '???? nh???n'
                : tab === 3
                ? '??ang pv'
                : tab === 4
                ? '???? TT'
                : '???? h???y'}
            </Text>
          </View>
          <View
            style={{
              height: 60,
              width: 60,
              borderRadius: 6,
              alignItems: 'center',
              justifyContent: 'center',
              borderColor:
                tab === 0
                  ? item.status === 1
                    ? Color.buttonColor
                    : item.status === 2
                    ? '#828282'
                    : Color.main
                  : tab === 1
                  ? Color.buttonColor
                  : tab === 4
                  ? '#828282'
                  : tab === 5
                  ? Color.red
                  : Color.main,
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={
                tab === 0
                  ? item.status === 1
                    ? Images.iconOrderOfflineYellow
                    : item.status === 2
                    ? Images.iconOrderOfflineGrey
                    : Images.iconOrderOfflineGreen
                  : tab === 1
                  ? Images.iconOrderOfflineYellow
                  : tab === 5
                  ? Images.iconOrderOfflineRed
                  : tab === 4
                  ? Images.iconOrderOfflineGrey
                  : Images.iconOrderOfflineGreen
              }
              style={{height: 44, width: 44}}
            />
            <View style={{position: 'absolute'}}>
              <Text style={{color: '#fff'}}>
                {tab === 0
                  ? item?.number_table
                  : item?.table_store?.number_table}
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
                B??n s???{' '}
                {tab === 0
                  ? item?.number_table
                  : item?.table_store?.number_table}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12, color: '#828282'}}>
                {'V??? tr??: T???ng '}
                {tab === 0
                  ? item?.number_floor
                  : item?.table_store?.number_floor}
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
              {/* <Image
                source={Images.iconPersonal}
                style={{height: 10, width: 10, opacity: 0}}
              /> */}
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
                {item?.time_booking}
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
                {'S??? kh??ch: '}
                {tab === 0
                  ? item?.number_people_min + '-' + item?.number_people_max
                  : item?.number_people}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {tab === 1 ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      // setTab(2);
                      Alert.alert(
                        'X??c nh???n ????n h??ng',
                        'B???n ch???c ch???n mu???n x??c nh???n ????n h??ng?',
                        [
                          {text: 'H???y', onPress: () => {}},
                          {
                            text: '?????ng ??',
                            onPress: async () => {
                              services
                                .confirmOrderOffline(null, item?.id)
                                .then(function (response) {
                                  if (response) {
                                    if (response.data.code === 200) {
                                      handleChangeTab(2);
                                    } else {
                                      Alert.alert(
                                        'Th??ng b??o',
                                        response.data.message,
                                        [{text: '?????ng ??', onPress: () => {}}],
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
                      height: 19,
                      width: 60,
                      borderRadius: 4,
                      borderColor: Color.main,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.main, fontSize: 12}}>
                      X??c nh???n
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : tab === 2 ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item.is_shop_book === 1 ? (
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <TouchableOpacity
                        onPress={() => {
                          props.navigation.navigate('OrderFoodScreen', {
                            id: item.id,
                          });
                        }}
                        style={{
                          padding: 3,
                          borderRadius: 4,
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 5,
                        }}>
                        <Text style={{color: Color.main, fontSize: 12}}>
                          G???i m??n
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => {
                      setBookTableId(item?.id);
                      reactotron.log(item);
                      services
                        .getListTableEmpty(null, item?.id)
                        .then(function (response) {
                          if (response) {
                            if (response.data.code === 200) {
                              setDataMergeTable(response.data.data);
                              var data = [];
                              response.data.data.forEach((element) => {
                                data.push(0);
                              });
                              setDataChooseTable(data);
                            }
                          } else {
                            return;
                          }
                        });
                      setModalVisibleMergeTable(true);
                    }}
                    style={{
                      padding: 3,
                      borderRadius: 4,
                      borderColor: Color.buttonColor,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.buttonColor, fontSize: 12}}>
                      G???p b??n
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // setTab(5);
                      Alert.alert(
                        'Hu??? ????n h??ng',
                        'B???n ch???c ch???n mu???n hu??? ????n h??ng?',
                        [
                          {text: 'H???y', onPress: () => {}},
                          {
                            text: '?????ng ??',
                            onPress: async () => {
                              services
                                .cancelOrderOffline(null, item?.id)
                                .then(function (response) {
                                  if (response) {
                                    if (response.data.code === 200) {
                                      handleChangeTab(5);
                                    } else {
                                      Alert.alert(
                                        'Th??ng b??o',
                                        response.data.message,
                                        [{text: '?????ng ??', onPress: () => {}}],
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
                      padding: 3,
                      borderRadius: 4,
                      borderColor: Color.red,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                      paddingHorizontal: 8,
                    }}>
                    <Text style={{color: Color.red, fontSize: 12}}>H???y</Text>
                  </TouchableOpacity>
                </View>
              ) : tab === 3 ? (
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setBookTableId(item?.id);
                      services
                        .getListTableEmpty(null, item?.id)
                        .then(function (response) {
                          if (response) {
                            if (response.data.code === 200) {
                              setDataMergeTable(response.data.data);
                              var data = [];
                              response.data.data.forEach((element) => {
                                data.push(0);
                              });
                              setDataChooseTable(data);
                            }
                          } else {
                            return;
                          }
                        });
                      setModalVisibleChangeTable(true);
                    }}
                    style={{
                      padding: 3,
                      borderRadius: 4,
                      borderColor: Color.buttonColor,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.buttonColor, fontSize: 12}}>
                      ?????i b??n
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setBookTableId(item?.id);
                      services
                        .getListTableEmpty(null, item?.id)
                        .then(function (response) {
                          if (response) {
                            if (response.data.code === 200) {
                              setDataMergeTable(response.data.data);
                              var data = [];
                              response.data.data.forEach((element) => {
                                data.push(0);
                              });
                              setDataChooseTable(data);
                            }
                          } else {
                            return;
                          }
                        });
                      setModalVisibleMergeTable(true);
                    }}
                    style={{
                      padding: 3,
                      borderRadius: 4,
                      borderColor: Color.buttonColor,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.buttonColor, fontSize: 12}}>
                      G???p b??n
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(item);
                      props.navigation.navigate('OrderFoodScreen', {
                        id: item.id,
                      });
                    }}
                    style={{
                      padding: 3,
                      borderRadius: 4,
                      borderColor: Color.main,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.main, fontSize: 12}}>
                      G???i m??n
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
              {tab === 0 && item.status !== 1 && (
                <TouchableOpacity
                  onPress={() => {
                    // onClickDetail(item.id);
                    Alert.alert(
                      'Th??ng b??o!',
                      'B???n x??c nh???n mu???n m??? b??n n??y?',
                      [
                        {text: 'H???y', onPress: () => {}},
                        {
                          text: '?????ng ??',
                          onPress: () => {
                            onResetTable(item.id);
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  }}
                  style={{
                    padding: 3,
                    borderRadius: 4,
                    borderColor: Color.main,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10,
                  }}>
                  <Text style={{color: Color.main, fontSize: 12}}>
                    {tab === 0 ? 'M??? b??n' : null}
                  </Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => {
                  // onClickDetail(item.id);
                  if (tab === 0) {
                    if (item.status === 1) {
                      onClickDetail(item.id);
                    } else {
                      Alert.alert(
                        'Th??ng b??o!',
                        'B??n ???? h???t ch???, vui l??ng ch???n b??n kh??c!',
                        [
                          {
                            text: '?????ng ??',
                          },
                        ],
                        {cancelable: false},
                      );
                    }
                  } else {
                    onClickDetail(item.id);
                  }
                }}
                style={{
                  // height: 19,
                  // width: 60,
                  padding: 3,
                  borderRadius: 4,
                  borderColor: Color.main,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Color.main, fontSize: 12}}>
                  {tab === 0 ? '?????t b??n' : 'Chi ti???t'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTable = ({item, index}) => {
    return (
      <View
        onPress={() => {}}
        style={{
          width: Dimensions.get('window').width * 0.4,
          marginBottom: 15,
        }}>
        <View
          style={{
            width: '85%',
            borderRadius: 8,
            backgroundColor: '#fff',
            alignItems: 'center',
            // marginRight: 10,
            marginTop: 15,
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Image
                source={
                  item.status === 'H???t ch???'
                    ? Images.iconOrderOfflineGrey
                    : Images.iconOrderOfflineYellow
                }
                style={{height: 64, width: 64}}
              />
              <Text style={{color: '#fff', position: 'absolute'}}>
                {item.number_table}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                marginTop: 10,
              }}>
              B??n s??? {item.number_table}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                marginTop: 5,
              }}>
              {item.number_people_min} - {item.number_people_max} ch??? ng???i
            </Text>
            <View
              style={{
                height: 35,
                width: 128,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: '#E0E0E0',
                flexDirection: 'row',
              }}>
              {dataChooseTable[index] === 0 && item.is_merge === 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      var data = [...dataChooseTable];
                      var dataChoose = [...totalTableMerge];
                      dataChoose.push(item.id);
                      data[index] = 1;
                      setTotalTableMerge(dataChoose);
                      setDataChooseTable(data);
                    }}
                    style={{
                      backgroundColor: Color.main,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      padding: 5,
                    }}>
                    <Text style={{fontSize: 11, color: Color.white}}>
                      G???p b??n
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    style={{marginRight: 5}}
                    name={'check-circle'}
                    size={20}
                    color={Color.buttonColor}
                  />
                  <View
                    style={{
                      backgroundColor: Color.grey,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      padding: 5,
                    }}>
                    <Text style={{fontSize: 11, color: Color.white}}>
                      ???? ch???n
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderChangeTable = ({item, index}) => {
    return (
      <View
        onPress={() => {}}
        style={{
          width: Dimensions.get('window').width * 0.4,
          marginBottom: 15,
        }}>
        <View
          style={{
            width: '85%',
            borderRadius: 8,
            backgroundColor: '#fff',
            alignItems: 'center',
            // marginRight: 10,
            marginTop: 15,
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Image
                source={
                  item.status === 'H???t ch???'
                    ? Images.iconOrderOfflineGrey
                    : Images.iconOrderOfflineYellow
                }
                style={{height: 64, width: 64}}
              />
              <Text style={{color: '#fff', position: 'absolute'}}>
                {item.number_table}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                marginTop: 10,
              }}>
              B??n s??? {item.number_table}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                marginTop: 5,
              }}>
              {item.number_people_min} - {item.number_people_max} ch??? ng???i
            </Text>
            <View
              style={{
                height: 35,
                width: 128,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 10,
                borderTopWidth: 1,
                borderTopColor: '#E0E0E0',
                flexDirection: 'row',
              }}>
              {dataChooseTable[index] === 0 && item.is_merge === 0 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      reactotron.log('thai', bookTableId);
                      console.log(item.id);
                      var dataTableChange = {
                        table_store_id: item.id,
                        book_table_id: bookTableId,
                      };
                      Alert.alert(
                        '?????i b??n',
                        'B???n ch???c ch???n mu???n ?????i b??n?',
                        [
                          {text: 'H???y', onPress: () => {}},
                          {
                            text: '?????ng ??',
                            onPress: async () => {
                              services
                                .changeTable(dataTableChange)
                                .then(function (response) {
                                  if (response) {
                                    if (response.data.code === 200) {
                                      Alert.alert(
                                        'Th??ng b??o',
                                        response.data.message,
                                        [
                                          {
                                            text: '?????ng ??',
                                            onPress: () => {
                                              setModalVisibleChangeTable(false);
                                              props.navigation.reset({
                                                routes: [
                                                  {
                                                    name: 'Utilities',
                                                  },
                                                ],
                                              });
                                            },
                                          },
                                        ],
                                        {cancelable: false},
                                      );
                                    } else {
                                      Alert.alert(
                                        'Th??ng b??o',
                                        response.data.message,
                                        [{text: '?????ng ??', onPress: () => {}}],
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
                      backgroundColor: Color.main,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      padding: 5,
                    }}>
                    <Text style={{fontSize: 11, color: Color.white}}>
                      ?????i b??n
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <MaterialIcons
                    style={{marginRight: 5}}
                    name={'check-circle'}
                    size={20}
                    color={Color.buttonColor}
                  />
                  <View
                    style={{
                      backgroundColor: Color.grey,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 4,
                      padding: 5,
                    }}>
                    <Text style={{fontSize: 11, color: Color.white}}>
                      ???? g???p
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const onResetTable = (id) => {
    services.openTable(null, id).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          Alert.alert(
            'Th??ng b??o!',
            response.data.message,
            [
              {
                text: '?????ng ??',
                onPress: () => {
                  handleChangeTab(0);
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            'Th??ng b??o!',
            response.data.message,
            [
              {
                text: '?????ng ??',
                onPress: () => {},
              },
            ],
            {cancelable: false},
          );
        }
      } else {
        return;
      }
    });
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
            <ScrollView
              nestedScrollEnabled={true}
              contentContainerStyle={{
                flex: 1,
                // backgroundColor: 'pink',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
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
                    <ScrollView
                      showsVerticalScrollIndicator={false}
                      nestedScrollEnabled={true}>
                      {dataListStore?.data?.map((item, index) => {
                        return item.status === 1 ? (
                          <View style={{}} key={index}>
                            <TouchableOpacity
                              onPress={() => {
                                setStoreName(item.name);
                                storage.setItem('dataStore', item);
                                props.navigation.reset({
                                  // index: 0,
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
                        ) : null;
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
                        <Text style={[styles.text, {color: '#fff'}]}>????ng</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Modal>
                {/* Merge Table */}
                <Modal
                  onBackdropPress={() => setModalVisibleMergeTable(false)}
                  style={{alignItems: 'center', justifyContent: 'center'}}
                  isVisible={modalVisibleMergeTable}>
                  <View
                    style={{
                      height: '60%',
                      width: '100%',
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      backgroundColor: '#E8E8E8',
                    }}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}
                      style={{
                        width: Dimensions.get('window').width - 10,
                        marginTop: 5,
                        marginLeft: 25,
                        borderRadius: 5,
                        marginBottom: 10,
                        flex: 1,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                      data={dataMergeTable}
                      renderItem={renderTable}
                      keyExtractor={(item, index) => index.toString()}
                      // onEndReached={handleLoadMore}
                      // onEndReachedThreshold={0}
                      // ListFooterComponent={renderFooter}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        Alert.alert(
                          'X??c nh???n g???p b??n',
                          'B???n ch???c ch???n mu???n g???p nh???ng b??n n??y?',
                          [
                            {text: 'H???y', onPress: () => {}},
                            {
                              text: '?????ng ??',
                              onPress: async () => {
                                services
                                  .mergeTableWithOwner({
                                    book_table_id: bookTableId,
                                    table_store_id: totalTableMerge,
                                  })
                                  .then(function (response) {
                                    if (response) {
                                      if (response.data.code === 200) {
                                        Alert.alert(
                                          'Th??ng b??o',
                                          response.data.message,
                                          [
                                            {
                                              text: '?????ng ??',
                                              onPress: () => {
                                                setDataMergeTable([]);
                                                setBookTableId(null);
                                                setModalVisibleMergeTable(
                                                  false,
                                                );
                                              },
                                            },
                                          ],
                                          {cancelable: false},
                                        );
                                      } else {
                                        Alert.alert(
                                          'Th??ng b??o',
                                          'G???p b??n th???t b???i!',
                                          [{text: '?????ng ??', onPress: () => {}}],
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
                        height: 45,
                        width: '100%',
                        backgroundColor: Color.main,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                      }}>
                      <Text style={{fontSize: 15, color: Color.white}}>
                        X??c nh???n
                      </Text>
                    </TouchableOpacity>
                  </View>
                </Modal>
                {/* Change Table */}
                <Modal
                  onBackdropPress={() => setModalVisibleChangeTable(false)}
                  style={{alignItems: 'center', justifyContent: 'center'}}
                  isVisible={modalVisibleChangeTable}>
                  <View
                    style={{
                      height: '60%',
                      width: '100%',
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      backgroundColor: '#E8E8E8',
                    }}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      contentContainerStyle={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}
                      style={{
                        width: Dimensions.get('window').width - 10,
                        marginTop: 5,
                        marginLeft: 25,
                        borderRadius: 5,
                        marginBottom: 10,
                        flex: 1,
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                      data={dataMergeTable}
                      renderItem={renderChangeTable}
                      keyExtractor={(item, index) => index.toString()}
                      // onEndReached={handleLoadMore}
                      // onEndReachedThreshold={0}
                      // ListFooterComponent={renderFooter}
                    />
                    {/* <TouchableOpacity
                      onPress={() => {
                        // Alert.alert(
                        //   'X??c nh???n g???p b??n',
                        //   'B???n ch???c ch???n mu???n g???p nh???ng b??n n??y?',
                        //   [
                        //     {text: 'H???y', onPress: () => {}},
                        //     {
                        //       text: '?????ng ??',
                        //       onPress: async () => {
                        //         services
                        //           .mergeTableWithOwner({
                        //             book_table_id: bookTableId,
                        //             table_store_id: totalTableMerge,
                        //           })
                        //           .then(function (response) {
                        //             if (response) {
                        //               if (response.data.code === 200) {
                        //                 Alert.alert(
                        //                   'Th??ng b??o',
                        //                   response.data.message,
                        //                   [
                        //                     {
                        //                       text: '?????ng ??',
                        //                       onPress: () => {
                        //                         setDataMergeTable([]);
                        //                         setBookTableId(null);
                        //                         setModalVisibleMergeTable(
                        //                           false,
                        //                         );
                        //                       },
                        //                     },
                        //                   ],
                        //                   {cancelable: false},
                        //                 );
                        //               } else {
                        //                 Alert.alert(
                        //                   'Th??ng b??o',
                        //                   'G???p b??n th???t b???i!',
                        //                   [{text: '?????ng ??', onPress: () => {}}],
                        //                   {cancelable: false},
                        //                 );
                        //               }
                        //             } else {
                        //               return;
                        //             }
                        //           });
                        //       },
                        //     },
                        //   ],
                        //   {cancelable: false},
                        // );
                      }}
                      style={{
                        height: 45,
                        width: '100%',
                        backgroundColor: Color.main,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                      }}>
                      <Text style={{fontSize: 15, color: Color.white}}>
                        X??c nh???n
                      </Text>
                    </TouchableOpacity> */}
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
                        width: Dimensions.get('window').width - 20,
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
                  {!(tab == 0) && (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        children="L???c theo th???i gian"
                        style={{fontSize: 15, fontWeight: '500'}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          setIsVisibleTime(true);
                        }}
                        style={{flexDirection: 'row'}}>
                        <Text children={date1 || '212-111'} />
                        <Text children=" - " />
                        <Text children={date2 || '212-111'} />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 5,
                      // justifyContent: 'space-between',
                      width: Dimensions.get('window').width - 20,
                      flexWrap: 'wrap',
                    }}>
                    {dataTab.map((item, index) => {
                      return index === 1 ? null : (
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            // setTab(index);
                            handleChangeTab(index);
                          }}
                          // key={index}
                          style={{
                            height: 38,
                            // width: '25%',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: tab === index ? Color.main : '#fff',
                            borderRadius: 6,
                            padding: 10,
                            margin: 5,
                          }}>
                          <Text style={{fontSize: 11}}>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  <FlatList
                    nestedScrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    style={{
                      marginTop: 10,
                      marginBottom: 40,
                    }}
                    data={dataOrder}
                    renderItem={renderProduct}
                    keyExtractor={(item, index) => index.toString()}
                    // extraData={dataOrder}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
                    // ListFooterComponent={renderFooter}
                  />
                </View>
              </View>
            </ScrollView>
            <DateTimePickerModal
              headerTextIOS="Ch???n ng??y b???t ?????u"
              // minimumDate={new Date(Date.now())}
              maximumDate={new Date(Date.now())}
              isVisible={isVisibleTime}
              mode="date"
              onConfirm={(date) => {
                console.log(date);
                setMinimumDate(date);
                setDate1(moment(date).utcOffset(7).format('DD/MM/YYYY'));
                setTimeStamp1(date);
                setIsVisibleTime(false);
                setTimeout(() => {
                  setIsVisibleTime2(true);
                }, 400);
                // setIsVisibleTime2(true)
              }}
              onCancel={() => setIsVisibleTime(false)}
            />
            <DateTimePickerModal
              // ref = {refDateEnd}
              headerTextIOS="Ch???n ng??y k???t th??c"
              minimumDate={new Date(minimumDate)}
              maximumDate={new Date(Date.now())}
              isVisible={isVisibleTime2}
              mode="date"
              onConfirm={(date) => {
                setDate2(moment(date).utcOffset(7).format('DD/MM/YYYY'));
                setIsVisibleTime2(false);
                setTimeStamp2(date);
                setSelectTime(true);
                handleChangeTab(2);
              }}
              onCancel={() => {
                setIsVisibleTime2(false);
              }}
            />
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
