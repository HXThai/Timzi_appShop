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
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [field, setField] = useState('');
  const [email, setEmail] = useState('');
  const [hotline, setHotline] = useState('');

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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: '50%'}}>
                  <Image
                    source={Images.bannerShop}
                    style={{height: 87, width: '100%', borderRadius: 8}}
                  />
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 45,
                      width: 116,
                      backgroundColor: Color.buttonColor,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 18}}>Đổi ảnh</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Tên quán"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setName(text)}
                  defaultValue={name}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Địa chỉ"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setAddress(text)}
                  defaultValue={address}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Lĩnh vực kinh doanh chính"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setField(text)}
                  defaultValue={field}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Email"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setEmail(text)}
                  defaultValue={email}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Hotline"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setHotline(text)}
                  defaultValue={hotline}
                />
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
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
                  Lưu
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
