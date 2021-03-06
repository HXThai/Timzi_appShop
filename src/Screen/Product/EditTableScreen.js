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
  const [numberTable, setNumberTable] = useState(
    props.route.params.numberTable,
  );
  const [minNumberPerson, setMinNumberPerson] = useState(
    props.route.params.minPerson,
  );
  const [maxNumberPerson, setMaxNumberPerson] = useState(
    props.route.params.maxPerson,
  );
  const [location, setLocation] = useState(props.route.params.floor);
  const [service, setService] = useState('');
  // const test = props?.route?.params?.status;
  // console.log('thai', test);

  // console.log(props.route.params.status);
  const status = props.route.params.status;
  // console.log(props.route.params.numberTable);

  useEffect(() => {
    // console.log(props?.route?.params?.data);
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{width: '100%', alignItems: 'center', marginTop: 10}}>
                  <Image
                    source={Images.iconOrderOfflineYellow}
                    style={{height: 80, width: 80, borderRadius: 8}}
                  />
                </View>
              </View>
              {status === 'edit' ? (
                <View style={{}}>
                  <Text style={{fontSize: 12}}>Số bàn</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: 25,
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Số bàn"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setNumberTable(text)}
                  defaultValue={numberTable}
                />
              </View>
              {status === 'edit' ? (
                <View style={{}}>
                  <Text style={{fontSize: 12}}>Số người tối thiểu</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: 25,
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Số người tối thiểu"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setMinNumberPerson(text)}
                  defaultValue={minNumberPerson}
                />
              </View>
              {status === 'edit' ? (
                <View style={{}}>
                  <Text style={{fontSize: 12}}>Số người tối đa</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: 25,
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Số người tối đa"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setMaxNumberPerson(text)}
                  defaultValue={maxNumberPerson}
                />
              </View>
              {status === 'edit' ? (
                <View style={{}}>
                  <Text style={{fontSize: 12}}>Vị trí tầng</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  marginBottom: 25,
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Vị trí tầng"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setLocation(text)}
                  defaultValue={location}
                />
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
                style={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: Color.main,
                  marginTop: 10,
                }}>
                <Text style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                  Xong
                </Text>
              </TouchableOpacity>
            </View>
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
