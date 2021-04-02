import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/NotificationStyles';
import Color from '../../Theme/Color';
import {ScrollView} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import services from '../../Redux/Service/shipperService';

const LoginScreen = (props) => {
  const store_id = props?.route?.params?.store_id || null;
  console.log(store_id);

  const [tab, setTab] = useState(0);

  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Đã kết nối'},
    {id: 1, name: 'Tạm dừng'},
    {id: 2, name: 'Chờ kết nối'},
  ]);

  const [dataStaff, setDataStaff] = useState([]);

  const getData = () => {
    services.getListShipperStore(null, store_id, 0).then(function (response) {
      // console.log(response);
      if (response) {
        console.log('thai mai', response);
        if (response.data.code === 200) {
          // setDataRestaurant(response?.data?.data);
          // setProvince(response?.data?.data[0].name);
          setDataStaff(response.data.data);
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    getData();
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
                      source={{uri: item.avatar}}
                      style={{width: 48, height: 48}}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
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
                      <TouchableOpacity
                        onPress={() => {
                          Alert.alert(
                            'Thông báo',
                            'Bạn chắc chắn muốn huỷ hợp tác với shipper?',
                            [
                              {text: 'Hủy', onPress: () => {}},
                              {
                                text: 'Đồng ý',
                                onPress: async () => {
                                  services
                                    .deleteShipper({
                                      store_id: store_id,
                                      shipper_id: item.id,
                                    })
                                    .then(function (response) {
                                      // console.log(response);
                                      // props.onGetList(response?.data);
                                      if (response) {
                                        // console.log('thai mai', response);
                                        if (response.data.code === 200) {
                                          props.navigation.reset({
                                            index: 0,
                                            routes: [
                                              {
                                                name: 'AccountShipperScreen',
                                                params: {
                                                  store_id: store_id,
                                                },
                                              },
                                            ],
                                          });
                                        }
                                      } else {
                                        Alert.alert(
                                          'Thông báo',
                                          response.data.message,
                                          [
                                            {
                                              text: 'Đồng ý',
                                              onPress: async () => {},
                                            },
                                          ],
                                          {cancelable: false},
                                        );
                                        return;
                                      }
                                    });
                                },
                              },
                            ],
                            {cancelable: false},
                          );
                        }}
                        style={{
                          height: 25,
                          width: 80,
                          backgroundColor: Color.buttonColor,
                          borderRadius: 4,
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                        }}>
                        <Text style={{fontSize: 11}}>Huỷ hợp tác</Text>
                      </TouchableOpacity>
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
