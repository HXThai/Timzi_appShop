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
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [check3, setCheck3] = useState(false);
  const [check4, setCheck4] = useState(false);
  const [check5, setCheck5] = useState(false);

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
              <TouchableOpacity
                onPress={() => setCheck1(!check1)}
                // key={index}
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                  marginTop: 15,
                }}>
                <Image
                  source={check1 === false ? Images.notChecked : Images.checked}
                  style={{height: 21, width: 21}}
                />
                <Text style={{fontSize: 15, fontWeight: '400', marginLeft: 10}}>
                  Quyền xét duyệt đơn hàng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCheck2(!check2)}
                // key={index}
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                  marginTop: 15,
                }}>
                <Image
                  source={check2 === false ? Images.notChecked : Images.checked}
                  style={{height: 21, width: 21}}
                />
                <Text style={{fontSize: 15, fontWeight: '400', marginLeft: 10}}>
                  Quyền đăng, sửa, xóa sản phẩm
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCheck3(!check3)}
                // key={index}
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                  marginTop: 15,
                }}>
                <Image
                  source={check3 === false ? Images.notChecked : Images.checked}
                  style={{height: 21, width: 21}}
                />
                <Text style={{fontSize: 15, fontWeight: '400', marginLeft: 10}}>
                  Quyền tạo chương trình khuyến mại
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                onPress={() => setCheck4(!check4)}
                // key={index}
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                  marginTop: 15,
                }}>
                <Image
                  source={check4 === false ? Images.notChecked : Images.checked}
                  style={{height: 21, width: 21}}
                />
                <Text style={{fontSize: 15, fontWeight: '400', marginLeft: 10}}>
                  Quyền quản lý thu nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setCheck5(!check5)}
                // key={index}
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                  marginTop: 15,
                }}>
                <Image
                  source={check5 === false ? Images.notChecked : Images.checked}
                  style={{height: 21, width: 21}}
                />
                <Text style={{fontSize: 15, fontWeight: '400', marginLeft: 10}}>
                  Quyền quản lý tài khoản nhân viên
                </Text>
              </TouchableOpacity> */}
            </ScrollView>
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
