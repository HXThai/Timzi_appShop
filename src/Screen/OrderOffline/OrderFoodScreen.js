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
import * as actionsHome from '../../Redux/Action/homeAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import services from '../../Redux/Service/orderOfflineService';

const LoginScreen = (props) => {
  useEffect(() => {
    console.log(props?.route?.params?.id);
    props.onGetStoreDetail({params: null, id: props?.route?.params?.id});
  }, [props.onGetStoreDetail]);

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
            <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}></View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log("data : " ,state.homeReducer);
  return {
    data: state.EatAtShopReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetStoreDetail: (params) => {
    dispatch(actionsHome.getStoreDetailWithBookTableInStore(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
