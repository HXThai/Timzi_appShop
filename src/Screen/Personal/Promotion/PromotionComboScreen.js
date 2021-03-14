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
      food1: 'Trứng gà ốp la',
      food2: 'Gà nguyên con',
      food3: 'Vịt nguyên con',
      price: 400000,
      status: 1,
    },
    {
      image: Images.imagePromotion,
      food1: 'Trứng gà ốp la',
      food2: 'Gà nguyên con',
      food3: 'Vịt nguyên con',
      price: 400000,
      status: 0,
    },
    {
      image: Images.imagePromotion,
      food1: 'Trứng gà ốp la',
      food2: 'Gà nguyên con',
      food3: 'Vịt nguyên con',
      price: 400000,
      status: 1,
    },
    {
      image: Images.imagePromotion,
      food1: 'Trứng gà ốp la',
      food2: 'Gà nguyên con',
      food3: 'Vịt nguyên con',
      price: 400000,
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
              style={{marginTop: 0}}>
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
                        {/* <View
                          style={{width: Dimensions.get('window').width - 152}}>

                        </View> */}
                        <Text style={{fontSize: 11, fontWeight: '600'}}>
                          {item.food1}
                        </Text>
                        <Text style={{fontSize: 11, fontWeight: '600'}}>
                          {item.food2}
                        </Text>
                        <Text style={{fontSize: 11, fontWeight: '600'}}>
                          {item.food3}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '600',
                            color: Color.main,
                          }}>
                          Tổng combo: {styles.dynamicSort(item.price)}
                          {'đ '}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        height: 108,
                        padding: 8,
                      }}>
                      <View
                        style={{
                          width: 80,
                          height: 25,
                          backgroundColor:
                            item.status === 1 ? Color.main : Color.buttonColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '600',
                            color: item.status === 1 ? Color.white : 'black',
                          }}>
                          {item.status === 1 ? 'Đang diễn ra' : 'Sắp diễn ra'}
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{
                          width: 46,
                          height: 25,
                          backgroundColor: Color.buttonColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                          borderRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          Xóa
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('EditComboScreen')
                        }
                        style={{
                          width: 46,
                          height: 25,
                          backgroundColor: Color.buttonColor,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                          borderRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 11,
                            fontWeight: '600',
                            color: 'black',
                          }}>
                          Sửa
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                backgroundColor: Color.buttonColor,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: '700', fontSize: 15}}>Dừng tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                backgroundColor: Color.main,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Text
                style={{fontWeight: '700', fontSize: 15, color: Color.white}}>
                Xác nhận tất cả
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
