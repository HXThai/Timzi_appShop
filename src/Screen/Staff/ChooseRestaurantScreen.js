import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
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
import staffService from '../../Redux/Service/staffService';

const LoginScreen = (props) => {
  const [dataRestaurant, setDataRestaurant] = useState(null);

  const [tab, setTab] = useState(0);
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Chờ kết nối'},
    {id: 1, name: 'Đã kết nối'},
    {id: 2, name: 'Tạm dừng'},
  ]);

  const getData = () => {
    staffService.storeStaffChoose(null, tab).then(function (response) {
      // console.log(response);
      if (response) {
        // console.log('thai mai', response);
        if (response.data.code === 200) {
          setDataRestaurant(response?.data?.data);
          // setProvince(response?.data?.data[0].name);
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDeleteStore = (id) => {
    Alert.alert(
      'Bỏ chọn cửa hàng!',
      'Bạn có chắc bỏ chọn cửa hàng này?',
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            staffService.deleteChooseStore(null, id).then(function (response) {
              // console.log(response);
              if (response) {
                // console.log('thai mai', response);
                if (response.data.code === 200) {
                  Alert.alert(
                    'Thông báo!',
                    'Bỏ chọn cửa hàng thành công!',
                    [
                      {
                        text: 'Đồng ý',
                        onPress: () => {
                          props.navigation.reset({
                            index: 0,
                            routes: [
                              {
                                name: 'ChooseRestaurantScreen',
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
                    'Thông báo!',
                    response?.data?.message,
                    [
                      {
                        text: 'Đồng ý',
                      },
                    ],
                    {cancelable: false},
                  );
                }
              } else {
                Alert.alert(
                  'Thông báo!',
                  'Bỏ chọn cửa hàng thất bại!',
                  [
                    {
                      text: 'Đồng ý',
                      onPress: () => {},
                    },
                  ],
                  {cancelable: false},
                );
                return;
              }
            });
          },
        },
        {
          text: 'Hủy',
          onPress: () => {},
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
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  // marginTop: 20,
                  justifyContent: 'space-between',
                  width: '100%',
                  // backgroundColor: 'red',
                  flexWrap: 'wrap',
                }}>
                {dataTab.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setTab(index);
                        staffService
                          .storeStaffChoose(null, index)
                          .then(function (response) {
                            // console.log(response);
                            if (response) {
                              // console.log('thai mai', response?.data?.data);
                              if (response.data.code === 200) {
                                // setProvince(response?.data?.data[0].name);
                                setDataRestaurant(response?.data?.data);
                              }
                            } else {
                              return;
                            }
                          });
                      }}
                      // key={index}
                      style={{
                        height: 32,
                        width: Dimensions.get('window').width * 0.25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: tab === index ? Color.main : '#fff',
                        borderRadius: 6,
                        padding: 10,
                        margin: 5,
                      }}>
                      <Text style={{fontSize: 13}}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {dataRestaurant === null ? (
                <View></View>
              ) : (
                <View style={{marginTop: 10, marginBottom: 5}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginBottom: 10,
                      backgroundColor: '#fff',
                      borderRadius: 8,
                    }}>
                    <Image
                      source={{uri: dataRestaurant?.image}}
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
                          justifyContent: 'space-between',
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
                            {dataRestaurant?.name}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => {
                            handleDeleteStore(dataRestaurant.id);
                          }}>
                          <MaterialIcons
                            name={'clear'}
                            size={26}
                            color={Color.main}
                          />
                        </TouchableOpacity>
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
                          {dataRestaurant?.address}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: Dimensions.get('window').width - 136,
                          // justifyContent: 'space-between',
                        }}>
                        <MaterialIcons
                          name={'star'}
                          size={18}
                          color={
                            dataRestaurant?.star > 0
                              ? Color.buttonColor
                              : '#E0E0E0'
                          }
                        />
                        <MaterialIcons
                          name={'star'}
                          size={18}
                          color={
                            dataRestaurant?.star > 1
                              ? Color.buttonColor
                              : '#E0E0E0'
                          }
                        />
                        <MaterialIcons
                          name={'star'}
                          size={18}
                          color={
                            dataRestaurant?.star > 2
                              ? Color.buttonColor
                              : '#E0E0E0'
                          }
                        />
                        <MaterialIcons
                          name={'star'}
                          size={18}
                          color={
                            dataRestaurant?.star > 3
                              ? Color.buttonColor
                              : '#E0E0E0'
                          }
                        />
                        <MaterialIcons
                          name={'star'}
                          size={18}
                          color={
                            dataRestaurant?.star > 4
                              ? Color.buttonColor
                              : '#E0E0E0'
                          }
                        />
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('FindRestaurantScreen');
                  // console.log('thai');
                }}
                style={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: Color.buttonColor,
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '700', fontSize: 15, color: 'black'}}>
                  Tìm cửa hàng của bạn
                </Text>
              </TouchableOpacity>
            </View>
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
