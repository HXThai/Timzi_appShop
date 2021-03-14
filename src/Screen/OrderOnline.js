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
import {connect} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import * as actionsGetListStore from '../Redux/Action/orderOnlineAction';
import Modal from 'react-native-modal';

const Home = (props) => {
  const [tab, setTab] = useState(props?.route?.params?.tab ? 2 : 0);
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Mới'},
    {id: 1, name: 'Đã nhận'},
    {id: 2, name: 'Đã lấy'},
    {id: 3, name: 'Hoàn thành'},
    {id: 4, name: 'Đã hủy'},
  ]);

  const [dataOrder, setDataOrder] = useState([
    {
      minute: 30,
      name: 'Trần Văn Tét',
      code: 'TZ001 - 12122021',
      distance: 2.5,
      number: 6,
      left: 5,
    },
    {
      minute: 30,
      name: 'Trần Văn Tét',
      code: 'TZ001 - 12122021',
      distance: 2.5,
      number: 6,
      left: 5,
    },
    {
      minute: 30,
      name: 'Trần Văn Tét',
      code: 'TZ001 - 12122021',
      distance: 2.5,
      number: 6,
      left: 5,
    },
  ]);

  const [dataListStore, setDataListStore] = useState([]);

  const [storeName, setStoreName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  // console.log(props?.route?.params?.tab);

  const onClickDetail = () => {
    if (tab === 0) {
      props.navigation.navigate('NewOrderOnlineDetailScreen');
    } else if (tab === 1) {
      props.navigation.navigate('OrderOnlineRecievedDetailScreen');
    } else if (tab === 2) {
      props.navigation.navigate('OrderOnlineHasTakenDetailScreen');
    } else if (tab === 3) {
      props.navigation.navigate('OrderOnlineCancelledDetailScreen');
    }
  };

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
    // console.log(props.data.responseListStore?.code);
    setDataListStore(props.data.responseListStore);
  }, [props.data.responseListStore]);

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
                    height: '60%',
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
                        <View style={{padding: 10}}>
                          <TouchableOpacity
                            onPress={() => {
                              setStoreName(item.name);
                              setModalVisible(false);
                            }}
                            style={{
                              height: 45,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderBottomWidth: 1,
                              borderColor: Color.main,
                              width: Dimensions.get('window').width * 0.8,
                            }}
                            key={index}>
                            <Text style={{fontWeight: '700', fontSize: 15}}>
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
              <ScrollView>
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
                        placeholder="Tìm cửa hàng?"
                        placeholderTextColor="gray"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
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
                          setTab(index);
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
                        <Text style={{fontSize: 12}}>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{marginTop: 10}}>
                  {dataOrder.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onClickDetail()}
                        key={index}
                        style={{
                          height: 100,
                          backgroundColor: '#fff',
                          borderRadius: 8,
                          marginTop: 10,
                          flexDirection: 'row',
                          padding: 8,
                        }}>
                        <View
                          style={{
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                          }}>
                          {/* <View
                            style={{
                              height: 19,
                              width: 56,
                              borderRadius: 6,
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
                              {item.minute}
                              {' phút'}
                            </Text>
                          </View> */}
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
                              source={
                                tab === 4
                                  ? Images.iconPrintRed
                                  : Images.iconPrint
                              }
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
                                {item.name}
                              </Text>
                            </View>
                            <View>
                              <Text style={{fontSize: 12, color: '#828282'}}>
                                {'Khoảng cách '}
                                {item.distance}
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
                                {item.code}
                              </Text>
                            </View>
                            <View>
                              <Text style={{fontSize: 12, color: '#828282'}}>
                                {'Nhận từ khách: '}
                                {item.number}
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
                              }}>
                              {/* <Image
                                source={Images.iconBike}
                                style={{height: 10, width: 15}}
                              /> */}
                              <Text
                                style={{
                                  fontWeight: '600',
                                  fontSize: 13,
                                  marginLeft: 5,
                                  color: null,
                                }}>
                                {'Còn lại: '}
                                {item.left}
                                {' phút'}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignSelf: 'flex-end',
                              }}>
                              {tab === 0 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    // props.navigation.navigate(
                                    //   'OrderOnlineDetailScreen',
                                    // );
                                    setTab(1);
                                  }}
                                  style={{
                                    height: 19,
                                    width: 56,
                                    borderRadius: 6,
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
                              ) : tab === 1 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    // props.navigation.navigate(
                                    //   'OrderOnlineDetailScreen',
                                    // );
                                    setTab(2);
                                  }}
                                  style={{
                                    height: 19,
                                    width: 75,
                                    borderRadius: 6,
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
                                  onClickDetail();
                                }}
                                style={{
                                  height: 19,
                                  width: 56,
                                  borderRadius: 6,
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
