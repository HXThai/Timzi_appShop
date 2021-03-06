import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  ActivityIndicator,
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
import OneSignal from 'react-native-onesignal';
import services from '../../Redux/Service/LoginService';
import Modal from 'react-native-modal';
import * as actionsLogin from '../../Redux/Action/loginAction';
import * as actionsGetListStore from '../../Redux/Action/orderOnlineAction';

const LoginScreen = (props) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const onLogin = async () => {
    const userId = await OneSignal.getDeviceState();

    services
      .login({
        phone: props?.route?.params?.phone,
        password: newPassword,
        device_id: userId.userId,
      })
      .then(function (response) {
        if (response) {
          if (response?.data?.code === 200) {
            setModalVisible(false);
            // console.log(getUniqueId().toString());
            // save session login
            storage.setItem('dataLogin', {
              phone: props?.route?.params?.phone,
              password: newPassword,
              device_id: userId.userId,
            });
            storage.setItem('userLogin', response?.data?.data?.user);
            storage.setItem('Authorization', response?.data.data.token);
            storage.setItem('role_id', response?.data?.data?.user?.role_id);
            props.getUserInformation(null);
            //set router home
            if (response?.data?.data?.user?.role_id === 3) {
              props.navigation.navigate('Staff');
            } else {
              props.onGetListStore({});
              props.navigation.navigate('TabNav');
              props.navigation.reset({
                // index: 0,
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
                M???T KH???U M???I
              </Text>
              <View
                style={{width: '80%', marginTop: 30, justifyContent: 'center'}}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="M???t kh???u m???i"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setNewPassword(text)}
                  defaultValue={newPassword}
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
                  placeholder="Nh???p l???i m???t kh???u m???i"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setConfirmNewPassword(text)}
                  value={confirmNewPassword}
                />
              </View>
              <View style={{width: '80%', marginTop: 40}}>
                <TouchableOpacity
                  onPress={() =>
                    services
                      .confirmForgotPassword({
                        phone: props?.route?.params?.phone,
                        password: newPassword,
                        password_confirmation: confirmNewPassword,
                      })
                      .then(function (response) {
                        if (response) {
                          if (response?.data?.code === 200) {
                            Alert.alert('Th??ng b??o!', response?.data?.message, [
                              {
                                text: '?????ng ??',
                                onPress: () => {
                                  onLogin();
                                },
                              },
                            ]);
                          } else {
                            Alert.alert('Th??ng b??o!', response?.data?.message, [
                              {
                                text: '?????ng ??',
                                onPress: () => {
                                  props.navigation.navigate('LoginScreen');
                                },
                              },
                            ]);
                            return;
                          }
                        } else {
                          Alert.alert('Th??ng b??o!', 'L???i!', [
                            {
                              text: '?????ng ??',
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
                      })
                  }>
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
                      Ti???p theo
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
