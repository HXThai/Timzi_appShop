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
              <ImageBackground
                source={Images.backgroundBank}
                style={{height: 148, width: '100%'}}>
                <View
                  style={{
                    padding: 20,
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      // justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 17,
                        color: Color.white,
                      }}>
                      VIETCOMBANK
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontWeight: '400',
                      fontSize: 17,
                      color: Color.white,
                    }}>
                    5282 8888 8888 8888
                  </Text>
                </View>
              </ImageBackground>
              {dataBank.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 10,
                    }}>
                    <View
                      style={{
                        height: 32,
                        width: 32,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                        backgroundColor: Color.main,
                        borderRadius: 4,
                      }}>
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: '700',
                          color: Color.white,
                        }}>
                        {index + 1}
                      </Text>
                    </View>
                    <Text style={{fontSize: 13, fontWeight: '400'}}>
                      {item.name}
                    </Text>
                  </View>
                );
              })}
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
                Lưu ý: Khi bạn nạp tiền, chúng tôi sẽ nạp tiền vào tài khoản
                chính cho bạn. Bạn sẽ dùng tài khoản đó để trả mức hoa hồng 20%
                lợi nhuận cho hệ thống. Và mức duy trì tối thiểu là 0đ
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
                NẠP TIỀN QUA NGÂN HÀNG
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
