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
                      placeholder="Tìm cửa hàng"
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
                              name={'add-box'}
                              size={25}
                              color={Color.buttonColor}
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
