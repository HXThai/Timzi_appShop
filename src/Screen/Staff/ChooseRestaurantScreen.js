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

const LoginScreen = (props) => {
  const [dataRestaurant, setDataRestaurant] = useState([
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'Kim Chung - Hoài Đức - Hà Nội',
      star: 3,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'Kim Chung - Hoài Đức - Hà Nội',
      star: 4,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'Kim Chung - Hoài Đức - Hà Nội',
      star: 5,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'Kim Chung - Hoài Đức - Hà Nội',
      star: 4,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'Kim Chung - Hoài Đức - Hà Nội',
      star: 4,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'Kim Chung - Hoài Đức - Hà Nội',
      star: 4,
    },
    {
      image: Images.restaurant,
      name: 'Tokki - BBQ Nhật bản',
      code: 'Kim Chung - Hoài Đức - Hà Nội',
      star: 4,
    },
  ]);

  const [tab, setTab] = useState(0);
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Đã kết nối'},
    {id: 1, name: 'Tạm dừng'},
    {id: 2, name: 'Chờ kết nối'},
  ]);

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
              <View style={{marginTop: 10, marginBottom: 5}}>
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
                              {item.name}
                            </Text>
                          </View>
                          <TouchableOpacity>
                            <MaterialIcons
                              name={'clear'}
                              size={23}
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
                            {item.code}
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
                              item.star > 0 ? Color.buttonColor : '#E0E0E0'
                            }
                          />
                          <MaterialIcons
                            name={'star'}
                            size={18}
                            color={
                              item.star > 1 ? Color.buttonColor : '#E0E0E0'
                            }
                          />
                          <MaterialIcons
                            name={'star'}
                            size={18}
                            color={
                              item.star > 2 ? Color.buttonColor : '#E0E0E0'
                            }
                          />
                          <MaterialIcons
                            name={'star'}
                            size={18}
                            color={
                              item.star > 3 ? Color.buttonColor : '#E0E0E0'
                            }
                          />
                          <MaterialIcons
                            name={'star'}
                            size={18}
                            color={
                              item.star > 4 ? Color.buttonColor : '#E0E0E0'
                            }
                          />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
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
