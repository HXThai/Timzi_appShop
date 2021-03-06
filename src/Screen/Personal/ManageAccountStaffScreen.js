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
  const [tab, setTab] = useState(0);

  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Đã kết nối'},
    {id: 1, name: 'Tạm dừng'},
    {id: 2, name: 'Chờ kết nối'},
  ]);

  const [dataStaff, setDataStaff] = useState([
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      status: 'Chờ kết nối',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      status: 'Chờ kết nối',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      status: 'Chờ kết nối',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      status: 'Chờ kết nối',
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
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                {dataTab.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setTab(index);
                      }}
                      key={index}
                      style={{
                        height: 32,
                        width: Dimensions.get('window').width * 0.3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: tab === index ? Color.main : '#fff',
                        borderRadius: 6,
                        // backgroundColor: 'red',
                      }}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              {dataStaff.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      backgroundColor: Color.white,
                      borderRadius: 8,
                      marginTop: 15,
                    }}>
                    <Image
                      source={item.image}
                      style={{width: 48, height: 48}}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        marginLeft: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: Dimensions.get('window').width - 100,
                        }}>
                        <Text style={{fontSize: 15, fontWeight: '400'}}>
                          {item.name}
                        </Text>
                        <Text style={{fontSize: 15, fontWeight: '400'}}>
                          {item.phone}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color:
                              tab === 0
                                ? Color.main
                                : tab === 1
                                ? 'red'
                                : Color.buttonColor,
                          }}>
                          Trạng thái:{' '}
                          {tab === 0
                            ? 'Đã kết nối'
                            : tab === 1
                            ? 'Tạm dừng'
                            : 'Chờ kết nối'}
                        </Text>
                        {tab === 0 ? (
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              style={{
                                width: 66,
                                height: 25,
                                borderRadius: 4,
                                backgroundColor: Color.buttonColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 12, color: 'black'}}>
                                Loại bỏ
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : tab === 1 ? (
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              style={{
                                width: 66,
                                height: 25,
                                marginLeft: 10,
                                borderRadius: 4,
                                borderColor: Color.main,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 12, color: Color.main}}>
                                Kích hoạt
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                              style={{
                                width: 66,
                                height: 25,
                                borderRadius: 4,
                                backgroundColor: Color.buttonColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 12, color: 'black'}}>
                                Từ chối
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                width: 66,
                                height: 25,
                                marginLeft: 10,
                                borderRadius: 4,
                                borderColor: Color.main,
                                borderWidth: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text style={{fontSize: 12, color: Color.main}}>
                                Xác nhận
                              </Text>
                            </TouchableOpacity>
                          </View>
                        )}
                      </View>
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
              <Text style={{fontWeight: '700', fontSize: 15}}>
                Từ chối tất cả
              </Text>
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
