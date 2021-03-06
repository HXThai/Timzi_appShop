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
  const [dataPromotion, setDataPromotion] = useState([
    {
      image: Images.imagePromotion,
      title: 'GIẢM GIÁ 10% TOÀN BỘ MÓN CHÍNH',
      product: 'Món chính',
      date: '12/12/2021',
      status: 1,
    },
    {
      image: Images.imagePromotion,
      title: 'GIẢM GIÁ 10% TOÀN BỘ MÓN CHÍNH',
      product: 'Món chính',
      date: '12/12/2021',
      status: 1,
    },
    {
      image: Images.imagePromotion,
      title: 'GIẢM GIÁ 10% TOÀN BỘ MÓN CHÍNH',
      product: 'Món chính',
      date: '12/12/2021',
      status: 1,
    },
    {
      image: Images.imagePromotion,
      title: 'GIẢM GIÁ 10% TOÀN BỘ MÓN CHÍNH',
      product: 'Món chính',
      date: '12/12/2021',
      status: 1,
    },
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
              {dataPromotion.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 15,
                      backgroundColor: Color.white,
                      borderRadius: 10,
                      // padding: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: 'red',
                      }}>
                      <Image
                        source={item.image}
                        style={{width: 122, height: 108}}
                      />
                      <View
                        style={{
                          marginLeft: 5,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: 108,
                          padding: 5,
                          // backgroundColor: 'red',
                        }}>
                        <View
                          style={{width: Dimensions.get('window').width - 152}}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 15,
                              fontWeight: '400',
                            }}>
                            {item.title}
                          </Text>
                        </View>
                        <Text style={{fontSize: 12, fontWeight: '400'}}>
                          Sản phẩm:{' '}
                          <Text
                            style={{
                              color: Color.main,
                              fontSize: 12,
                              fontWeight: '400',
                            }}>
                            {item.product}
                          </Text>
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: 'black',
                          }}>
                          Thời gian: Từ nay đến hết ngày{' '}
                          <Text
                            style={{
                              color: Color.main,
                              fontSize: 12,
                              fontWeight: '400',
                            }}>
                            {item.date}
                          </Text>
                        </Text>
                        <TouchableOpacity
                          style={{
                            height: 25,
                            width: 90,
                            backgroundColor: Color.main,
                            borderRadius: 4,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            style={{
                              fontSize: 12,
                              fontWeight: '400',
                              color: Color.white,
                            }}>
                            Tham gia
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <FontAwesomeIcon
                      color="#898989"
                      icon={faChevronRight}
                      size={20}
                      style={{}}
                      color={Color.main}
                    />
                  </View>
                );
              })}
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
