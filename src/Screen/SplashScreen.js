import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
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

// let uniqueId = DeviceInfo.getUniqueId();
// console.log(getUniqueId());
const SplashScreen = (props) => {
  useEffect(() => {
    setTimeout(() => {
      // storage.setItem('deviceId', getUniqueId());
      // console.log(getUniqueId().toString());
      storage.getItem('dataLogin').then((data) => {
        if (data) {
          // props.navigation.navigate('TabNav');
          console.log(data);
          loginService
            .login({
              phone: data.phone,
              password: data.password,
              device_id: data.deviceId,
            })
            .then(function (response) {
              // props.onGetList(response?.data);
              if (response) {
                // console.log(response?.data.data.user);
                if (response?.data?.code == '200') {
                  // save session login
                  storage.setItem('userLogin', response?.data?.data?.user);
                  storage.setItem('Authorization', response?.data.data.token);
                  //set router home
                  if (response?.data?.data?.user?.role_id === 3) {
                    props.navigation.navigate('Staff');
                  } else {
                    props.navigation.navigate('TabNav');
                    props.navigation.reset({
                      index: 0,
                      routes: [{name: 'TabNav'}],
                    });
                  }

                  // props.navigation.reset({
                  //   index: 0,
                  //   routes: [
                  //     {
                  //       name: 'Home',
                  //       params: {someParam: 'Param1'},
                  //     },
                  //   ],
                  // });
                  // props.navigation.reset();
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
    }, 3000);
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
        style={{width: 308, height: 109}}
      />
    </View>
  );
};

export default SplashScreen;
