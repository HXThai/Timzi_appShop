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
      role: 'Nhân viên',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      role: 'Nhân viên',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      role: 'Nhân viên',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      role: 'Nhân viên',
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
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
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
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                      {/* <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Color.buttonColor,
                          }}>
                          Vai trò: {item.role}
                        </Text>
                        <View style={{flexDirection: 'row'}}>
                          <TouchableOpacity
                            onPress={() => {
                              props.navigation.navigate(
                                'ActionDecentralizationStaffScreen',
                              );
                            }}
                            style={{
                              width: 80,
                              height: 25,
                              borderRadius: 4,
                              backgroundColor: Color.buttonColor,
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 12}}>Phân quyền</Text>
                          </TouchableOpacity>
                        </View>
                      </View> */}
                    </View>
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
