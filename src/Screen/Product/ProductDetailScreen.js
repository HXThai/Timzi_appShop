import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  Platform,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';

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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import services from '../../Redux/Service/productService';

const LoginScreen = (props) => {
  const [name, setName] = useState(props?.route?.params?.name?.toString());
  const [price, setPrice] = useState(props?.route?.params?.price?.toString());
  const [status, setStatus] = useState(props.route.params.statusFood);
  const [promotion, setPromotion] = useState(
    props.route.params.promotion.toString(),
  );
  const [image, setImage] = useState(props.route.params.image);
  const [imageName, setImageName] = useState(null);
  // const test = props?.route?.params?.status;
  // console.log('thai', test);
  const statusFood = props.route.params.status;
  const [filePath, setFilePath] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);

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

  const category_food_id = props?.route?.params?.category_food_id || null;

  const store_id = props?.route?.params?.store_id || null;

  const id = props?.route?.params?.id || null;

  // console.log('id', id);

  useEffect(() => {
    setName(props?.route?.params?.name?.toString());
    setPrice(props?.route?.params?.price?.toString());
    setPromotion(props?.route?.params?.promotion?.toString());
    setImage(props?.route?.params?.image);
  }, [props?.route?.params?.name]);

  const handleAddFood = () => {
    var body = new FormData();
    body.append('store_id', store_id.toString());
    body.append('name', name);
    // body.append('image', data);
    body.append('image', {
      name: `${filePath.fileName}`,
      type: 'image/jpeg',
      uri: filePath.uri,
    });
    body.append('status', status);
    body.append('price', price);
    body.append('category_food_id', category_food_id);
    // body.append('quantity', number);
    body.append('price_discount', promotion);
    // console.log('check', body);

    // props.navigation.navigate('ListProductScreen', {
    //   category_food_id: category_food_id,
    //   store_id: store_id,
    // });
    services.addFood(body).then(function (response) {
      // props.onGetList(response?.data);
      if (response) {
        console.log('thai', response);
        if (response.data.code === 200) {
          Alert.alert(
            'Thông báo!',
            'Thêm món ăn thành công!',
            [
              {
                text: 'Đồng ý',
                onPress: async () => {
                  props.navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'ListProductScreen',
                        params: {
                          category_food_id: category_food_id,
                          store_id: store_id,
                        },
                      },
                    ],
                  });
                  props.navigation.navigate('ListProductScreen', {
                    category_food_id: category_food_id,
                    store_id: store_id,
                  });
                },
              },
            ],
            {cancelable: false},
          );
          // setDataProduct(response?.data?.data?.data);
          // console.log(response.data.data.data);
        }
      } else {
        return;
      }
    });
  };

  const handleEditFood = () => {
    var body = new FormData();
    body.append('store_id', store_id.toString());
    body.append('name', name);
    // body.append('image', data);
    body.append('image', {
      name: `${imageName}`,
      type: 'image/jpeg',
      uri: image,
    });
    body.append('status', status);
    body.append('price', price);
    body.append('category_food_id', category_food_id);
    body.append('_method', 'put');
    body.append('price_discount', promotion);
    services.editFood(body, id).then(function (response) {
      // props.onGetList(response?.data);
      if (response) {
        console.log('thai', response);
        if (response.data.code === 200) {
          Alert.alert(
            'Thông báo!',
            'Sửa món ăn thành công!',
            [
              {
                text: 'Đồng ý',
                onPress: async () => {
                  props.navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: 'ListProductScreen',
                        params: {
                          category_food_id: category_food_id,
                          store_id: store_id,
                        },
                      },
                    ],
                  });
                  props.navigation.navigate('ListProductScreen', {
                    category_food_id: category_food_id,
                    store_id: store_id,
                  });
                },
              },
            ],
            {cancelable: false},
          );
          // setDataProduct(response?.data?.data?.data);
          // console.log(response.data.data.data);
        }
      } else {
        Alert.alert(
          'Thông báo!',
          'Sửa món ăn thất bại!',
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
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
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
            <Modal
              onBackdropPress={() => setModalVisibleStatus(false)}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalVisibleStatus}>
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
                      setStatus(1);
                      setModalVisibleStatus(false);
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
                      name={'fastfood'}
                      size={28}
                      style={{color: Color.main}}
                    />
                    <Text style={{fontSize: 17, marginLeft: 10}}>Còn hàng</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setStatus(2);
                      setModalVisibleStatus(false);
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
                      name={'no-food'}
                      size={28}
                      style={{color: Color.main}}
                    />
                    <Text style={{fontSize: 17, marginLeft: 10}}>Hết hàng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
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
                    source={{uri: image}}
                    style={{height: 97, width: 97, borderRadius: 50}}
                  />
                  <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                      height: 45,
                      width: 116,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.buttonColor,
                      borderRadius: 8,
                    }}>
                    {statusFood === 'edit' ? (
                      <Text style={{fontSize: 15, fontWeight: '600'}}>
                        Đổi ảnh
                      </Text>
                    ) : (
                      <Text style={{fontSize: 15, fontWeight: '600'}}>
                        Thêm ảnh
                      </Text>
                    )}
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
                  // marginTop: 10,
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
              {/* <View
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
              </View> */}
              <TouchableOpacity
                onPress={() => setModalVisibleStatus(true)}
                style={{
                  // width: '50%',
                  marginBottom: 15,
                  marginTop: 10,
                  height: 45,
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  // elevation: 3,
                  // alignItems: 'center',
                  padding: 10,
                  // marginLeft: 5,
                  // marginRight: 5,
                  justifyContent: 'center',
                }}>
                <Text>{status === 1 ? 'Còn hàng' : 'Hết hàng'}</Text>
              </TouchableOpacity>

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
                  placeholder="Giá khuyến mãi"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPromotion(text)}
                  defaultValue={promotion}
                />
              </View>
              {statusFood === 'edit' ? (
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleEditFood()}
                    style={{
                      height: 50,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: Color.main,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                      Sửa món ăn
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleAddFood()}
                    style={{
                      height: 50,
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 50,
                      backgroundColor: Color.main,
                      marginTop: 10,
                    }}>
                    <Text
                      style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                      Thêm món ăn
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
            {/* <ActionButton buttonColor={Color.main}>
              <ActionButton.Item
                buttonColor="#9b59b6"
                title="New Task"
                onPress={() => console.log('notes tapped!')}>
                <MaterialIcons
                  name={'home'}
                  size={26}
                  style={{color: Color.main}}
                />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#3498db"
                title="Notifications"
                onPress={() => {}}>
                <MaterialIcons
                  name={'home'}
                  size={26}
                  style={{color: Color.main}}
                />
              </ActionButton.Item>
              <ActionButton.Item
                buttonColor="#1abc9c"
                title="All Tasks"
                onPress={() => {}}>
                <MaterialIcons
                  name={'home'}
                  size={26}
                  style={{color: Color.main}}
                />
              </ActionButton.Item>
            </ActionButton> */}
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
