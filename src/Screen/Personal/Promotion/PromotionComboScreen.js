import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Images from '../../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../../Styles/NotificationStyles';
import Color from '../../../Theme/Color';
import {ScrollView} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import services from '../../../Redux/Service/promotionService';
import storage from './../../asyncStorage/Storage';

const LoginScreen = (props) => {
  const [dataPromotion, setDataPromotion] = useState([]);

  const [storeId, setStoreId] = useState(null);

  useEffect(() => {
    // console.log(props.data.responseListStore?.code);
    storage.getItem('dataStore').then((data) => {
      // console.log(data);
      if (data) {
        // setStoreName(data.name);
        setStoreId(data.id);
        getData(data.id);
      } else {
      }
    });
  }, []);

  const getData = (id) => {
    services.getListComboStore(null, id).then(function (response) {
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
  };

  const handleDeleteCombo = (id) => {
    // console.log(id);
    Alert.alert(
      'Xóa combo!',
      'Bạn có chắc muốn xóa combo này không?',
      [
        {
          text: 'Đồng ý',
          onPress: () => {
            services.deleteComboStore(null, id).then(function (response) {
              // props.onGetList(response?.data);
              if (response) {
                // console.log('thai mai', response);
                if (response.data.code === 200) {
                  // Alert.alert(
                  //   'Thông báo!',
                  //   'Xóa combo thành công!',
                  //   [
                  //     {
                  //       text: 'Đồng ý',
                  //       onPress: () => {
                  //         props.navigation.reset({
                  //           index: 0,
                  //           routes: [{name: 'PromotionComboScreen'}],
                  //         });
                  //         props.navigation.navigate('PromotionComboScreen');
                  //       },
                  //     },
                  //   ],
                  //   {cancelable: false},
                  // );
                  props.navigation.reset({
                    index: 0,
                    routes: [{name: 'PromotionComboScreen'}],
                  });
                  props.navigation.navigate('PromotionComboScreen');
                }
              } else {
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
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('PromotionComboDetailScreen', {
            id: item.id,
          });
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 15,
          backgroundColor: Color.white,
          borderRadius: 10,
          // padding: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            // backgroundColor: 'red',
          }}>
          <Image
            source={{uri: item.image.toString()}}
            style={{
              width: 122,
              height: 108,
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          />
          <View
            style={{
              marginLeft: 5,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 108,
              padding: 5,
              // backgroundColor: 'red',
            }}>
            <Text style={{fontSize: 11, fontWeight: '600'}}>
              Tên combo: {item.name}
            </Text>
            <Text style={{fontSize: 11, fontWeight: '600'}}>
              Số lượng combo: {item.quantity}
            </Text>
            <Text style={{fontSize: 11, fontWeight: '600'}}>
              {item.time_open} - {item.time_close}
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: Color.main,
              }}>
              Tổng combo: {styles.dynamicSort(item.price)}
              {'đ '}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 108,
            padding: 8,
          }}>
          <View
            style={{
              width: 80,
              height: 25,
              backgroundColor:
                item.status === 1 ? Color.main : Color.buttonColor,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 4,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: item.status === 1 ? Color.white : 'black',
              }}>
              {item.status === 1 ? 'Đang diễn ra' : 'Sắp diễn ra'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleDeleteCombo(item.id)}
            style={{
              width: 46,
              height: 25,
              backgroundColor: Color.buttonColor,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              borderRadius: 4,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: 'black',
              }}>
              Xóa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('EditComboScreen', {
                id: item.id,
              })
            }
            style={{
              width: 46,
              height: 25,
              backgroundColor: Color.buttonColor,
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'flex-end',
              borderRadius: 4,
            }}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '600',
                color: 'black',
              }}>
              Sửa
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                // alignItems: 'center',
              }}
              style={{
                width: Dimensions.get('window').width - 10,
                marginTop: 5,
                // marginLeft: 10,
                borderRadius: 5,
                marginBottom: 10,
                flex: 1,
                // paddingLeft: 5,
                paddingRight: 8,
              }}
              data={dataPromotion}
              renderItem={renderProduct}
              keyExtractor={(item, index) => index.toString()}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0}
              // ListFooterComponent={renderFooter}
            />
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                backgroundColor: Color.buttonColor,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontWeight: '700', fontSize: 15}}>Dừng tất cả</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 50,
                width: '100%',
                backgroundColor: Color.main,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{fontWeight: '700', fontSize: 15, color: Color.white}}>
                Xác nhận tất cả
              </Text>
            </TouchableOpacity>
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
