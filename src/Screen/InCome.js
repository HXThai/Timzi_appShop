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
import * as actionsGetListStore from '../Redux/Action/orderOnlineAction';
import {connect} from 'react-redux';

const Home = (props) => {
  const [tab, setTab] = useState(0);
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Ngày'},
    {id: 1, name: 'Tuần'},
    {id: 2, name: 'Tháng'},
  ]);
  const [airfares, setAirfares] = useState([
    {date: '12 - 12', price: 'Thứ 2'},
    {date: '12 - 12', price: 'Thứ 3'},
    {date: '12 - 12', price: 'Thứ 4'},
    {date: '12 - 12', price: 'Thứ 5'},
    {date: '12 - 12', price: 'Thứ 6'},
  ]);
  const [isCheckAirfares, setIsCheckAirfares] = useState(2);
  const [dataRestaurant, setDataRestaurant] = useState([
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'TZ1000012200',
      distance: 2.5,
      money: 69000,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'TZ1000012200',
      distance: 2.5,
      money: 69000,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'TZ1000012200',
      distance: 2.5,
      money: 69000,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'TZ1000012200',
      distance: 2.5,
      money: 69000,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'TZ1000012200',
      distance: 2.5,
      money: 69000,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'TZ1000012200',
      distance: 2.5,
      money: 69000,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'TZ1000012200',
      distance: 2.5,
      money: 69000,
    },
  ]);

  const [dataListStore, setDataListStore] = useState([]);

  const [storeName, setStoreName] = useState('');

  const [storeId, setStoreId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // console.log(props.data.responseListStore?.code);
    dataStore = storage.getItem('dataStore').then((data) => {
      // console.log(data);
      if (data) {
        setStoreName(data.name);
        setStoreId(data.id);
      } else {
        setStoreName(props.data.responseListStore?.data[0]?.name);
        setStoreId(props.data.responseListStore?.data[0]?.id);
      }
    });
    setDataListStore(props.data.responseListStore);

    // if (dataStore) {
    //   setStoreName(dataStore);
    // } else {
    //   setStoreName(props.data.responseListStore?.data[0]?.name);
    // }
  }, [props.data.responseListStore]);

  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    storage.getItem('role_id').then((data) => {
      // console.log(data);
      if (data) {
        console.log('role', data);
        setRoleId(data);
      } else {
      }
    });
  }, []);

  return (
    // <View style={{backgroundColor: 'green', flex: 1}}>
    //   <SafeAreaView style={{flex: 1}}>
    //     <View style={styles.container}></View>
    //   </SafeAreaView>
    // </View>
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
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
              <ScrollView showsVerticalScrollIndicator={false}>
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
                    flexDirection: 'row',
                    marginTop: 20,
                    justifyContent: 'space-between',
                    width: '100%',
                    flexWrap: 'wrap',
                  }}>
                  {dataTab.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setTab(index);
                        }}
                        // key={index}
                        style={{
                          height: 35,
                          width: '30%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: tab === index ? Color.main : '#fff',
                          borderRadius: 6,
                          padding: 5,
                          margin: 5,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    // justifyContent: 'space-between',
                    width: '100%',
                    flexWrap: 'wrap',
                    borderBottomWidth: 5,
                    borderColor: Color.main,
                  }}>
                  {airfares.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setIsCheckAirfares(index)}
                        key={index}
                        style={{
                          borderTopLeftRadius: 8,
                          borderTopRightRadius: 8,
                          width: '20%',
                          height: 60,
                          flexDirection: 'column',
                          justifyContent: 'space-evenly',
                          alignItems: 'center',
                          backgroundColor:
                            isCheckAirfares === index
                              ? Color.main
                              : Color.background,
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '400',
                              color:
                                isCheckAirfares === index ? 'white' : 'black',
                            }}>
                            {item.date}
                          </Text>
                        </View>
                        <View>
                          <Text
                            style={{
                              fontSize: 15,
                              fontWeight: '500',
                              color:
                                isCheckAirfares === index ? 'white' : 'black',
                            }}>
                            {item.price}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View
                  style={{
                    padding: 10,
                    marginTop: 15,
                    backgroundColor: '#fff',
                    borderLeftWidth: 3,
                    borderColor: Color.main,
                    borderRadius: 8,
                  }}>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}>
                      <Text style={{fontSize: 15, fontWeight: '600'}}>
                        Tổng thu nhập
                      </Text>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: Color.main,
                        }}>
                        {styles.dynamicSort(1320000)}
                        {'đ '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text style={{fontSize: 13, fontWeight: '400'}}>
                        Tiền món ăn đặt online
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '400',
                          color: 'black',
                        }}>
                        {styles.dynamicSort(1220000)}
                        {'đ '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text style={{fontSize: 13, fontWeight: '400'}}>
                        Tiền món ăn tại quán
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '400',
                          color: 'black',
                        }}>
                        {styles.dynamicSort(1220000)}
                        {'đ '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text style={{fontSize: 13, fontWeight: '400'}}>
                        Tiền phục vụ
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '400',
                          color: 'black',
                        }}>
                        {styles.dynamicSort(200000)}
                        {'đ '}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 10,
                      }}>
                      <Text style={{fontSize: 13, fontWeight: '400'}}>
                        Tiền ưu đãi Timzi
                      </Text>
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: '400',
                          color: 'black',
                        }}>
                        {styles.dynamicSort(200000)}
                        {' đ'}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{marginTop: 15}}>
                  <Text style={{fontWeight: '600', fontSize: 15}}>
                    Đơn hàng (5)
                  </Text>
                </View>
                <View style={{marginTop: 15, marginBottom: 50}}>
                  {dataRestaurant.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          marginBottom: 10,
                          backgroundColor: '#fff',
                          borderRadius: 8,
                        }}>
                        <Image
                          source={item.image}
                          style={{width: 98, height: 96}}
                        />
                        <View
                          style={{
                            padding: 8,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            // height: 96,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <MaterialIcons
                              name={'check-circle'}
                              size={20}
                              color={Color.buttonColor}
                            />
                            <Text
                              style={{
                                fontSize: 13,
                                fontWeight: '600',
                                marginLeft: 5,
                              }}>
                              {item.name}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <MaterialIcons
                              name={'location-on'}
                              size={18}
                              color={'black'}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '400',
                                marginLeft: 5,
                              }}>
                              Mã đơn hàng: {item.code}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: Dimensions.get('window').width - 136,
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                padding: 3,
                                borderColor: Color.main,
                                borderWidth: 1,
                                borderRadius: 4,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 12, fontWeight: '400'}}>
                                Hoàn thành
                              </Text>
                            </View>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '400',
                                marginLeft: 5,
                              }}>
                              {item.distance} km
                            </Text>
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '700',
                                marginLeft: 5,
                                color: Color.main,
                              }}>
                              Thu: {styles.dynamicSort(200000)} đ
                            </Text>
                          </View>
                        </View>
                      </View>
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetListStore: (params) => {
    dispatch(actionsGetListStore.getListStore(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
