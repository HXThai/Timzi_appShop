import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  BackHandler,
  ToastAndroid,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
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
import * as actionsLogin from '../../Redux/Action/loginAction';
import * as actionsGetListStore from '../../Redux/Action/orderOnlineAction';
import loginService from '../../Redux/Service/LoginService';
import storage from '../asyncStorage/Storage';
import OneSignal from 'react-native-onesignal';

const LoginScreen = (props) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [displayPassword, setDisplayPassword] = useState(false);
  const [dataLogin, setDataLogin] = useState([]);
  // console.log('dv', deviceId);
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   props.onGetListStore({});
  // }, [props.onGetListStore]);

  // useEffect(() => {
  //   props.onGetListStore({});
  // }, [props.onGetListStore]);

  const onClickLoginButton = async (phone, password) => {
    // props.navigation.navigate('TabNav');
    // storage.setItem('deviceId', getUniqueId().toString());
    const userId = await OneSignal.getDeviceState();
    // console.log('thaimeo', userId.userId);
    loginService
      .login({
        phone: phone,
        password: password,
        device_id: userId.userId,
      })
      .then(function (response) {
        if (response) {
          if (response?.data?.code === 200) {
            setModalVisible(false);
            // console.log(getUniqueId().toString());
            // save session login
            storage.setItem('dataLogin', {
              phone: phone,
              password: password,
              device_id: userId.userId,
            });
            storage.setItem('userLogin', response?.data?.data?.user);
            storage.setItem('Authorization', response?.data.data.token);
            storage.setItem('role_id', response?.data?.data?.user?.role_id);
            props.getUserInformation(null);
            //set router home
            if (
              response?.data?.data?.user?.role_id === 3 &&
              response?.data?.data?.user?.status_staff === 0
            ) {
              props.navigation.navigate('Staff');
            } else {
              props.onGetListStore({});
              props.navigation.navigate('TabNav');
              props.navigation.reset({
                index: 0,
                routes: [{name: 'TabNav'}],
              });
            }
          } else {
            Alert.alert('Th??ng b??o!', response?.data?.message, [
              {
                text: '?????ng ??',
                onPress: () => {
                  setModalVisible(false);
                },
              },
            ]);
            return;
          }
        } else {
          Alert.alert(
            'Th??ng b??o!',
            'S??? ??i???n tho???i ho???c m???t kh???u c???a b???n kh??ng ch??nh x??c.',
            [
              {
                text: '?????ng ??',
                onPress: () => {
                  setModalVisible(false);
                },
              },
            ],
          );
          return;
        }
      })
      .then(function () {
        // setIsLoadingMore(false);
        // setModalVisible(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.background}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <Modal
            style={{alignItems: 'center', justifyContent: 'center'}}
            isVisible={modalVisible}>
            <View
              style={{
                height: 70,
                width: 70,
                backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color={Color.main} />
            </View>
          </Modal>
          <ScrollView>
            <View style={{alignItems: 'center', width: '100%'}}>
              <View style={{marginTop: 50}}>
                <Image
                  source={Images.logo}
                  resizeMode="cover"
                  style={{width: 140, height: 120}}
                />
              </View>
              <Text
                style={{
                  marginTop: 40,
                  fontSize: 20,
                  // fontFamily: 'UTM Ericsson Capital',
                }}>
                ????NG NH???P
              </Text>

              <View
                style={{width: '80%', marginTop: 30, justifyContent: 'center'}}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="S??? ??i???n tho???i"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPhoneNumber(text)}
                  defaultValue={phoneNumber}
                  keyboardType={'number-pad'}
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
                    // fontFamily: 'Nunito',
                    width: '87%',
                    height: 40,
                  }}
                  placeholder="M???t kh???u"
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
                  <Text style={{fontSize: 18}}>Qu??n m???t kh???u?</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: '80%', marginTop: 30}}>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true),
                      onClickLoginButton(phoneNumber, password);
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
                      ????ng nh???p
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
                      ????ng k??
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
    dataLogin: state.loginReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLogin: (params) => {
    dispatch(actionsLogin.login(params));
  },
  getUserInformation: (params) => {
    dispatch(actionsLogin.getUserInformation(params));
  },
  onGetListStore: (params) => {
    dispatch(actionsGetListStore.getListStore(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
