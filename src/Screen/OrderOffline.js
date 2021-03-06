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

import {useFocusEffect} from '@react-navigation/native';

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

  const [dataOrder, setDataOrder] = useState([
    {
      status: 'Chờ xử lý',
      name: 'Bàn số 1',
      code: 'TZ001 - 12122021',
      location: 'Tầng 1',
      service: 'Tất cả',
      numberCustommer: '2 - 8',
      numberTable: 1,
    },
    {
      status: 'Còn chỗ',
      name: 'Bàn số 1',
      code: 'TZ001 - 12122021',
      location: 'Tầng 1',
      service: 'Tất cả',
      numberCustommer: '2 - 8',
      numberTable: 1,
    },
    {
      status: 'Hết chỗ',
      name: 'Bàn số 1',
      code: 'TZ001 - 12122021',
      location: 'Tầng 1',
      service: 'Tất cả',
      numberCustommer: '2 - 8',
      numberTable: 1,
    },
  ]);

  const onClickDetail = () => {
    if (tab === 1) {
      props.navigation.navigate('NewOrderOfflineDetailScreen');
    } else if (tab === 2) {
      props.navigation.navigate('OrderOfflineReceivedDetailScreen');
    } else if (tab === 3) {
      props.navigation.navigate('OrderOfflineServingDetailScreen');
    } else if (tab === 4) {
      props.navigation.navigate('OrderOfflineServedDetailScreen');
    } else if (tab === 5) {
      props.navigation.navigate('OrderOfflineCancelledDetailScreen');
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      // console.log('thai', props?.route?.params?.tab);
      if (props?.route?.params?.tab) {
        setTab(4);
      }
    }, [props?.route?.params?.tab]),
  );

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
              <ScrollView>
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
                          fontFamily: 'Nunito',
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
                    // justifyContent: 'space-between',
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
                          height: 32,
                          // width: '25%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderColor: tab === index ? Color.main : '#fff',
                          borderRadius: 6,
                          padding: 10,
                          margin: 5,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <View style={{marginTop: 10}}>
                  {dataOrder.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          onClickDetail();
                        }}
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
                          <View
                            style={{
                              height: 19,
                              width: 56,
                              borderRadius: 6,
                              borderColor:
                                tab === 0
                                  ? item.status === 'Còn chỗ'
                                    ? Color.buttonColor
                                    : item.status === 'Hết chỗ'
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
                                    ? item.status === 'Còn chỗ'
                                      ? Color.buttonColor
                                      : item.status === 'Hết chỗ'
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
                                ? item.status
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
                              height: 56,
                              width: 56,
                              borderRadius: 6,
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderColor:
                                tab === 0
                                  ? item.status === 'Còn chỗ'
                                    ? Color.buttonColor
                                    : item.status === 'Hết chỗ'
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
                                  ? item.status === 'Còn chỗ'
                                    ? Images.iconOrderOfflineYellow
                                    : item.status === 'Hết chỗ'
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
                                {item.numberTable}
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
                                {item.name}
                              </Text>
                            </View>
                            <View>
                              <Text style={{fontSize: 12, color: '#828282'}}>
                                {'Vị trí: '}
                                {item.location}
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
                                {item.code}
                              </Text>
                            </View>
                            <View>
                              <Text style={{fontSize: 12, color: '#828282'}}>
                                {'Dịch vụ: '}
                                {item.service}
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
                                {'Số khách: '}
                                {item.numberCustommer}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              {tab === 1 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    // props.navigation.navigate(
                                    //   'OrderOnlineDetailScreen',
                                    // );
                                    setTab(2);
                                  }}
                                  style={{
                                    height: 19,
                                    width: 56,
                                    borderRadius: 4,
                                    borderColor: Color.main,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 5,
                                  }}>
                                  <Text
                                    style={{color: Color.main, fontSize: 12}}>
                                    Xác nhận
                                  </Text>
                                </TouchableOpacity>
                              ) : tab === 2 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    // props.navigation.navigate(
                                    //   'OrderOnlineDetailScreen',
                                    // );
                                    setTab(3);
                                  }}
                                  style={{
                                    height: 19,
                                    width: 56,
                                    borderRadius: 4,
                                    borderColor: Color.main,
                                    borderWidth: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 5,
                                  }}>
                                  <Text
                                    style={{color: Color.main, fontSize: 12}}>
                                    Phục vụ
                                  </Text>
                                </TouchableOpacity>
                              ) : tab === 3 ? (
                                <TouchableOpacity
                                  onPress={() => {
                                    // props.navigation.navigate(
                                    //   'OrderOnlineDetailScreen',
                                    // );
                                    setTab(4);
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
                                  <Text
                                    style={{color: Color.main, fontSize: 12}}>
                                    Thanh toán
                                  </Text>
                                </TouchableOpacity>
                              ) : null}
                              <TouchableOpacity
                                onPress={() => {
                                  // props.navigation.navigate(
                                  //   'OrderOnlineDetailScreen',
                                  // );
                                  onClickDetail();
                                }}
                                style={{
                                  height: 19,
                                  width: 56,
                                  borderRadius: 4,
                                  borderColor: Color.main,
                                  borderWidth: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Text style={{color: Color.main, fontSize: 12}}>
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

export default Home;
