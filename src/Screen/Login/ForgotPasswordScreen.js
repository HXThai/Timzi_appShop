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
import services from '../../Redux/Service/LoginService';

const LoginScreen = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [displayPassword, setDisplayPassword] = useState(false);

  const [dataLogin, setDataLogin] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.background}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <ScrollView>
            <View style={{alignItems: 'center', width: '100%'}}>
              {/* <View style={{marginTop: 50}}>
                <Image
                  source={Images.logo}
                  resizeMode="cover"
                  style={{width: 308, height: 109}}
                />
              </View> */}
              <Text
                style={{
                  marginTop: '45%',
                  fontSize: 20,
                  // fontFamily: 'UTM Ericsson Capital',
                }}>
                QUÊN MẬT KHẨU
              </Text>
              <View
                style={{
                  height: 40,
                  width: '80%',
                  marginTop: 40,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  borderBottomWidth: 0.8,
                  borderBottomColor: '#333333',
                }}>
                <TextInput
                  style={{
                    color: '#000000',

                    width: '87%',
                    height: 40,
                  }}
                  placeholder="Số điện thoại"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPhoneNumber(text)}
                  value={phoneNumber}
                  keyboardType="number-pad"
                />
              </View>
              <View style={{width: '80%', marginTop: 60}}>
                <TouchableOpacity
                  onPress={() => {
                    services
                      .forgotPassword({phone: phoneNumber})
                      .then(function (response) {
                        if (response) {
                          if (response?.data?.code === 200) {
                            Alert.alert('Thông báo!', response?.data?.message, [
                              {
                                text: 'Đồng ý',
                                onPress: () => {
                                  props.navigation.navigate(
                                    'ConfirmOTPRegisterScreen',
                                    {
                                      type: 'forgotPassword',
                                      phone: phoneNumber,
                                    },
                                  );
                                },
                              },
                            ]);
                          } else {
                            Alert.alert('Thông báo!', response?.data?.message, [
                              {
                                text: 'Đồng ý',
                                onPress: () => {
                                  // props.navigation.navigate('LoginScreen');
                                },
                              },
                            ]);
                            return;
                          }
                        } else {
                          Alert.alert('Thông báo!', 'Lỗi!', [
                            {
                              text: 'Đồng ý',
                              onPress: () => {
                                setModalVisible(false);
                              },
                            },
                          ]);
                          return;
                        }
                      })
                      .then(function () {
                        // setIsLoadingMore(false);
                        // setModalVisible(false);
                      });
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
                        color: '#000000',
                      }}>
                      Tiếp theo
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
