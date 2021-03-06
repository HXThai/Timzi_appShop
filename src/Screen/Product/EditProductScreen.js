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
  const [name, setName] = useState(props.route.params.name);
  const [price, setPrice] = useState(props.route.params.price);
  const [status, setStatus] = useState(props.route.params.statusFood);
  const [typeFood, setTypeFood] = useState(props.route.params.typeFood);
  const [typeSize, setTypeSize] = useState(props.route.params.typeSize);
  const [number, setNumber] = useState(props.route.params.number);
  const [promotion, setPromotion] = useState(props.route.params.promotion);
  // const test = props?.route?.params?.status;
  // console.log('thai', test);
  const statusFood = props.route.params.status;

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
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Image
                    source={Images.food}
                    style={{height: 97, width: 97, borderRadius: 8}}
                  />
                  <TouchableOpacity
                    style={{
                      height: 45,
                      width: 116,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.buttonColor,
                      borderRadius: 8,
                    }}>
                    <Text style={{fontSize: 15, fontWeight: '600'}}>
                      Đổi ảnh
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12}}>Tên món</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Tên món"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setName(text)}
                  defaultValue={name}
                />
              </View>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12}}>Giá</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Giá"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPrice(text)}
                  defaultValue={price}
                />
              </View>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12}}>Tình trạng</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Tình trạng"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setStatus(text)}
                  defaultValue={status}
                />
              </View>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12}}>Phân loại món</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Phân loại món"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setTypeFood(text)}
                  defaultValue={typeFood}
                />
              </View>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12}}>Phân loại size</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Phân loại size"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setTypeSize(text)}
                  defaultValue={typeSize}
                />
              </View>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12}}>Số lượng</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Số lượng"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setNumber(text)}
                  defaultValue={number}
                />
              </View>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12}}>Khuyến mãi</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: '100%',
                  marginBottom: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Khuyến mãi"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPromotion(text)}
                  defaultValue={promotion}
                />
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => props.navigation.navigate('ListProductScreen')}
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
