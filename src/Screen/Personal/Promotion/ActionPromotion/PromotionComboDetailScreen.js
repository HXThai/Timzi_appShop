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
import services from '../../../../Redux/Service/promotionService';

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

  const [dataPromotion, setDataPromotion] = useState({});

  const promotion_id = props?.route?.params?.id || null;
  // console.log(promotion_id);

  useEffect(() => {
    services.promotionComboDetail({id: promotion_id}).then(function (response) {
      // props.onGetList(response?.data);
      if (response) {
        console.log('thai mai', response);
        if (response.data.code === 200) {
          setDataPromotion(response?.data?.data);
        }
      } else {
        return;
      }
    });
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
              <Image
                source={{uri: dataPromotion?.image}}
                style={{width: '100%', height: 200, borderRadius: 10}}
              />
              <Text style={{marginTop: 15, fontSize: 16, fontWeight: '700'}}>
                Tên combo: {dataPromotion.name}
              </Text>
              <Text style={{marginTop: 15, fontSize: 14, fontWeight: '700'}}>
                Thời gian áp dụng:{' '}
                <Text style={{marginTop: 15, fontSize: 14, fontWeight: '500'}}>
                  Từ
                </Text>
                <Text style={{color: Color.main}}>
                  {' '}
                  {dataPromotion.time_open}
                </Text>{' '}
                <Text style={{marginTop: 15, fontSize: 14, fontWeight: '500'}}>
                  đến
                </Text>
                <Text style={{color: Color.main}}>
                  {' '}
                  {dataPromotion.time_close}
                </Text>
              </Text>
              <Text
                style={{
                  marginTop: 15,
                  fontSize: 14,
                  fontWeight: '500',
                  lineHeight: 25,
                }}>
                <Text style={{fontSize: 14, fontWeight: '700'}}>Nội dung:</Text>{' '}
                {dataPromotion.content}
              </Text>
              <Text style={{marginTop: 15, fontSize: 14, fontWeight: '700'}}>
                Các sản phẩm trong combo:{' '}
              </Text>
              <ScrollView
                style={{marginTop: 15}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {dataPromotion?.food?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        width: 130,
                        borderRadius: 8,
                        // backgroundColor: '#fff',
                        height: 176,
                        alignItems: 'center',
                        marginRight: 10,
                        flexDirection: 'column',
                        // justifyContent: 'flex-end',
                      }}>
                      <View
                        style={{
                          height: 125,
                          width: '100%',
                          backgroundColor: '#fff',
                          marginTop: 50,
                          borderRadius: 8,
                        }}></View>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          // marginTop: 10,
                          position: 'absolute',
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            height: 97,
                            width: 97,
                            borderRadius: 50,
                          }}
                        />
                        <View
                          style={{
                            width: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text
                            numberOfLines={1}
                            style={{
                              fontSize: 13,
                              fontWeight: '600',
                            }}>
                            {item.name}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '700',
                            marginTop: 5,
                          }}>
                          {styles.dynamicSort(item.price_discount)} đ
                        </Text>
                        <Text
                          style={{
                            fontSize: 13,
                            fontWeight: '400',
                            marginTop: 5,
                          }}>
                          999
                          {'+ đã bán'}
                        </Text>
                        {/* <View
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
                            onPress={() => {
                              // console.log(
                              //   item.category_food_id,
                              //   storeId,
                              // );
                              props.navigation.navigate('EditProductScreen', {
                                status: 'edit',
                                id: item.id,
                                name: item.name,
                                price: item.price,
                                statusFood: item.status,
                                typeFood: 'Món ăn chính',
                                typeSize: 'L',
                                number: '99',
                                promotion: item.price_discount,
                                category_food_id: item.category_food_id,
                                store_id: storeId,
                                image: item.image,
                              });
                            }}
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
                        </View> */}
                      </View>
                    </View>
                  );
                })}
              </ScrollView>
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
