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
  const [dataRestaurant, setDataRestaurant] = useState({
    name: 'Hoàng Xuân Thái',
    address: 'Kim Chung - Hoài Đức - Hà Nội',
    field: 'Kinh doanh nhà hàng',
    email: 'tranvantet@gmail.com',
    hotline: '0986868686',
    star: 4.5,
    status: 'Yêu thích',
  });

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
              <Image
                source={Images.bannerShop}
                style={{height: 140, width: '100%', borderRadius: 8}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'restaurant-menu'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>
                    Tên quán
                  </Text>
                  <Text style={{fontSize: 15}}>{dataRestaurant.name}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'location-on'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>Địa chỉ</Text>
                  <Text style={{fontSize: 15}}>{dataRestaurant.address}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'business-center'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>
                    Lĩnh vực kinh doanh
                  </Text>
                  <Text style={{fontSize: 15}}>{dataRestaurant.field}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'email'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>Email</Text>
                  <Text style={{fontSize: 15}}>{dataRestaurant.email}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'phone'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>Hotline</Text>
                  <Text style={{fontSize: 15}}>{dataRestaurant.hotline}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 12,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, color: 'black', marginRight: 5}}>
                    Số sao: {dataRestaurant.star}
                  </Text>
                  <MaterialIcons
                    name={'star'}
                    size={20}
                    style={{color: Color.buttonColor}}
                  />
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Text style={{fontSize: 15, color: 'black'}}>Cửa hàng: </Text>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      backgroundColor: Color.buttonColor,
                      borderRadius: 4,
                    }}>
                    <Text style={{fontSize: 12, color: '#fff'}}>
                      {dataRestaurant.status}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('EditInformationRestaurantScreen')
                }
                style={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: Color.main,
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                  Chỉnh sửa
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
