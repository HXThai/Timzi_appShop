import React, {useEffect, useState} from 'react';
import {Image, View, Platform} from 'react-native';
import Images from '../Theme/Images';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SplashScreenStyles';
// import {
//   getUniqueId,
//   DeviceInfo,
//   getManufacturer,
// } from 'react-native-device-info';

import storage from './asyncStorage/Storage';
import loginService from '../Redux/Service/LoginService';
import * as actionsLogin from '../Redux/Action/loginAction';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {
  USBPrinter,
  NetPrinter,
  BLEPrinter,
} from 'react-native-thermal-receipt-printer';
import reactotron from 'reactotron-react-native';

// let uniqueId = DeviceInfo.getUniqueId();
// console.log(getUniqueId());
const SplashScreen = (props) => {
  useEffect(() => {
    setTimeout(async () => {
      const userId = await OneSignal.getDeviceState();
      console.log('userSP', userId.userId);
      Platform.OS === 'android' &&
        storage.getItem('ipaddress').then((data) => {
          if (data) {
            // reactotron.log(data);
            NetPrinter.init().then(() => {
              NetPrinter.connectPrinter(data, 9100).then(
                (value) => {
                  console.log('test');
                  storage.setItem('isConnect', 'true');
                },
                (error) => {
                  storage.setItem('isConnect', 'false');
                  console.log(error);
                },
              );
            });
          } else {
            // props.navigation.navigate('Login');
          }
        });
      storage.getItem('dataLogin').then((data) => {
        if (data) {
          // console.log(userId.userId);
          loginService
            .login({
              phone: data.phone,
              password: data.password,
              device_id: userId.userId,
            })
            .then(function (response) {
              if (response) {
                if (response?.data?.code == '200') {
                  storage.setItem('userLogin', response?.data?.data?.user);
                  storage.setItem('Authorization', response?.data.data.token);
                  props.getUserInformation(null);
                  //set router home
                  if (
                    response?.data?.data?.user?.role_id === 3 &&
                    response?.data?.data?.user?.status_staff === 0
                  ) {
                    props.navigation.navigate('Staff');
                  } else {
                    props.navigation.navigate('TabNav');
                    props.navigation.reset({
                      index: 0,
                      routes: [{name: 'TabNav'}],
                    });
                  }
                } else {
                  props.navigation.navigate('Login');
                }
              } else {
                props.navigation.navigate('Login');
              }
            });
          // console.log(data.phone);
        } else {
          props.navigation.navigate('Login');
        }
      });
    }, 2500);
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={Images.logo}
        resizeMode="cover"
        style={{width: 140, height: 140}}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log("data : " ,state.homeReducer);
  return {
    dataLogin: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUserInformation: (params) => {
    dispatch(actionsLogin.getUserInformation(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
