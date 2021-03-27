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

  useEffect(() => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then((location) => {
        // console.log(location);
        setDataLocation(location);
      })
      .catch((error) => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }, []);

  useEffect(() => {
    setName(props?.route?.params?.dataStore?.name.toString());
    setAddress(props?.route?.params?.dataStore?.address.toString());
    setAveragePrice(props?.route?.params?.dataStore?.average_price.toString());
    setDateOpen(props?.route?.params?.dataStore?.open_hours);
    setDateClose(props?.route?.params?.dataStore?.close_hours);
    setHotline(props?.route?.params?.dataStore?.hotline.toString());
    setImage(props?.route?.params?.dataStore?.image);
  }, [props?.route?.params?.dataStore?.id]);

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
    });
  };

  const handleEdit = () => {
    console.log(dataLocation.longitude);
    console.log(props?.route?.params?.dataStore?.id);
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
    body.append('latitude', dataLocation.latitude);
    body.append('longtidue', dataLocation.longitude);
    body.append('average_price', averagePrice);
    body.append('open_hours', dateOpen);
    body.append('close_hours', dateClose);
    body.append('hotline', hotline);
    // body.append('_method', 'put');
    // body.append('price_discount', promotion);
    // services.editStore(body, id).then(function (response) {
    //   // props.onGetList(response?.data);
    //   if (response) {
    //     console.log('thai', response);
    //     if (response.data.code === 200) {
    //       Alert.alert(
    //         'Thông báo!',
    //         'Sửa món ăn thành công!',
    //         [
    //           {
    //             text: 'Đồng ý',
    //             onPress: async () => {
    //               props.navigation.reset({
    //                 index: 0,
    //                 routes: [
    //                   {
    //                     name: 'ListProductScreen',
    //                     params: {
    //                       category_food_id: category_food_id,
    //                       store_id: store_id,
    //                     },
    //                   },
    //                 ],
    //               });
    //               props.navigation.navigate('ListProductScreen', {
    //                 category_food_id: category_food_id,
    //                 store_id: store_id,
    //               });
    //             },
    //           },
    //         ],
    //         {cancelable: false},
    //       );
    //       // setDataProduct(response?.data?.data?.data);
    //       // console.log(response.data.data.data);
    //     }
    //   } else {
    //     Alert.alert(
    //       'Thông báo!',
    //       'Sửa món ăn thất bại!',
    //       [
    //         {
    //           text: 'Đồng ý',
    //         },
    //       ],
    //       {cancelable: false},
    //     );
    //     return;
    //   }
    // });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
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
                    setModalVisible(false);
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
                    setModalVisible(false);
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
                  onChangeText={(text) => setAddress(text)}
                  defaultValue={address}
                />
              </View>
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
