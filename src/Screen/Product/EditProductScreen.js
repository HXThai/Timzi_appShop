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
  const [promotion, setPromotion] = useState(props.route.params.promotion);
  const [image, setImage] = useState(props.route.params.image);
  const [imageName, setImageName] = useState(null);
  const [nameSize, setNameSize] = useState('');
  const [nameCategoryTopping, setNameCategoryTopping] = useState('');
  const [limitTopping, setLimitTopping] = useState('');
  const [priceSize, setPriceSize] = useState('');
  const [toppingDetail, setToppingDetail] = useState('');
  const [priceTopping, setPriceTopping] = useState('');
  const [description, setDescription] = useState('');
  const [currentCategoryTopping, setCurrentCategoryTopping] = useState();
  const [currentCategoryToppingId, setCurrentCategoryToppingId] = useState();
  const [data, setData] = useState([]);
  const [dataToppingDetail, setDataToppingDetail] = useState([{}]);
  // const test = props?.route?.params?.status;
  // console.log('thai', test);
  const statusFood = props.route.params.status;
  const [filePath, setFilePath] = useState({});

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleStatus, setModalVisibleStatus] = useState(false);
  const [modalVisibleSize, setModalVisibleSize] = useState(false);
  const [
    modalVisibleCategoryTopping,
    setModalVisibleCategoryTopping,
  ] = useState(false);
  const [modalVisibleToppingDetail, setModalVisibleToppingDetail] = useState(
    false,
  );
  const [modalVisibleListCate, setModalVisibleListCate] = useState(false);

  const [modalVisibleShowTopping, setModalVisibleShowTopping] = useState(false);

  const [modalVisibleCategory, setModalVisibleCategory] = useState(false);

  const [modalVisibleStoreFood, setModalVisibleStoreFood] = useState(false);

  const [dataIsStatusFood, setDataIsStatusFood] = useState([
    {status: 0, title: 'Món mới'},
    {status: 0, title: 'Đặc sản'},
    {status: 0, title: 'Tạm hết'},
  ]);

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
      setModalVisible(false);
    });
  };

  const category_food_id = props?.route?.params?.category_food_id || null;

  const store_id = props?.route?.params?.store_id || null;

  const id = props?.route?.params?.id || null;

  const [dataSize, setDataSize] = useState([]);
  const [dataCategoryTopping, setDataCategoryTopping] = useState([]);
  const [dataShowToping, setDataShowTopping] = useState([]);

  const [dataCateWithStore, setDataCateWithStore] = useState([]);

  const [category, setCategory] = useState({});

  const [dataCateStoreFood, setDataCateStoreFood] = useState([]);

  const [storeFood, setStoreFood] = useState({});

  useEffect(() => {
    setName(props?.route?.params?.name?.toString());
    setPrice(props?.route?.params?.price?.toString());
    setPromotion(props?.route?.params?.promotion?.toString());
    setImage(props?.route?.params?.image);
    setDataCategoryTopping(
      props?.route?.params?.productDetail?.category_topping_food,
    );
    var newDataSize = [];

    props?.route?.params?.productDetail?.size?.forEach((element) => {
      var data = {name: element.name, price: element.price};
      newDataSize.push(data);
    });
    setDataSize(newDataSize);
  }, [props?.route?.params?.name]);

  useEffect(() => {
    services.getListCategoryWithStore(null).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setDataCateWithStore(response.data.data);
          response.data.data.forEach((element) => {
            if (element.id == props?.route?.params?.category_food_id) {
              setCategory(element);
            }
          });
        }
      } else {
        return;
      }
    });
    services.getListCategoryStoreFood(null).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setDataCateStoreFood(response.data.data);
          response.data.data.forEach((element) => {
            if (element.id == props?.route?.params?.category_store_food) {
              setStoreFood(element);
            }
          });
        }
      } else {
        return;
      }
    });
  }, []);

  const handleAddFood = () => {
    try {
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
      body.append('category_food_id', category.id);
      body.append('price_discount', promotion);
      body.append('is_new', dataIsStatusFood[0].status);
      body.append('is_specialties', dataIsStatusFood[1].status);
      body.append('is_out_of_food', dataIsStatusFood[2].status);
      body.append('category_store_food_id', storeFood.id);
      body.append('description', description);

      services.addFood(body).then(function (response) {
        if (response) {
          if (response.data.code === 200) {
            Alert.alert(
              'Thông báo!',
              'Thêm món ăn thành công!',
              [
                {
                  text: 'Đồng ý',
                  onPress: async () => {
                    props.navigation.reset({
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
            'Thêm món ăn thất bại!',
            'Vui lòng kiểm tra lại thông tin!',
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
    } catch (ex) {
      Alert.alert(
        'Thông báo!',
        ex.toString(),
        [
          {
            text: 'Đồng ý',
          },
        ],
        {cancelable: false},
      );
    }
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
    body.append('_method', 'put');
    body.append('status', status);
    body.append('price', price);
    body.append('category_food_id', category.id);
    body.append('price_discount', promotion);
    body.append('is_new', dataIsStatusFood[0].status);
    body.append('is_specialties', dataIsStatusFood[1].status);
    body.append('is_out_of_food', dataIsStatusFood[2].status);
    body.append('category_store_food_id', storeFood.id);
    body.append('description', description);
    console.log(body);
    services.editFood(body, id).then(function (response) {
      // props.onGetList(response?.data);
      if (response) {
        // console.log('thai', response);
        if (response.data.code === 200) {
          Alert.alert(
            'Thông báo!',
            'Sửa món ăn thành công!',
            [
              {
                text: 'Đồng ý',
                onPress: async () => {
                  props.navigation.reset({
                    // index: 0,
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

  const handeChooseStatusFood = (index) => {
    var data = [...dataIsStatusFood];
    if (data[index].status === 0) {
      data[index].status = 1;
    } else {
      data[index].status = 0;
    }
    setDataIsStatusFood(data);
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
                      // setModalVisible(false);
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
            {/* Modal Category */}
            <Modal
              onBackdropPress={() => setModalVisibleCategory(false)}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalVisibleCategory}>
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
                <ScrollView>
                  {dataCateWithStore.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setCategory(item);
                          setModalVisibleCategory(false);
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                          borderBottomWidth: 0.5,
                          borderBottomColor: Color.grey,
                          width: Dimensions.get('window').width * 0.6,
                          justifyContent: 'center',
                          paddingBottom: 10,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </Modal>
            {/* Modal store food */}
            <Modal
              onBackdropPress={() => setModalVisibleStoreFood(false)}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalVisibleStoreFood}>
              <View
                style={{
                  height: '25%',
                  width: '80%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <ScrollView>
                  {dataCateStoreFood.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setStoreFood(item);
                          setModalVisibleStoreFood(false);
                        }}
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          marginTop: 10,
                          borderBottomWidth: 0.5,
                          borderBottomColor: Color.grey,
                          width: Dimensions.get('window').width * 0.6,
                          justifyContent: 'center',
                          paddingBottom: 10,
                        }}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </View>
            </Modal>
            {/* Modal Size */}
            <Modal
              onBackdropPress={() => setModalVisibleSize(false)}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalVisibleSize}>
              <View
                style={{
                  height: Dimensions.get('window').height * 0.35,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text>Tên size</Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#333333',
                      width: Dimensions.get('window').width * 0.7,
                    }}
                    placeholder="Tên size"
                    placeholderTextColor="#9C9C9C"
                    onChangeText={(text) => setNameSize(text)}
                    defaultValue={nameSize}
                  />
                  <Text style={{marginTop: 15}}>Giá tiền</Text>
                  <TextInput
                    style={{
                      width: Dimensions.get('window').width * 0.7,
                      height: 40,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#333333',
                    }}
                    placeholder="Giá tiền"
                    placeholderTextColor="#9C9C9C"
                    onChangeText={(text) => setPriceSize(text)}
                    defaultValue={priceSize}
                    keyboardType={'number-pad'}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      var newData = {name: nameSize, price: priceSize};
                      var data = dataSize;
                      data.push(newData);
                      var body = new FormData();
                      body.append('size', JSON.stringify(data));
                      body.append('_method', 'put');
                      services.updateSize(body, id).then(function (response) {
                        if (response) {
                          if (response.data.code === 200) {
                            setModalVisibleSize(false);
                          }
                        } else {
                          Alert.alert(
                            'Thông báo!',
                            'Cập nhật size thất bại!',
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
                    }}
                    style={{
                      width: Dimensions.get('window').width * 0.7,
                      marginTop: 20,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.buttonColor,
                      borderRadius: 8,
                    }}>
                    <Text>Thêm size</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* Modal thêm danh mục Topping */}
            <Modal
              onBackdropPress={() => setModalVisibleCategoryTopping(false)}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalVisibleCategoryTopping}>
              <View
                style={{
                  height: Dimensions.get('window').height * 0.3,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text>Danh mục topping</Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#333333',
                      width: Dimensions.get('window').width * 0.7,
                    }}
                    placeholder="Danh mục topping"
                    placeholderTextColor="#9C9C9C"
                    onChangeText={(text) => setNameCategoryTopping(text)}
                    defaultValue={nameCategoryTopping}
                  />
                  <Text style={{marginTop: 15}}>Giới hạn topping</Text>
                  <TextInput
                    style={{
                      height: 40,
                      borderBottomWidth: 0.8,
                      borderBottomColor: '#333333',
                      width: Dimensions.get('window').width * 0.7,
                    }}
                    placeholder="Giới hạn topping"
                    placeholderTextColor="#9C9C9C"
                    onChangeText={(text) => setLimitTopping(text)}
                    defaultValue={limitTopping}
                    keyboardType={'number-pad'}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      var newData = {
                        name: nameCategoryTopping,
                        limit: limitTopping,
                      };
                      var newDataCategoryTopping = [];
                      props?.route?.params?.productDetail?.category_topping_food?.forEach(
                        (element) => {
                          var data = {name: element.name, limit: element.limit};
                          newDataCategoryTopping.push(data);
                        },
                      );
                      newDataCategoryTopping.push(newData);
                      var body = new FormData();
                      body.append(
                        'category_topping',
                        JSON.stringify(newDataCategoryTopping),
                      );
                      body.append('_method', 'put');
                      services
                        .updateCategoryTopping(body, id)
                        .then(function (response) {
                          if (response) {
                            if (response.data.code === 200) {
                              services
                                .listCategoryTopping(null, id)
                                .then(function (response) {
                                  if (response) {
                                    if (response.data.code === 200) {
                                      setDataCategoryTopping(
                                        response?.data?.data,
                                      );
                                    }
                                  } else {
                                    return;
                                  }
                                });
                              setModalVisibleCategoryTopping(false);
                            }
                          } else {
                            Alert.alert(
                              'Thông báo!',
                              'Cập nhật danh mục thất bại!',
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
                    }}
                    style={{
                      width: Dimensions.get('window').width * 0.7,
                      marginTop: 20,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.buttonColor,
                      borderRadius: 8,
                    }}>
                    <Text>Thêm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            {/* Modal chi tiết topping */}
            <Modal
              onBackdropPress={() => {
                setModalVisibleToppingDetail(false);
                setDataToppingDetail([0]);
              }}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalVisibleToppingDetail}>
              <Modal
                onBackdropPress={() => {
                  setModalVisibleListCate(false);
                }}
                style={{alignItems: 'center', justifyContent: 'center'}}
                isVisible={modalVisibleListCate}>
                <View
                  style={{
                    height: Dimensions.get('window').height * 0.35,
                    width: '100%',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    flexDirection: 'column',
                    alignItems: 'center',
                    // justifyContent: 'space-around',
                  }}>
                  <ScrollView>
                    {data?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setCurrentCategoryTopping(item.name);
                            setCurrentCategoryToppingId(item.id);
                            setModalVisibleListCate(false);
                          }}
                          key={index}
                          style={{
                            width: Dimensions.get('window').width * 0.7,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderBottomWidth: 0.3,
                            borderBottomColor: 'grey',
                            padding: 15,
                          }}>
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              </Modal>
              <View
                style={{
                  height: Dimensions.get('window').height * 0.4,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <View>
                  <Text>Danh mục topping</Text>
                  <TouchableOpacity
                    onPress={() => {
                      // setModalVisibleToppingDetail(false);
                      setModalVisibleListCate(true);
                    }}
                    style={{
                      height: 40,
                      width: Dimensions.get('window').width * 0.7,
                      backgroundColor: '#E8E8E8',
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                      elevation: 3,
                      marginTop: 5,
                    }}>
                    <Text>{currentCategoryTopping}</Text>
                  </TouchableOpacity>
                  <View style={{height: 120}}>
                    <ScrollView style={{marginTop: 5}}>
                      {dataToppingDetail.map((item, index) => {
                        return (
                          <View
                            key={index}
                            style={{
                              padding: 10,
                              backgroundColor: '#E8E8E8',
                              borderRadius: 8,
                              marginTop: 10,
                            }}>
                            <TextInput
                              style={{
                                height: 40,
                                borderBottomWidth: 0.8,
                                borderBottomColor: '#333333',
                                width:
                                  Dimensions.get('window').width * 0.7 - 20,
                              }}
                              placeholder="Chi tiết topping"
                              placeholderTextColor="#9C9C9C"
                              onChangeText={(text) => setToppingDetail(text)}
                              defaultValue={item?.name}
                            />
                            <TextInput
                              style={{
                                height: 40,
                                borderBottomWidth: 0.8,
                                borderBottomColor: '#333333',
                                width:
                                  Dimensions.get('window').width * 0.7 - 20,
                                marginTop: 5,
                              }}
                              placeholder="Giá tiền"
                              placeholderTextColor="#9C9C9C"
                              onChangeText={(text) => setPriceTopping(text)}
                              defaultValue={item?.price}
                            />
                          </View>
                        );
                      })}
                    </ScrollView>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      var data = dataToppingDetail;
                      data.push({name: toppingDetail, price: priceTopping});
                      const newData = [...data];
                      // newData.push({name: toppingDetail, price: priceTopping});
                      setDataToppingDetail(newData);
                    }}
                    style={{
                      height: 35,
                      width: 35,
                      borderRadius: 4,
                      backgroundColor: Color.main,
                      alignItems: 'center',
                      justifyContent: 'center',
                      alignSelf: 'flex-end',
                      marginTop: 5,
                    }}>
                    <MaterialIcons
                      name={'add'}
                      size={26}
                      style={{color: Color.white}}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      const dataCF = [...dataToppingDetail];
                      dataCF.push({name: toppingDetail, price: priceTopping});
                      dataCF.shift();
                      console.log('thaimai', dataCF);
                      var body = new FormData();
                      body.append('topping_food', JSON.stringify(dataCF));
                      body.append('_method', 'put');
                      services
                        .updateToppingFood(body, currentCategoryToppingId)
                        .then(function (response) {
                          if (response) {
                            if (response.data.code === 200) {
                              Alert.alert(
                                'Thông báo!',
                                'Cập nhật chi tiết topping thành công!',
                                [
                                  {
                                    text: 'Đồng ý',
                                    onPress: () => {
                                      services
                                        .listCategoryTopping(null, id)
                                        .then(function (response) {
                                          if (response) {
                                            if (response.data.code === 200) {
                                              setDataCategoryTopping(
                                                response?.data?.data,
                                              );
                                            }
                                          } else {
                                            return;
                                          }
                                        });
                                      setDataToppingDetail([0]);
                                      setModalVisibleToppingDetail(false);
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
                                    onPress: () => {
                                      setDataToppingDetail([0]);
                                      setModalVisibleToppingDetail(false);
                                    },
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
                                  onPress: () => {
                                    setDataToppingDetail([0]);
                                    setModalVisibleToppingDetail(false);
                                  },
                                },
                              ],
                              {cancelable: false},
                            );
                            return;
                          }
                        });
                    }}
                    style={{
                      width: Dimensions.get('window').width * 0.7,
                      marginTop: 20,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: Color.buttonColor,
                      borderRadius: 8,
                    }}>
                    <Text>Thêm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
            <Modal
              onBackdropPress={() => setModalVisibleShowTopping(false)}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalVisibleShowTopping}>
              <View
                style={{
                  height: Dimensions.get('window').height * 0.3,
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                  // justifyContent: 'space-around',
                }}>
                <ScrollView>
                  {dataShowToping?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {}}
                        key={index}
                        style={{
                          width: Dimensions.get('window').width * 0.7,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderBottomWidth: 0.3,
                          borderBottomColor: 'grey',
                          padding: 15,
                        }}>
                        <Text>
                          {item.name} - {styles.dynamicSort(item.price)} đ
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
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

              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12}}>Tình trạng</Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisibleStatus(true)}
                style={{
                  // width: '50%',
                  marginBottom: 15,
                  marginTop: 10,
                  height: 45,
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                }}>
                <Text>{status === 1 ? 'Còn hàng' : 'Hết hàng'}</Text>
              </TouchableOpacity>

              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12}}>Danh mục món ăn</Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisibleCategory(true)}
                style={{
                  // width: '50%',
                  marginBottom: 15,
                  marginTop: 10,
                  height: 45,
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                }}>
                <Text>{category.name}</Text>
              </TouchableOpacity>

              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12}}>Phân loại món ăn</Text>
              </View>
              <TouchableOpacity
                onPress={() => setModalVisibleStoreFood(true)}
                style={{
                  // width: '50%',
                  marginBottom: 15,
                  marginTop: 10,
                  height: 45,
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  padding: 10,
                  justifyContent: 'center',
                }}>
                <Text>{storeFood.name}</Text>
              </TouchableOpacity>

              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12}}>Trạng thái món ăn</Text>
              </View>
              {dataIsStatusFood.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      // setIsStatusFood(index);
                      handeChooseStatusFood(index);
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <MaterialIcons
                      name={
                        item.status === 1
                          ? 'radio-button-checked'
                          : 'radio-button-unchecked'
                      }
                      size={26}
                      color={Color.main}
                      style={{marginRight: 10}}
                    />
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
              <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12}}>Mô tả món ăn</Text>
              </View>
              <TextInput
                style={[
                  styles.text,
                  {
                    padding: 5,
                    borderColor: '#11111150',
                    borderWidth: 1,
                    marginTop: 5,
                    textAlignVertical: 'top',
                    borderRadius: 8,
                    height: 100,
                  },
                ]}
                multiline={true}
                numberOfLines={5}
                placeholder="Mô tả món ăn"
                onChangeText={(text) => setDescription(text)}
                value={description}
              />

              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12, marginBottom: 5}}>Size</Text>
                </View>
              ) : null}
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {dataSize?.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        padding: 10,
                        marginRight: 10,
                        backgroundColor: Color.white,
                        borderRadius: 6,
                      }}>
                      <Text>Tên size: {item.name}</Text>
                      <Text style={{marginTop: 5}}>
                        Giá: {styles.dynamicSort(item.price)} đ
                      </Text>
                    </View>
                  );
                })}
              </ScrollView>
              {statusFood === 'edit' ? (
                <View style={{marginTop: 10}}>
                  <Text style={{fontSize: 12, marginBottom: 5}}>
                    Danh mục topping
                  </Text>
                </View>
              ) : null}
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {dataCategoryTopping?.map((item, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        // console.log(item.topping_food);
                        setDataShowTopping(item.topping_food);
                        setModalVisibleShowTopping(true);
                      }}
                      key={index}
                      style={{
                        padding: 10,
                        marginRight: 10,
                        backgroundColor: Color.white,
                        borderRadius: 6,
                      }}>
                      <Text>Tên topping: {item.name}</Text>
                      <Text style={{marginTop: 5}}>
                        Giới hạn topping: {item.limit}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
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
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{fontWeight: '700', fontSize: 15, color: '#fff'}}>
                      Thêm món ăn
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
            {statusFood === 'edit' ? (
              <ActionButton buttonColor={Color.buttonColor}>
                <ActionButton.Item
                  buttonColor="#9b59b6"
                  title="Thêm size"
                  onPress={() => setModalVisibleSize(true)}>
                  <MaterialIcons
                    name={'add'}
                    size={26}
                    style={{color: Color.white}}
                  />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor="#3498db"
                  title="Thêm danh mục topping"
                  onPress={() => {
                    setModalVisibleCategoryTopping(true);
                  }}>
                  <MaterialIcons
                    name={'fastfood'}
                    size={26}
                    style={{color: Color.white}}
                  />
                </ActionButton.Item>
                <ActionButton.Item
                  buttonColor="#1abc9c"
                  title="Thêm chi tiết topping"
                  onPress={() => {
                    setCurrentCategoryTopping(dataCategoryTopping[0]?.name);
                    setCurrentCategoryToppingId(dataCategoryTopping[0]?.id);
                    setModalVisibleToppingDetail(true);
                    services
                      .listCategoryTopping(null, id)
                      .then(function (response) {
                        if (response) {
                          if (response.data.code === 200) {
                            setData(response?.data?.data);
                          }
                        } else {
                          return;
                        }
                      });
                  }}>
                  <MaterialIcons
                    name={'fastfood'}
                    size={26}
                    style={{color: Color.white}}
                  />
                </ActionButton.Item>
              </ActionButton>
            ) : null}
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
