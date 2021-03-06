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
import Images from '../../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/NotificationStyles';
import Color from '../../../Theme/Color';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const LoginScreen = (props) => {
  const [dataBank, setDataBank] = useState([
    {name: 'Ngân hàng: Vietcombank'},
    {name: 'Số tài khoản: 0011 6666 8888 6666 8888'},
    {name: 'Chi nhánh: Thanh Xuân - Hà Nội'},
    {name: 'chủ tài khoản: Trần Văn Tét'},
    {name: 'Cú pháp nạp tiền: TIMZI "Số điện thoại" TAIXE'},
  ]);

  const [money, setMoney] = useState('');
  const [date, setDate] = useState('');
  const [content, setContent] = useState('');

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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: 20}}>
              <View
                style={{
                  width: '100%',
                  marginTop: 30,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Số tiền bạn muốn rút"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setMoney(text)}
                  defaultValue={money}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 30,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Ngày rút tiền"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setDate(text)}
                  defaultValue={date}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 30,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Nội dung rút tiền"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setContent(text)}
                  defaultValue={content}
                />
              </View>
              <Text
                style={{
                  marginTop: 40,
                  fontSize: 13,
                  fontWeight: '400',
                  textDecorationLine: 'underline',
                  fontStyle: 'italic',
                  textAlign: 'center',
                  lineHeight: 28,
                }}>
                Chúng tôi sẽ chuyển tiền vào tài khoản mà quý khách đã đăng ký
                với TIMZI. Thông tin tài khoản 123456789, Ngân hàng Viecombank,
                chủ tài khoản Trần Văn Tét. Nếu quý khách muốn yêu cầu chuyển
                ngân hàng vui lòng liên hệ với chúng tôi qua: 123456789
              </Text>
            </ScrollView>
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                backgroundColor: Color.buttonColor,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
              }}>
              <Text style={{fontWeight: '700', fontSize: 15, color: 'black'}}>
                RÚT TIỀN
              </Text>
            </TouchableOpacity>
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
