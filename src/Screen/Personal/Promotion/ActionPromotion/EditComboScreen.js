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

const LoginScreen = (props) => {
  const [dataProduct, setDataProduct] = useState({
    image: Images.food,
    name: 'Bánh kem Soluto - Nhật Bản',
    price: '85000',
  });
  const [name, setName] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [percent, setPercent] = useState('');
  const [discount, setDiscount] = useState('');

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
                <View style={{width: '50%'}}>
                  <Image
                    source={Images.bannerShop}
                    style={{height: 87, width: '100%', borderRadius: 8}}
                  />
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{
                      height: 45,
                      width: 116,
                      backgroundColor: Color.buttonColor,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{fontSize: 18}}>Đổi ảnh</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Tên combo"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setName(text)}
                  defaultValue={name}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Thời gian bắt đầu"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setTimeStart(text)}
                  defaultValue={timeStart}
                />
              </View>
              <View
                style={{
                  width: '100%',
                  marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Thời gian kết thúc"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setTimeEnd(text)}
                  defaultValue={timeEnd}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 25,
                  backgroundColor: Color.white,
                  height: 88,
                  borderTopLeftRadius: 50,
                  borderBottomLeftRadius: 50,
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}>
                <Image
                  source={dataProduct.image}
                  style={{
                    height: 97,
                    width: 97,
                    marginLeft: -5,
                    borderRadius: 50,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 10,
                    width: Dimensions.get('window').width - 120,
                  }}>
                  <Text style={{fontWeight: '700', fontSize: 13}}>
                    {dataProduct.name}
                  </Text>
                  <Text style={{fontWeight: '700', fontSize: 15}}>
                    {styles.dynamicSort(dataProduct.price)} đ
                  </Text>
                  <TouchableOpacity
                    style={{
                      height: 25,
                      width: 50,
                      borderRadius: 4,
                      backgroundColor: Color.buttonColor,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                    }}>
                    <Text>Xóa</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {}}
                style={{
                  height: 50,
                  width: '100%',
                  backgroundColor: Color.buttonColor,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Text style={{fontWeight: '700', fontSize: 15, color: 'black'}}>
                  Thêm sản phẩm
                </Text>
              </TouchableOpacity>
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
                  Xác nhận
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
