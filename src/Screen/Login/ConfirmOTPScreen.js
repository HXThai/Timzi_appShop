import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OtpInputs from 'react-native-otp-inputs';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/NotificationStyles';
import Color from '../../Theme/Color';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
import registerService from '../../Redux/Service/LoginService';

const ConfirmOTPScreen = (props) => {
  const [otp, setOtp] = useState('');

  const handleConfirmOtp = () => {
    // console.log(otp);
    registerService
      .confirmOtp({otp: otp})
      .then(function (response) {
        if (response) {
          if (response?.data?.code === 200) {
            Alert.alert('Thông báo!', response?.data?.message, [
              {
                text: 'Đồng ý',
                onPress: () => {
                  props.navigation.navigate('LoginScreen');
                },
              },
            ]);
          } else {
            Alert.alert('Thông báo!', response?.data?.message, [
              {text: 'Đồng ý'},
            ]);
          }
        } else {
          Alert.alert('Thông báo!', 'Lỗi!', [{text: 'Đồng ý'}]);
          return;
        }
      })
      .then(function () {
        // setIsLoadingMore(false);
        // setIsLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.background}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <ScrollView>
            <View style={{alignItems: 'center', width: '100%'}}>
              <Text
                style={{
                  marginTop: '50%',
                  fontSize: 20,
                  // fontFamily: 'UTM Ericsson Capital',
                }}>
                XÁC NHẬN OTP
              </Text>
              <View
                style={{
                  marginTop: 40,
                  justifyContent: 'flex-start',
                  flexDirection: 'row',
                  width: '80%',
                }}>
                {/* <Text style={{color: 'red'}}>Mã OTP không chính xác</Text>  */}
              </View>
              <View
                style={{width: '80%', marginTop: 10, justifyContent: 'center'}}>
                <OtpInputs
                  handleChange={(code) => setOtp(code)}
                  numberOfInputs={6}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                  inputContainerStyles={{
                    borderColor: Color.buttonColor,
                    borderWidth: 1,
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  inputStyles={{
                    fontSize: 20,
                    color: '#333333',
                    paddingLeft: 12,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 25,
                  alignItems: 'center',
                }}>
                <Text>Nếu bạn chưa nhận được mã OTP thì</Text>
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    padding: 3,
                    borderRadius: 10,
                    paddingLeft: 8,
                    paddingRight: 8,
                    marginLeft: 5,
                  }}>
                  <Text>Gửi lại</Text>
                </TouchableOpacity>
              </View>
              {/* <View
                style={{
                  flexDirection: 'row',
                  marginTop: 15,
                  alignItems: 'center',
                }}>
                <Text>Mã OTP sẽ được gửi lại sau: </Text>
                <Text style={{fontWeight: 'bold'}}>30s</Text>
              </View> */}
              <View style={{width: '80%', marginTop: 30}}>
                <TouchableOpacity
                  onPress={() => {
                    // props.navigation.navigate('ConfirmForgotPasswordScreen');
                    handleConfirmOtp();
                  }}>
                  <View
                    style={{
                      height: 40,
                      justifyContent: 'center',
                      backgroundColor: Color.buttonColor,
                      borderRadius: 32,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#FFFFFF',
                      }}>
                      Xác nhận
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </View>
    </View>
  );
};

export default ConfirmOTPScreen;
