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
import Modal from 'react-native-modal';
import staffService from '../../Redux/Service/staffService';

const LoginScreen = (props) => {
  const [dataRestaurant, setDataRestaurant] = useState([]);

  const [tab, setTab] = useState(0);
  const [dataTab, setDataTab] = useState([
    {id: 0, name: 'Đã kết nối'},
    {id: 1, name: 'Tạm dừng'},
    {id: 2, name: 'Chờ kết nối'},
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const [dataProvince, setDataProvince] = useState([]);

  const [province, setProvince] = useState('');

  const [provinceId, setProvinceId] = useState('');

  const [dataSearch, setDataSearch] = useState('');

  useEffect(() => {
    staffService.getListProvince({}).then(function (response) {
      // console.log(response);
      if (response) {
        // console.log('thai mai', response);
        if (response.data.code === 200) {
          setDataProvince(response?.data?.data);
          setProvince(response?.data?.data[0].name);
          setProvinceId(response?.data?.data[0].id);
          staffService
            .searchStore(null, dataSearch, response?.data?.data[0].id)
            .then(function (response) {
              // console.log(response);
              if (response) {
                // console.log('thai mai', response);
                if (response.data.code === 200) {
                  setDataRestaurant(response?.data?.data?.data);
                  // setProvince(response?.data?.data[0].name);
                }
              } else {
                return;
              }
            });
        }
      } else {
        return;
      }
    });
  }, []);

  const handleSearch = () => {
    staffService
      .searchStore(null, dataSearch, provinceId)
      .then(function (response) {
        // console.log(response);
        if (response) {
          // console.log('thai mai', response);
          if (response.data.code === 200) {
            setDataRestaurant(response?.data?.data?.data);
            // setProvince(response?.data?.data[0].name);
          }
        } else {
          return;
        }
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <Modal
            style={{alignItems: 'center', justifyContent: 'center'}}
            onBackdropPress={() => setModalVisible(false)}
            isVisible={modalVisible}>
            <View
              style={{
                height: '60%',
                width: '80%',
                backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {dataProvince.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setProvince(item.name);
                        setProvinceId(item.id);
                        setModalVisible(false);
                        staffService
                          .searchStore(null, dataSearch, item.id)
                          .then(function (response) {
                            // console.log(response);
                            if (response) {
                              // console.log('thai mai', response);
                              if (response.data.code === 200) {
                                setDataRestaurant(response?.data?.data?.data);
                                // setProvince(response?.data?.data[0].name);
                              }
                            } else {
                              return;
                            }
                          });
                      }}
                      style={{
                        height: 45,
                        width: Dimensions.get('window').width * 0.6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderBottomWidth: 0.5,
                        borderBottomColor: 'grey',
                      }}
                      key={index}>
                      <Text style={{fontSize: 15}}>{item.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </Modal>
          <SafeAreaView style={{flex: 1}}>
            <View
              style={{
                height: 56,
                width: '100%',
                backgroundColor: Color.main,
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.navigation.navigate('ChooseRestaurantScreen');
                    // console.log(props);
                  }}>
                  <View style={{marginLeft: 20}}>
                    <MaterialIcons
                      name={'arrow-back-ios'}
                      size={26}
                      color={Color.white}
                    />
                  </View>
                </TouchableOpacity>
                <Text
                  style={{fontWeight: 'bold', fontSize: 18, color: 'white'}}>
                  Tìm cửa hàng
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(true)}
                  style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <View
                    style={{
                      width: 10,
                      height: 56,
                      backgroundColor: '#F2F2F2',
                    }}></View>
                  <View
                    style={{
                      width: Dimensions.get('window').width * 0.35,
                      height: 56,
                      backgroundColor: Color.buttonColor,
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 16}}>
                      {province}{' '}
                    </Text>
                    <MaterialIcons name={'keyboard-arrow-down'} size={28} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>
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
                    // marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 70,
                        width: '100%',
                        marginTop: 25,
                      }}>
                      <TextInput
                        style={{
                          height: 45,
                          color: '#000000',
                          // fontFamily: 'Nunito',
                          borderColor: Color.main,
                          borderWidth: 1,
                          borderRadius: 20,
                          paddingLeft: 20,
                        }}
                        placeholder="Tìm cửa hàng"
                        placeholderTextColor="gray"
                        onChangeText={(text) => setDataSearch(text)}
                        defaultValue={dataSearch}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'flex-end',
                      alignSelf: 'flex-end',
                      height: 45,
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <TouchableOpacity
                      style={{padding: 10}}
                      onPress={() => {
                        handleSearch();
                      }}>
                      <MaterialIcons
                        name={'search'}
                        size={26}
                        color={Color.main}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{marginTop: 10, marginBottom: 5}}>
                  {dataRestaurant.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          marginBottom: 10,
                          backgroundColor: '#fff',
                          borderRadius: 8,
                        }}>
                        <Image
                          source={{uri: item.image}}
                          style={{
                            width: 98,
                            height: 96,
                            borderTopLeftRadius: 8,
                            borderBottomLeftRadius: 8,
                          }}
                        />
                        <View
                          style={{
                            padding: 8,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            // height: 96,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <MaterialIcons
                                name={'check-circle'}
                                size={20}
                                color={Color.buttonColor}
                              />
                              <Text
                                style={{
                                  fontSize: 13,
                                  fontWeight: '600',
                                  marginLeft: 5,
                                }}>
                                {item.name}
                              </Text>
                            </View>
                            <TouchableOpacity
                              onPress={() => {
                                Alert.alert(
                                  'Chọn cửa hàng!',
                                  'Bạn có chắc muốn chọn cửa hàng này?',
                                  [
                                    {
                                      text: 'Đồng ý',
                                      onPress: () => {
                                        staffService
                                          .chooseStore(null, item.id)
                                          .then(function (response) {
                                            // console.log(response);
                                            if (response) {
                                              console.log('thai mai', response);
                                              if (response.data.code === 200) {
                                                Alert.alert(
                                                  'Thông báo!',
                                                  'Chọn cửa hàng thành công!',
                                                  [
                                                    {
                                                      text: 'Đồng ý',
                                                      onPress: () => {
                                                        props.navigation.reset({
                                                          index: 0,
                                                          routes: [
                                                            {
                                                              name:
                                                                'ChooseRestaurantScreen',
                                                            },
                                                          ],
                                                        });
                                                        props.navigation.navigate(
                                                          'ChooseRestaurantScreen',
                                                        );
                                                      },
                                                    },
                                                  ],
                                                  {cancelable: false},
                                                );
                                              } else {
                                                Alert.alert(
                                                  'Thông báo!',
                                                  response?.data?.message,
                                                  [
                                                    {
                                                      text: 'Đồng ý',
                                                    },
                                                  ],
                                                  {cancelable: false},
                                                );
                                              }
                                            } else {
                                              Alert.alert(
                                                'Thông báo!',
                                                'Chọn cửa hàng thất bại!',
                                                [
                                                  {
                                                    text: 'Đồng ý',
                                                    onPress: () => {
                                                      props.navigation.reset({
                                                        index: 0,
                                                        routes: [
                                                          {
                                                            name:
                                                              'PromotionComboScreen',
                                                          },
                                                        ],
                                                      });
                                                      props.navigation.navigate(
                                                        'PromotionComboScreen',
                                                      );
                                                    },
                                                  },
                                                ],
                                                {cancelable: false},
                                              );
                                              return;
                                            }
                                          });
                                      },
                                    },
                                    {
                                      text: 'Hủy',
                                      onPress: () => {},
                                    },
                                  ],
                                  {cancelable: false},
                                );
                              }}>
                              <MaterialIcons
                                name={'add-box'}
                                size={25}
                                color={Color.buttonColor}
                              />
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <MaterialIcons
                              name={'location-on'}
                              size={18}
                              color={'black'}
                            />
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: '400',
                                marginLeft: 5,
                              }}>
                              {item.address}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              width: Dimensions.get('window').width - 136,
                              // justifyContent: 'space-between',
                            }}>
                            <MaterialIcons
                              name={'star'}
                              size={18}
                              color={
                                item.star > 0 ? Color.buttonColor : '#E0E0E0'
                              }
                            />
                            <MaterialIcons
                              name={'star'}
                              size={18}
                              color={
                                item.star > 1 ? Color.buttonColor : '#E0E0E0'
                              }
                            />
                            <MaterialIcons
                              name={'star'}
                              size={18}
                              color={
                                item.star > 2 ? Color.buttonColor : '#E0E0E0'
                              }
                            />
                            <MaterialIcons
                              name={'star'}
                              size={18}
                              color={
                                item.star > 3 ? Color.buttonColor : '#E0E0E0'
                              }
                            />
                            <MaterialIcons
                              name={'star'}
                              size={18}
                              color={
                                item.star > 4 ? Color.buttonColor : '#E0E0E0'
                              }
                            />
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
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
