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

const LoginScreen = (props) => {
  const [dataOrderTable, setDataOrderTable] = useState([
    {table: 1, numberSeat: 8, status: 'Đặt bàn'},
    {table: 2, numberSeat: 8, status: 'Hết chỗ'},
    {table: 3, numberSeat: 8, status: 'Đặt bàn'},
    {table: 4, numberSeat: 8, status: 'Đặt bàn'},
    {table: 5, numberSeat: 8, status: 'Đặt bàn'},
    {table: 1, numberSeat: 8, status: 'Đặt bàn'},
    {table: 2, numberSeat: 8, status: 'Hết chỗ'},
    {table: 3, numberSeat: 8, status: 'Đặt bàn'},
    {table: 4, numberSeat: 8, status: 'Đặt bàn'},
    {table: 5, numberSeat: 8, status: 'Đặt bàn'},
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
            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  width: Dimensions.get('window').width - 10,
                  alignItems: 'center',
                  // marginTop: 5,
                  // marginLeft: 5,
                  borderRadius: 5,
                  // marginTop: 15,
                  marginBottom: 20,
                  flexWrap: 'wrap',
                  // justifyContent: 'space-between',
                  flex: 1,
                }}>
                {dataOrderTable.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                      }}>
                      <View
                        key={index}
                        style={{
                          width: '80%',
                          borderRadius: 8,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          marginRight: 10,
                          marginTop: 15,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            width: '100%',
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 10,
                            }}>
                            <Image
                              source={
                                item.status === 'Hết chỗ'
                                  ? Images.iconOrderOfflineGrey
                                  : Images.iconOrderOfflineYellow
                              }
                              style={{height: 64, width: 64}}
                            />
                            <Text style={{color: '#fff', position: 'absolute'}}>
                              {item.table}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '700',
                              marginTop: 10,
                            }}>
                            Bàn số {item.table}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              marginTop: 5,
                            }}>
                            {item.numberSeat} chỗ ngồi
                          </Text>
                          <View
                            style={{
                              height: 35,
                              width: 128,
                              alignItems: 'center',
                              justifyContent: 'space-evenly',
                              marginTop: 10,
                              borderTopWidth: 1,
                              borderTopColor: '#E0E0E0',
                              flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                              style={{
                                width: 42,
                                height: 20,
                                backgroundColor: Color.buttonColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                              }}>
                              <Text style={{fontSize: 11}}>Xóa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              onPress={() =>
                                props.navigation.navigate('EditTableScreen', {
                                  status: 'edit',
                                  // data: dataOrderTable[index],
                                  numberTable: '3',
                                  minPerson: '1',
                                  maxPerson: '8',
                                  floor: '4',
                                })
                              }
                              style={{
                                width: 42,
                                height: 20,
                                backgroundColor: Color.buttonColor,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 4,
                              }}>
                              <Text style={{fontSize: 11}}>Sửa</Text>
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
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
