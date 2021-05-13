import React, {useEffect, useState, useCallback} from 'react';
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

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const [tab, setTab] = useState(0);
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Danh sách bàn'},
    {id: 1, name: 'Mới'},
    {id: 2, name: 'Đã nhận'},
    {id: 3, name: 'Đang phục vụ'},
    {id: 4, name: 'Đã thanh toán'},
    {id: 5, name: 'Đã hủy'},
  ]);

  const [dataOrder, setDataOrder] = useState([]);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [modalVisibleMergeTable, setModalVisibleMergeTable] = useState(false);

  const [page, setPage] = useState(1);

  const [dataMergeTable, setDataMergeTable] = useState([]);

  const [dataChooseTable, setDataChooseTable] = useState([]);

  const [totalTableMerge, setTotalTableMerge] = useState([]);

  const [bookTableId, setBookTableId] = useState([]);

  const handleLoadMore = () => {
    console.log('thai meo');
    dataOrder.length >= 12 ? setPage(page + 1) : null;
  };

  useEffect(() => {
    getData();
    return () => {};
  }, [page]);

  const getData = () => {
    if (tab === 0) {
      services
        .getListTableOrderOffline(null, storeId, page)
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder((prev) => [...prev, ...response?.data?.data?.data]);
              setModalVisibleLoading(false);
            }
          } else {
            return;
          }
        });
    } else {
      services
        .getListOrderOffline(null, storeId, tab, page)
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataOrder((prev) => [...prev, ...response?.data?.data?.data]);
              setModalVisibleLoading(false);
            }
          } else {
            return;
          }
        });
    }
  };

  const onClickDetail = (id) => {
    reactotron.log('tab', tab);
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
    React.useCallback(() => {
      if (props?.route?.params?.tab) {
        setTab(4);
      }
    }, [props?.route?.params?.tab]),
  );

  const [dataListStore, setDataListStore] = useState([]);

  const [storeName, setStoreName] = useState('');

  const [storeId, setStoreId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
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
        .getListOrderOffline(null, storeId, tab, 1)
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
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreName(data.name);
        setStoreId(data.id);
        services
          .getListTableOrderOffline(null, data.id, 1)
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
        props.data.responseListStore?.data.forEach((element, index) => {
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
                  }
                } else {
                  return;
                }
              });
          }
        });
      }
    });
    setDataListStore(props.data.responseListStore);
  }, [props.data.responseListStore]);

  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('role_id').then((data) => {
      if (data) {
        setRoleId(data);
      } else {
      }
    });
  }, []);

  const handleChangeTab = (index) => {
    setDataOrder([]);
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
            }
          } else {
            return;
          }
        });
    } else {
      services
        .getListOrderOffline(null, storeId, index, 1)
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
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onClickDetail(item.id);
          reactotron.log('day ne');
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
                  ? 'Còn chỗ'
                  : 'Hết chỗ'
                : tab === 1
                ? 'Chờ duyệt'
                : tab === 2
                ? 'Đã nhận'
                : tab === 3
                ? 'Đang pv'
                : tab === 4
                ? 'Đã TT'
                : 'Đã hủy'}
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
                Bàn số{' '}
                {tab === 0
                  ? item?.number_table
                  : item?.table_store?.number_table}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 12, color: '#828282'}}>
                {'Vị trí: Tầng '}
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
                {item?.code}
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
                {'Số khách: '}
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
                        'Xác nhận đơn hàng',
                        'Bạn chắc chắn muốn xác nhận đơn hàng?',
                        [
                          {text: 'Hủy', onPress: () => {}},
                          {
                            text: 'Đồng ý',
                            onPress: async () => {
                              services
                                .confirmOrderOffline(null, item?.id)
                                .then(function (response) {
                                  if (response) {
                                    if (response.data.code === 200) {
                                      handleChangeTab(2);
                                    } else {
                                      Alert.alert(
                                        'Thông báo',
                                        response.data.message,
                                        [{text: 'Đồng ý', onPress: () => {}}],
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
                      Xác nhận
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      // setTab(5);
                      Alert.alert(
                        'Huỷ đơn hàng',
                        'Bạn chắc chắn muốn huỷ đơn hàng?',
                        [
                          {text: 'Hủy', onPress: () => {}},
                          {
                            text: 'Đồng ý',
                            onPress: async () => {
                              services
                                .cancelOrderOffline(null, item?.id)
                                .then(function (response) {
                                  if (response) {
                                    if (response.data.code === 200) {
                                      handleChangeTab(5);
                                    } else {
                                      Alert.alert(
                                        'Thông báo',
                                        response.data.message,
                                        [{text: 'Đồng ý', onPress: () => {}}],
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
                      width: 40,
                      borderRadius: 4,
                      borderColor: Color.red,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.red, fontSize: 12}}>Hủy</Text>
                  </TouchableOpacity>
                </View>
              ) : tab === 2 && item.is_shop_book === 1 ? (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      setBookTableId(item?.table_store?.id);
                      services
                        .getListTableEmpty(null, item?.table_store?.id)
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
                      height: 19,
                      width: 65,
                      borderRadius: 4,
                      borderColor: Color.buttonColor,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.buttonColor, fontSize: 12}}>
                      Gộp bàn
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('OrderFoodScreen', {
                        id: item.id,
                      });
                    }}
                    style={{
                      height: 19,
                      width: 65,
                      borderRadius: 4,
                      borderColor: Color.main,
                      borderWidth: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: 5,
                    }}>
                    <Text style={{color: Color.main, fontSize: 12}}>
                      Gọi món
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : tab === 3 ? (
                <TouchableOpacity
                  onPress={() => {
                    // setTab(4);
                    Alert.alert(
                      'Xác nhận thanh toán',
                      'Bạn chắc chắn muốn thanh toán bàn này?',
                      [
                        {text: 'Hủy', onPress: () => {}},
                        {
                          text: 'Đồng ý',
                          onPress: async () => {
                            services
                              .confirmPaymentBookfood(null, item?.id)
                              .then(function (response) {
                                if (response) {
                                  if (response.data.code === 200) {
                                    handleChangeTab(4);
                                  } else {
                                    Alert.alert(
                                      'Thông báo',
                                      response.data.message,
                                      [{text: 'Đồng ý', onPress: () => {}}],
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
                    width: 70,
                    borderRadius: 4,
                    borderColor: Color.main,
                    borderWidth: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 5,
                  }}>
                  <Text style={{color: Color.main, fontSize: 12}}>
                    Thanh toán
                  </Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                onPress={() => {
                  onClickDetail(item.id);
                }}
                style={{
                  height: 19,
                  width: 60,
                  borderRadius: 4,
                  borderColor: Color.main,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Color.main, fontSize: 12}}>Chi tiết</Text>
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
                  item.status === 'Hết chỗ'
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
              Bàn số {item.number_table}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                marginTop: 5,
              }}>
              {item.number_people_min} - {item.number_people_max} chỗ ngồi
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
                  {/* <MaterialIcons
                    style={{marginRight: 5}}
                    name={'check-circle'}
                    size={20}
                    color={Color.buttonColor}
                  /> */}
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
                      Gộp bàn
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
                      Đã chọn
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
                        <Text style={[styles.text, {color: '#fff'}]}>Đóng</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Modal>
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
                          'Xác nhận gộp bàn',
                          'Bạn chắc chắn muốn gộp những bàn này?',
                          [
                            {text: 'Hủy', onPress: () => {}},
                            {
                              text: 'Đồng ý',
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
                                          'Thông báo',
                                          response.data.message,
                                          [
                                            {
                                              text: 'Đồng ý',
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
                                          'Thông báo',
                                          'Gộp bàn thất bại!',
                                          [{text: 'Đồng ý', onPress: () => {}}],
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
                        Xác nhận
                      </Text>
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
                      width: '100%',
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
                      // justifyContent: 'space-between',
                      width: '100%',
                      flexWrap: 'wrap',
                    }}>
                    {dataTab.map((item, index) => {
                      return (
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
                    // renderItem={({item}) =><TouchableOpacity></TouchableOpacity> <Text>{item.user_name}</Text>}
                    keyExtractor={(item, index) => index.toString()}
                    // extraData={dataOrder}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
                    // ListFooterComponent={renderFooter}
                  />
                </View>
              </View>
            </ScrollView>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetListStore: (params) => {
    dispatch(actionsGetListStore.getListStore(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
