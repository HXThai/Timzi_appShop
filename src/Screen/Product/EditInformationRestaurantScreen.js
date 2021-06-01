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
import Modal from 'react-native-modal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
import GetLocation from 'react-native-get-location';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import services from '../../Redux/Service/productService';
import reactotron from 'reactotron-react-native';

const LoginScreen = (props) => {
  const [dataRestaurant, setDataRestaurant] = useState({
    name: 'Hoàng Xuân Thái',
    address: 'Kim Chung - Hoài Đức - Hà Nội',
    field: 'Kinh doanh nhà hàng',
    email: 'tranvantet@gmail.com',
    hotline: '0986868686',
    star: 4.5,
    status: 'Yêu thích',
  });
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [averagePrice, setAveragePrice] = useState('');
  const [email, setEmail] = useState('');
  const [hotline, setHotline] = useState('');
  const [image, setImage] = useState('');
  const [imageName, setImageName] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filePath, setFilePath] = useState({});
  const [dataLocation, setDataLocation] = useState(null);
  const [categoryId, setCategoryId] = useState([]);
  const [categoryBusiness, setCategoryBusiness] = useState([]);
  const [dataProvince, setDataProvince] = useState([]);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataWard, setDataWard] = useState([]);
  const [currentProvince, setCurrentProvince] = useState('');
  const [currentDistrict, setCurrentDistrict] = useState('');
  const [currentWard, setCurrentWard] = useState('');
  const [currentProvinceId, setCurrentProvinceId] = useState('');
  const [currentDistrictId, setCurrentDistrictId] = useState('');
  const [currentWardId, setCurrentWardId] = useState('');

  const [modalVisibleProvince, setModalVisibleProvince] = useState(false);
  const [modalVisibleDistrict, setModalVisibleDistrict] = useState(false);
  const [modalVisibleWard, setModalVisibleWard] = useState(false);

  const [isSearchAddress, setIsSearchAddress] = useState(false);
  const [isCheckChangeAdress, setIsCheckChangeAdress] = useState(false);
  const [dataLocationSuggest, setDataLocationSuggest] = useState([]);

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        // console.log(location);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {
    reactotron.log(props?.route?.params?.dataStore);
    setName(props?.route?.params?.dataStore?.name.toString());
    setAddress(props?.route?.params?.dataStore?.address.toString());
    setAveragePrice(props?.route?.params?.dataStore?.average_price.toString());
    setDateOpen(props?.route?.params?.dataStore?.open_hours);
    setDateClose(props?.route?.params?.dataStore?.close_hours);
    setHotline(props?.route?.params?.dataStore?.hotline.toString());
    setImage(props?.route?.params?.dataStore?.image);
    setCategoryId(props?.route?.params?.dataStore?.category);
    setCategoryBusiness(props?.route?.params?.dataStore?.category_store_detail);
    var dataLoc = {
      lat: props?.route?.params?.dataStore?.latitude,
      lng: props?.route?.params?.dataStore?.longtidue,
    };
    setDataLocation(dataLoc);
    services.getListProvince(null).then(function (response) {
      if (response) {
        // console.log('thai mai', response);
        if (response.data.code === 200) {
          setDataProvince(response?.data?.data);
          response?.data?.data?.forEach((element) => {
            if (element.id === props?.route?.params?.dataStore?.province_id) {
              setCurrentProvince(element.name);
              setCurrentProvinceId(element.id);
              services
                .getListDistrict(null, element.id)
                .then(function (responseD) {
                  if (responseD) {
                    if (responseD.data.code === 200) {
                      setDataDistrict(responseD?.data?.data);
                      responseD?.data?.data?.forEach((elementD) => {
                        if (
                          elementD.id ===
                          props?.route?.params?.dataStore?.district_id
                        ) {
                          setCurrentDistrict(elementD.name);
                          setCurrentDistrictId(elementD.id);
                          services
                            .getListWard(null, element.id, elementD.id)
                            .then(function (responseW) {
                              if (responseW) {
                                // console.log('thai mai', response);
                                if (responseW.data.code === 200) {
                                  setDataWard(responseW?.data?.data);
                                  responseW?.data?.data?.forEach((elementW) => {
                                    if (
                                      elementW.id ===
                                      props?.route?.params?.dataStore?.ward_id
                                    ) {
                                      setCurrentWard(elementW.name);
                                      setCurrentWardId(elementW.id);
                                    }
                                  });
                                }
                              } else {
                                return;
                              }
                            });
                        }
                      });
                    }
                  } else {
                    return;
                  }
                });
            }
          });
        }
      } else {
        return;
      }
    });
  }, [props?.route?.params?.dataStore?.id]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (address != '' && isCheckChangeAdress == false) {
        services.getLocationSuggest(null, address).then(function (response) {
          if (response) {
            // reactotron.log(response);
            setIsSearchAddress(true);
            setDataLocationSuggest(response.data.predictions);
          } else {
            return;
          }
        });
      }
    }, 1500);
    return () => clearTimeout(delayDebounceFn);
  }, [address]);

  const handleChooseAddress = (item) => {
    setIsSearchAddress(false);
    setIsCheckChangeAdress(true);
    setAddress(item?.description);
    services.getLocationDetail(null, item.place_id).then(function (response) {
      if (response) {
        setDataLocation(response.data.result.geometry.location);
      } else {
        return;
      }
    });
  };

  const [isDatePickerOpenVisible, setDatePickerOpenVisibility] = useState(
    false,
  );

  const showDatePickerOpen = () => {
    setDatePickerOpenVisibility(true);
  };

  const hideDatePickerOpen = () => {
    setDatePickerOpenVisibility(false);
  };

  const handleConfirmDateOpen = (date) => {
    // console.log(date.toString().substr(16, 5));
    setDateOpen(date.toString().substr(16, 5));
    hideDatePickerOpen();
  };

  const [dateOpen, setDateOpen] = useState(
    moment(new Date()).format('DD-MM-YYYY'),
  );

  const [isDatePickerCloseVisible, setDatePickerCloseVisibility] = useState(
    false,
  );

  const showDatePickerClose = () => {
    setDatePickerCloseVisibility(true);
  };

  const hideDatePickerClose = () => {
    setDatePickerCloseVisibility(false);
  };

  const handleConfirmDateClose = (date) => {
    setDateClose(date.toString().substr(16, 5));
    hideDatePickerClose();
  };

  const [dateClose, setDateClose] = useState(
    moment(new Date()).format('DD-MM-YYYY'),
  );

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          // alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        // console.log('base64 -> ', response.base64);
        // console.log('uri -> ', response.uri);
        // console.log('width -> ', response.width);
        // console.log('height -> ', response.height);
        // console.log('fileSize -> ', response.fileSize);
        // console.log('type -> ', response.type);
        // console.log('fileName -> ', response.fileName);
        setFilePath(response);
        setImage(response.uri);
        setImageName(response.fileName);
        setModalVisible(false);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('Thông báo!', 'Bạn đã rời khỏi chọn ảnh!');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      // console.log('base64 -> ', response.base64);
      // console.log('uri -> ', response.uri);
      // console.log('width -> ', response.width);
      // console.log('height -> ', response.height);
      // console.log('fileSize -> ', response.fileSize);
      // console.log('type -> ', response.type);
      // console.log('fileName -> ', response.fileName);
      setFilePath(response);
      setImage(response.uri);
      setImageName(response.fileName);
      setModalVisible(false);
    });
  };

  const handleEdit = () => {
    var body = new FormData();
    // // body.append('store_id', store_id.toString());
    body.append('name', name);
    // body.append('image', data);
    body.append('image', {
      name: `${imageName}`,
      type: 'image/jpeg',
      uri: image,
    });
    body.append('address', address);
    body.append('latitude', dataLocation.lat);
    body.append('longtidue', dataLocation.lng);
    body.append('average_price', averagePrice);
    body.append('open_hours', dateOpen);
    body.append('close_hours', dateClose);
    body.append('hotline', hotline);
    body.append('province_id', currentProvinceId);
    body.append('district_id', currentDistrictId);
    body.append('ward_id', currentWardId);
    body.append('_method', 'put');
    categoryId.forEach((element) => {
      body.append('category_id[]', element.id);
    });
    categoryBusiness.forEach((element) => {
      body.append('category_business[]', element.category_name);
    });
    services
      .editStore(body, props?.route?.params?.dataStore?.id)
      .then(function (response) {
        if (response) {
          // console.log('thai', response);
          if (response.data.code === 200) {
            Alert.alert(
              'Thông báo!',
              'Sửa cửa hàng thành công!',
              [
                {
                  text: 'Đồng ý',
                  onPress: async () => {
                    props.navigation.reset({
                      // index: 0,
                      routes: [
                        {
                          name: 'InformationRestaurantScreen',
                          params: {
                            store_params: props?.route?.params?.dataStore?.id,
                          },
                        },
                      ],
                    });
                    props.navigation.navigate('InformationRestaurantScreen', {
                      store_params: props?.route?.params?.dataStore?.id,
                    });
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert(
              'Thông báo!',
              response.data.message,
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
            'Lỗi hệ thống!',
            [
              {
                text: 'Đồng ý',
              },
            ],
            {cancelable: false},
          );
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
          {/* Modal image */}
          <Modal
            onBackdropPress={() => setModalVisible(false)}
            style={{alignItems: 'center', justifyContent: 'center'}}
            isVisible={modalVisible}>
            <View
              style={{
                height: '20%',
                width: '80%',
                backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    captureImage('photo');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // height: 50,
                    padding: 5,
                    marginBottom: 20,
                    // backgroundColor: 'red',
                  }}>
                  <MaterialIcons
                    name={'camera-alt'}
                    size={28}
                    style={{color: Color.main}}
                  />
                  <Text style={{fontSize: 17, marginLeft: 10}}>Chụp ảnh</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    chooseFile('photo');
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    // height: 50,
                    padding: 5,
                    // backgroundColor: 'red',
                  }}>
                  <MaterialIcons
                    name={'camera'}
                    size={28}
                    style={{color: Color.main}}
                  />
                  <Text style={{fontSize: 17, marginLeft: 10}}>
                    Chọn ảnh từ thư viện
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          {/* Modal province */}
          <Modal
            style={{alignItems: 'center', justifyContent: 'center'}}
            onBackdropPress={() => setModalVisibleProvince(false)}
            isVisible={modalVisibleProvince}>
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
                        setCurrentProvince(item.name);
                        setCurrentProvinceId(item.id);
                        services
                          .getListDistrict(null, item.id)
                          .then(function (response) {
                            if (response) {
                              if (response.data.code === 200) {
                                setDataDistrict(response?.data?.data);
                                setCurrentDistrict(
                                  response?.data?.data[0].name,
                                );
                                setCurrentDistrictId(
                                  response?.data?.data[0].id,
                                );
                                services
                                  .getListWard(
                                    null,
                                    item.id,
                                    response?.data?.data[0].id,
                                  )
                                  .then(function (response) {
                                    if (response) {
                                      setDataWard(response?.data?.data);
                                      setCurrentWard(
                                        response?.data?.data[0].name,
                                      );
                                      setCurrentWardId(
                                        response?.data?.data[0].id,
                                      );
                                    } else {
                                      return;
                                    }
                                  });
                              }
                            } else {
                              return;
                            }
                          });
                        setModalVisibleProvince(false);
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
          {/* Modal district */}
          <Modal
            style={{alignItems: 'center', justifyContent: 'center'}}
            onBackdropPress={() => setModalVisibleDistrict(false)}
            isVisible={modalVisibleDistrict}>
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
                {dataDistrict.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentDistrict(item.name);
                        setCurrentDistrictId(item.id);
                        services
                          .getListWard(null, currentProvinceId, item.id)
                          .then(function (response) {
                            if (response) {
                              setDataWard(response?.data?.data);
                              setCurrentWard(response?.data?.data[0].name);
                              setCurrentWardId(response?.data?.data[0].id);
                            } else {
                              return;
                            }
                          });
                        setModalVisibleDistrict(false);
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
          {/* Modal Ward */}
          <Modal
            style={{alignItems: 'center', justifyContent: 'center'}}
            onBackdropPress={() => setModalVisibleWard(false)}
            isVisible={modalVisibleWard}>
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
                {dataWard.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentWard(item.name);
                        setCurrentWardId(item.id);
                        setModalVisibleWard(false);
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
          <DateTimePickerModal
            isVisible={isDatePickerOpenVisible}
            mode="time"
            onConfirm={handleConfirmDateOpen}
            onCancel={hideDatePickerOpen}
          />
          <DateTimePickerModal
            isVisible={isDatePickerCloseVisible}
            mode="time"
            onConfirm={handleConfirmDateClose}
            onCancel={hideDatePickerClose}
          />
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
                    source={{uri: image}}
                    style={{height: 87, width: '100%', borderRadius: 8}}
                  />
                </View>
                <View
                  style={{
                    width: '50%',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
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
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Tên quán</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  // marginTop: 5,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Tên quán"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setName(text)}
                  defaultValue={name}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Địa chỉ</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  // marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Địa chỉ"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => {
                    setIsCheckChangeAdress(false);
                    setAddress(text);
                  }}
                  defaultValue={address}
                />
              </View>
              {isSearchAddress && dataLocationSuggest != [] ? (
                <View
                  style={{
                    width: '100%',
                    height: 300,
                  }}>
                  <ScrollView>
                    {dataLocationSuggest.map((item, index) => {
                      // reactotron.log(dataLocationSuggest);
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            handleChooseAddress(item);
                          }}
                          key={index}
                          style={{
                            padding: 5,
                            // backgroundColor: '#C0C0C0',
                            // height: 50,
                            justifyContent: 'center',
                            borderBottomWidth: 0.5,
                            borderBottomColor: 'grey',
                          }}>
                          <Text style={{fontWeight: '700', marginBottom: 5}}>
                            {item.structured_formatting.main_text}
                          </Text>
                          <Text>{item?.description}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              ) : null}
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Giá trung bình</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  // marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Giá trung bình"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setAveragePrice(text)}
                  defaultValue={averagePrice}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Tỉnh/Thành phố</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleProvince(true);
                }}
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                }}>
                <Text>{currentProvince}</Text>
              </TouchableOpacity>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Quận/Huyện</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleDistrict(true);
                }}
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                }}>
                <Text>{currentDistrict}</Text>
              </TouchableOpacity>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Phường/Xã</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisibleWard(true);
                }}
                style={{
                  width: '100%',
                  marginTop: 10,
                  height: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 8,
                  backgroundColor: Color.white,
                }}>
                <Text>{currentWard}</Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Text>Giờ mở cửa: </Text>
                  <TouchableOpacity
                    onPress={() => showDatePickerOpen()}
                    style={{
                      height: 40,
                      width: 90,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.white,
                      borderRadius: 8,
                      elevation: 3,
                    }}>
                    <Text>{dateOpen}</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <Text>Giờ đóng cửa: </Text>
                  <TouchableOpacity
                    onPress={() => showDatePickerClose()}
                    style={{
                      height: 40,
                      width: 90,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.white,
                      borderRadius: 8,
                      elevation: 3,
                    }}>
                    <Text>{dateClose}</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Hotline</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  // marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Hotline"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setHotline(text)}
                  defaultValue={hotline}
                />
              </View>
            </ScrollView>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 5,
              }}>
              <TouchableOpacity
                onPress={() => handleEdit()}
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
                  Lưu
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
