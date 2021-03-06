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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const LoginScreen = (props) => {
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
                source={Images.backgroundWallet}
                style={{height: 148, width: '100%'}}>
                <View
                  style={{
                    padding: 15,
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'space-around',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontWeight: '700', fontSize: 15}}>
                      T??i kho???n ch??nh
                    </Text>
                    <Text style={{fontWeight: '400', fontSize: 15}}>
                      12/12/2021
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 21,
                      color: Color.main,
                    }}>
                    +{styles.dynamicSort(1320000)} ??
                  </Text>
                  <Text style={{fontWeight: '700', fontSize: 15}}>
                    Ch??? c???a h??ng: Tr???n V??n T??t
                  </Text>
                </View>
              </ImageBackground>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('AddMoneyScreen')}
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: Color.main,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 40,
                }}>
                <Text
                  style={{fontWeight: '700', fontSize: 15, color: Color.white}}>
                  N???P TH??M V??O T??I KHO???N
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('MoneyWithdrawalScreen')
                }
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
                  R??T TI???N
                </Text>
              </TouchableOpacity>
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
                L??u ??: Khi b???n n???p ti???n, ch??ng t??i s??? n???p ti???n v??o t??i kho???n
                ch??nh cho b???n. B???n s??? d??ng t??i kho???n ???? ????? tr??? m???c hoa h???ng 20%
                l???i nhu???n cho h??? th???ng. V?? m???c duy tr?? t???i thi???u l?? 0??
              </Text>
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
