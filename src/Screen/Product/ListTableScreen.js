import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
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
import services from '../../Redux/Service/productService';
import QRCode from 'react-native-qrcode-svg';
import reactotron from 'reactotron-react-native';
import RNFetchBlob from 'rn-fetch-blob';

const LoginScreen = (props) => {
  const store_id = props?.route?.params?.store_id || null;

  const [modalVisible, setModalVisible] = useState(false);
  const [urlImage, setUrlImage] = useState('');
  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);
  const refSvg = useRef('refSvg');

  const getData = () => {
    setModalVisibleLoading(true);
    services.storeDetail(store_id).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setDataOrderTable(response?.data?.data?.store?.table_store);
          setModalVisibleLoading(false);
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const [dataOrderTable, setDataOrderTable] = useState([]);

  const [chooseTable, setChooseTable] = useState({});
  const saveQRCode = () => {
    refSvg.current.toDataURL(callback);
  };

  const callback = (dataURL) => {
    reactotron.log(dataURL);
    let shareImageBase64 = {
      title: 'React Native',
      url: `data:image/png;base64,${dataURL}`,
      subject: 'Share Link', //  for email
    };
    // reactotron.log(shareImageBase64);
    // Share.open(shareImageBase64).catch(error => console.log(error));
  };
  const handleItem = (item) => {
    const payload = {
      table_store_id: item.id,
    };
    services.genQrCode(payload).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setUrlImage(response?.data.data);
        }
      } else {
        return;
      }
    });
  };
  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          handleItem(item);
          // setChooseTable(item);
          setModalVisible(true);
        }}
        style={{
          width: Dimensions.get('window').width * 0.45,
          marginBottom: 15,
        }}>
        <View
          style={{
            width: '85%',
            borderRadius: 8,
            backgroundColor: '#fff',
            alignItems: 'center',
            // marginRight: 10,
            marginTop: 15,
          }}>
          <View
            style={{
              alignItems: 'center',
              width: '100%',
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
              }}>
              <Image
                source={
                  item.status === 2
                    ? Images.iconOrderOfflineGrey
                    : Images.iconOrderOfflineYellow
                }
                style={{height: 64, width: 64}}
              />
              <Text style={{color: '#fff', position: 'absolute'}}>
                {item.number_table}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '700',
                marginTop: 10,
              }}>
              Bàn số {item.number_table}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                marginTop: 5,
              }}>
              {item.number_people_min} - {item.number_people_max} chỗ ngồi
            </Text>
            <View
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
                onPress={() => {
                  Alert.alert(
                    'Xoá bàn ăn!',
                    'Bạn chắc chắn muốn xoá bàn ăn này?',
                    [
                      {
                        text: 'Đồng ý',
                        onPress: async () => {
                          services
                            .deleteTable(null, item.id)
                            .then(function (response) {
                              if (response) {
                                if (response.data.code === 200) {
                                  getData();
                                  Alert.alert(
                                    'Thông báo!',
                                    'Xoá bàn ăn thành công!',
                                    [
                                      {
                                        text: 'Đồng ý',
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
                                return;
                              }
                            });
                        },
                      },
                      {
                        text: 'Huỷ',
                      },
                    ],
                    {cancelable: false},
                  );
                }}
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
                onPress={() =>
                  props.navigation.navigate('EditTableScreen', {
                    status: 'edit',
                    // data: dataOrderTable[index],
                    dataTable: item,
                    store_id: store_id,
                  })
                }
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
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const checkPermission = async () => {
    // Function to check the platform
    // If iOS then start downloading
    // If Android then ask for permission

    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Yêu cầu quyền lưu trữ',
            message:
              'Ứng dụng cần quyền truy cập vào bộ nhớ của bạn để tải xuống ảnh.',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Đã cấp quyền lưu trữ.');
          downloadImage();
        } else {
          // If permission denied then show alert
          alert('Quyền lưu trữ không được cấp.');
        }
      } catch (err) {
        // To handle permission related exception
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    // Main function to download the image

    // To add the time suffix in filename
    let date = new Date();
    // Image URL which we want to download
    let image_URL = urlImage;
    // Getting the extention of the file
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    // Get config and fs from RNFetchBlob
    // config: To pass the downloading related options
    // fs: Directory path where we want our image to download
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then((res) => {
        // Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        Alert.alert(
          'Thông báo!',
          'Tải ảnh thành công!',
          [
            {
              text: 'Đồng ý',
              onPress: () => {
                setModalVisible(false);
                // setModalVisibleLoading(false);
                // setModalVisible(false);
              },
            },
          ],
          {cancelable: false},
        );
      });
  };

  const getExtention = (filename) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
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
                height: '40%',
                width: '80%',
                backgroundColor: 'white',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Image
                style={{width: '80%', height: '80%'}}
                source={{uri: urlImage}}
              />
              {/* <Text style={{ fontSize: 16, fontWeight: '700' }}>
                QR code bàn số {chooseTable.number_table}
              </Text> */}
              {/* <QRCode value={chooseTable.code}
                size={250}
                getRef={refSvg}
              /> */}
              <TouchableOpacity
                onPress={() => {
                  checkPermission();
                }}
                style={{
                  height: 40,
                  width: 100,
                  borderRadius: 6,
                  backgroundColor: Color.main,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{color: Color.white, fontSize: 16, fontWeight: '700'}}>
                  Tải xuống
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          {modalVisibleLoading === true ? (
            <View
              style={{
                height: Dimensions.get('window').height,
                width: Dimensions.get('window').width,
                position: 'absolute',
                // backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size="large" color={Color.main} />
            </View>
          ) : null}
          {modalVisibleLoading === false ? (
            <View
              style={{
                padding: 10,
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
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
                data={dataOrderTable}
                renderItem={renderProduct}
                keyExtractor={(item, index) => index.toString()}
                // onEndReached={handleLoadMore}
                // onEndReachedThreshold={0}
                // ListFooterComponent={renderFooter}
              />
            </View>
          ) : null}
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
