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
import Images from '../../../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../../Styles/NotificationStyles';
import Color from '../../../../Theme/Color';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import services from '../../../../Redux/Service/promotionService';

const LoginScreen = (props) => {
  const [dataPromotion, setDataPromotion] = useState({});

  useEffect(() => {
    services
      .promotionTimziDetail({id: props?.route?.params?.id})
      .then(function (response) {
        if (response) {
          if (response.data.code === 200) {
            setDataPromotion(response?.data?.data);
          }
        } else {
          return;
        }
      });
  }, []);

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
              <Image
                source={{uri: dataPromotion?.image}}
                style={{width: '100%', height: 200, borderRadius: 10}}
              />
              <Text style={{marginTop: 15, fontSize: 16, fontWeight: '700'}}>
                Tên chương trình: {dataPromotion.name}
              </Text>
              <Text style={{marginTop: 15, fontSize: 14, fontWeight: '700'}}>
                Thời gian áp dụng:{' '}
                <Text style={{marginTop: 15, fontSize: 14, fontWeight: '500'}}>
                  Từ
                </Text>
                <Text style={{color: Color.main}}>
                  {' '}
                  {dataPromotion.time_open}
                </Text>{' '}
                <Text style={{marginTop: 15, fontSize: 14, fontWeight: '500'}}>
                  đến
                </Text>
                <Text style={{color: Color.main}}>
                  {' '}
                  {dataPromotion.time_close}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 25,
                }}>
                <Text style={{fontSize: 14, fontWeight: '700'}}>Nội dung:</Text>{' '}
                {dataPromotion.content}
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
