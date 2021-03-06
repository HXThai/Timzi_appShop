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
import styles from './../Styles/NotificationStyles';
import Color from '../../Theme/Color';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';

const LoginScreen = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(false);

  const [dataLogin, setDataLogin] = useState([]);

  const onClickLoginButton = async (phone, password) => {
    props.navigation.navigate('TabNav');
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
              <View style={{marginTop: 50}}>
                <Image
                  source={Images.logo}
                  resizeMode="cover"
                  style={{width: 308, height: 109}}
                />
              </View>
              <Text
                style={{
                  marginTop: 40,
                  fontSize: 20,
                  // fontFamily: 'UTM Ericsson Capital',
                }}>
                ĐĂNG NHẬP
              </Text>
              <View
                style={{width: '80%', marginTop: 30, justifyContent: 'center'}}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Số điện thoại"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPhoneNumber(text)}
                  defaultValue={phoneNumber}
                />
              </View>
              <View
                style={{
                  height: 40,
                  width: '80%',
                  marginTop: 30,
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
                  placeholder="Mật khẩu"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={displayPassword === true ? false : true}
                />
                <View
                  style={{
                    height: 40,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => setDisplayPassword(!displayPassword)}>
                    <MaterialIcons
                      name={
                        displayPassword === true
                          ? 'visibility'
                          : 'visibility-off'
                      }
                      size={22}
                      color={'black'}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  marginTop: 30,
                  borderBottomWidth: 0.8,
                  borderBottomColor: '#333333',
                }}>
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('ForgotPasswordScreen')
                  }>
                  <Text style={{fontSize: 18}}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '80%', marginTop: 30}}>
                <TouchableOpacity
                  onPress={() => onClickLoginButton(phoneNumber, password)}>
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
                      Đăng nhập
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{width: '80%', marginTop: 15}}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('RegisterScreen')}>
                  <View
                    style={{
                      height: 40,
                      justifyContent: 'center',
                      backgroundColor: '#000000',
                      borderRadius: 32,
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: Color.buttonColor,
                      }}>
                      Đăng ký
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
