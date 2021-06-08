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
import productService from '../../Redux/Service/productService';
import ImageView from 'react-native-image-viewing';

const LoginScreen = (props) => {
  const [imageView, setImageView] = useState([{}]);

  const [visible, setIsVisible] = useState(false);

  const onShowImage = (uriImage) => {
    var img = [{uri: uriImage}];
    setImageView(img);
    setIsVisible(true);
  };

  const [dataRestaurant, setDataRestaurant] = useState({
    name: 'Hoàng Xuân Thái',
    address: 'Kim Chung - Hoài Đức - Hà Nội',
    field: 'Kinh doanh nhà hàng',
    email: 'tranvantet@gmail.com',
    hotline: '0986868686',
    star: 4.5,
    status: 'Yêu thích',
  });

  const [data, setdata] = useState([]);
  const store_params = props?.route?.params?.store_params || null;

  useEffect(() => {
    (async () => {
      const res = await productService.storeDetail(store_params);
      setdata(res?.data?.data?.store);
      // console.log(res?.data?.data?.store);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <ImageView
            images={imageView}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => {
                  onShowImage(data?.image);
                }}>
                <Image
                  source={{uri: data?.image}}
                  style={{
                    height: 220,
                    width: '100%',
                    borderRadius: 8,
                    // resizeMode: 'stretch',
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'restaurant-menu'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>
                    Tên quán
                  </Text>
                  <Text style={{fontSize: 15}}>{data.name}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'location-on'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>Địa chỉ</Text>
                  <View style={{width: Dimensions.get('window').width - 70}}>
                    <Text numberOfLines={1} style={{fontSize: 15}}>
                      {data.address}
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'attach-money'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>
                    Giá trung bình
                  </Text>
                  <Text style={{fontSize: 15}}>
                    {styles.dynamicSort(data.average_price)} đ
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'schedule'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>
                    Giờ mở cửa
                  </Text>
                  <Text style={{fontSize: 15}}>{data.open_hours}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'schedule'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>
                    Giờ đóng cửa
                  </Text>
                  <Text style={{fontSize: 15}}>{data.close_hours}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 8,
                }}>
                <MaterialIcons
                  name={'phone'}
                  size={33}
                  style={{color: Color.main}}
                />
                <View
                  style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    marginLeft: 5,
                  }}>
                  <Text style={{fontSize: 11, color: Color.main}}>Hotline</Text>
                  <Text style={{fontSize: 15}}>{data.hotline}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  padding: 12,
                  justifyContent: 'space-between',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{fontSize: 15, color: 'black', marginRight: 5}}>
                    Số sao: {data.star}
                  </Text>
                  <MaterialIcons
                    name={'star'}
                    size={20}
                    style={{color: Color.buttonColor}}
                  />
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                  <Text style={{fontSize: 15, color: 'black'}}>Cửa hàng: </Text>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 5,
                      backgroundColor: Color.buttonColor,
                      borderRadius: 4,
                    }}>
                    <Text style={{fontSize: 12, color: '#fff'}}>
                      {dataRestaurant.status}
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('EditInformationRestaurantScreen', {
                    dataStore: data,
                  })
                }
                style={{
                  height: 50,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 50,
                  backgroundColor: Color.main,
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                  Chỉnh sửa
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
