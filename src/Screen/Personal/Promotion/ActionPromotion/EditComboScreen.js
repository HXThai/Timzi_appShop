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
  FlatList,
} from 'react-native';
import Images from '../../../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../../Styles/NotificationStyles';
import Color from '../../../../Theme/Color';
import {ScrollView} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import storage from './../../../asyncStorage/Storage';
import services from '../../../../Redux/Service/productService';
import servicesPromotion from '../../../../Redux/Service/promotionService';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const LoginScreen = (props) => {
  const promotion_id = props?.route?.params?.id || null;
  const [dataProduct, setDataProduct] = useState([]);
  const [name, setName] = useState('');
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [percent, setPercent] = useState('');
  const [content, setContent] = useState('');
  const [namePublic, setNamePublic] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const [filePath, setFilePath] = useState({});

  const [modalVisible, setModalVisible] = useState(false);

  const [modalSelectProductVisible, setModalSelectProductVisible] = useState(
    false,
  );

  const [dataFood, setDataFood] = useState([]);

  const [storeId, setStoreId] = useState(null);

  const [dataPromotion, setDataPromotion] = useState({});

  const [urlImage, setUrlImage] = useState('');

  const [nameImage, setNameImage] = useState('anhcombo.jpeg');

  useEffect(() => {
    servicesPromotion
      .promotionComboDetail({id: promotion_id})
      .then(function (response) {
        // props.onGetList(response?.data);
        if (response) {
          console.log('thai mai', response);
          if (response.data.code === 200) {
            // setDataPromotion(response?.data?.data);
            setUrlImage(response?.data?.data?.image);
            setName(response?.data?.data?.name.toString());
            setPrice(response?.data?.data?.price.toString());
            setQuantity(response?.data?.data?.quantity.toString());
            setContent(response?.data?.data?.content?.toString());
            setDateOpen(response?.data?.data?.time_open);
            setDateClose(response?.data?.data?.time_close);
            setDataProduct(response?.data?.data?.food);
          }
        } else {
          return;
        }
      });
  }, []);

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
        // setFilePath(response);
        setUrlImage(response.uri);
        setNameImage(response.fileName);
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
      // setFilePath(response);
      setUrlImage(response.uri);
      setNameImage(response.fileName);
    });
  };

  useEffect(() => {
    storage.getItem('dataStore').then((data) => {
      // console.log(data);
      if (data) {
        setStoreId(data.id);
        // console.log(data.id);
      } else {
      }
    });
  }, []);

  const handleAddProduct = () => {
    (async () => {
      const res = await services.storeDetail(storeId);
      // setdata(res?.data?.data?.store);
      // console.log(res?.data?.data?.category_food);
      var listFood = [];
      res?.data?.data?.category_food?.forEach((element) => {
        element.food.forEach((item) => {
          listFood.push(item);
        });
      });
      // console.log(listFood);
      // console.log(dataProduct);
      if (dataProduct.length === listFood.length) {
        setDataFood([]);
      } else {
        if (dataProduct.length !== 0) {
          var newDataFood = [];
          setDataFood([]);
          listFood.forEach((element) => {
            // const newData = dataProduct.filter((item) => item.id !== id);
            // setDataProduct(newData);
            var check = false;
            dataProduct.forEach((item) => {
              if (item.id == element.id) {
                check = true;
                return;
              }
            });
            if (!check) {
              newDataFood.push(element);
            }
          });
          // console.log(newDataFood);
          setDataFood(newDataFood);
        } else {
          setDataFood(listFood);
        }
      }
    })();
    setModalSelectProductVisible(true);
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
    // console.log(
    //   'A date has been picked: ',
    //   moment(new Date(date.toString().substr(0, 16))).format('DD/MM/YYYY'),
    // );
    // console.log(
    //   moment(new Date(date.toString().substr(0, 16))).format('YYYY-MM-DD') ===
    //     '2021-02-28',
    // );
    setDateOpen(
      moment(new Date(date.toString().substr(0, 16))).format('DD-MM-YYYY'),
    );
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
    // console.log(
    //   'A date has been picked: ',
    //   moment(new Date(date.toString().substr(0, 16))).format('DD/MM/YYYY'),
    // );
    // console.log(
    //   moment(new Date(date.toString().substr(0, 16))).format('YYYY-MM-DD') ===
    //     '2021-02-28',
    // );
    setDateClose(
      moment(new Date(date.toString().substr(0, 16))).format('DD-MM-YYYY'),
    );
    hideDatePickerClose();
  };

  const [dateClose, setDateClose] = useState(
    moment(new Date()).format('DD-MM-YYYY'),
  );

  const handleAddPromotion = () => {
    // console.log(foodId);
    var body = new FormData();
    dataProduct.forEach((element) => {
      body.append('food_id[]', element.id);
    });
    body.append('store_id', storeId.toString());
    body.append('name', name);
    // body.append('image', data);
    body.append('image', {
      name: `${nameImage}`,
      type: 'image/jpeg',
      uri: urlImage,
    });
    body.append('price', price);
    body.append('quantity', quantity);
    body.append('time_open', dateOpen);
    body.append('time_close', dateClose);
    body.append('content', content);
    body.append('_method', 'put');

    servicesPromotion
      .editComboStore(body, promotion_id)
      .then(function (response) {
        // props.onGetList(response?.data);
        if (response) {
          console.log('thai', response);
          if (response.data.code === 200) {
            Alert.alert(
              'Thông báo!',
              'Sửa combo thành công!',
              [
                {
                  text: 'Đồng ý',
                  onPress: () => {
                    props.navigation.reset({
                      index: 0,
                      routes: [{name: 'PromotionComboScreen'}],
                    });
                    props.navigation.navigate('PromotionComboScreen');
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
            'Sửa combo thất bại!',
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

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          width: Dimensions.get('window').width * 0.4,
          marginBottom: 15,
        }}>
        <View
          style={{
            width: '85%',
            borderRadius: 8,
            // backgroundColor: '#fff',
            height: 206,
            alignItems: 'center',
            marginRight: 10,
            marginLeft: 7,
            flexDirection: 'column',
            marginTop: 15,
            // justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 160,
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
              source={{uri: item?.image}}
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
              {styles.dynamicSort(item.price)} đ
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
            <View
              style={{
                height: 35,
                width: 128,
                alignItems: 'center',
                justifyContent: 'space-evenly',
                marginTop: 12,
                borderTopWidth: 1,
                borderTopColor: '#E0E0E0',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                onPress={() => {
                  dataProduct.push(item);
                  setModalSelectProductVisible(false);
                }}
                style={{
                  width: 50,
                  height: 22,
                  backgroundColor: Color.buttonColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}>
                <Text style={{fontSize: 11}}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
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
            <DateTimePickerModal
              isVisible={isDatePickerOpenVisible}
              mode="date"
              onConfirm={handleConfirmDateOpen}
              onCancel={hideDatePickerOpen}
            />
            <DateTimePickerModal
              isVisible={isDatePickerCloseVisible}
              mode="date"
              onConfirm={handleConfirmDateClose}
              onCancel={hideDatePickerClose}
            />
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
              onBackdropPress={() => setModalSelectProductVisible(false)}
              style={{alignItems: 'center', justifyContent: 'center'}}
              isVisible={modalSelectProductVisible}>
              <View
                style={{
                  height: '60%',
                  width: '100%',
                  backgroundColor: '#fff',
                  borderRadius: 10,
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                  backgroundColor: '#E8E8E8',
                }}>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                  }}
                  style={{
                    width: Dimensions.get('window').width - 10,
                    marginTop: 5,
                    marginLeft: 10,
                    borderRadius: 5,
                    marginBottom: 10,
                    flex: 1,
                    paddingLeft: 5,
                    paddingRight: 5,
                  }}
                  data={dataFood}
                  renderItem={renderProduct}
                  keyExtractor={(item, index) => index.toString()}
                  // onEndReached={handleLoadMore}
                  // onEndReachedThreshold={0}
                  // ListFooterComponent={renderFooter}
                />
              </View>
            </Modal>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: '50%'}}>
                  <Image
                    source={{uri: urlImage}}
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
                    <Text style={{fontSize: 18}}>Thêm ảnh</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Tên combo</Text>
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
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Tên combo"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setName(text)}
                  defaultValue={name}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Giá combo</Text>
              </View>
              <View
                style={{
                  width: '100%',
                  // marginTop: 20,
                  justifyContent: 'center',
                }}>
                <TextInput
                  keyboardType={'number-pad'}
                  style={{
                    height: 40,
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Giá combo"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setPrice(text)}
                  defaultValue={price}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Số lượng combo</Text>
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
                    borderBottomWidth: 0.5,
                    borderBottomColor: '#333333',
                  }}
                  placeholder="Số lượng combo"
                  placeholderTextColor="#333333"
                  onChangeText={(text) => setQuantity(text)}
                  defaultValue={quantity}
                  keyboardType={'number-pad'}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Text style={{fontSize: 12}}>Giá combo</Text>
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
                    borderRadius: 10,
                  },
                ]}
                multiline={true}
                numberOfLines={5}
                placeholder="Nội dung"
                onChangeText={(text) => setContent(text)}
                value={content}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <Text>Thời gian bắt đầu: </Text>
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
                <Text>Thời gian kết thúc: </Text>
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
              {dataProduct.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      marginTop: 25,
                      backgroundColor: Color.white,
                      height: 88,
                      borderRadius: 8,
                    }}>
                    <Image
                      source={{uri: item.image}}
                      style={{
                        height: 88,
                        width: 88,
                        // marginLeft: -5,
                        borderRadius: 8,
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
                        {item.name}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={{fontWeight: '700', fontSize: 15}}>
                          {styles.dynamicSort(item.price_discount)} đ
                        </Text>
                        <Text
                          style={{
                            fontWeight: '700',
                            fontSize: 15,
                            marginLeft: 5,
                            textDecorationLine: 'line-through',
                          }}>
                          {styles.dynamicSort(item.price)} đ
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => {
                          var id = item.id;
                          Alert.alert(
                            'Thông báo!',
                            'Bạn chắc chắn muốn xóa sản phẩm khỏi chương trình?',
                            [
                              {text: 'Hủy'},
                              {
                                text: 'Đồng ý',
                                onPress: () => {
                                  const newData = dataProduct.filter(
                                    (item) => item.id !== id,
                                  );
                                  setDataProduct(newData);
                                },
                              },
                            ],
                          );
                        }}
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
                );
              })}

              <TouchableOpacity
                onPress={() => {
                  handleAddProduct();
                }}
                style={{
                  height: 40,
                  width: '40%',
                  backgroundColor: Color.buttonColor,
                  borderRadius: 20,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                  alignSelf: 'flex-end',
                }}>
                <Text style={{fontWeight: '700', fontSize: 14, color: 'black'}}>
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
                onPress={() => handleAddPromotion()}
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
