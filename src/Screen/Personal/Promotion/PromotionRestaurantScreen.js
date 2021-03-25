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
  const [storeId, setStoreId] = useState(null);

  // console.log(store_id);

  const [dataPromotion, setDataPromotion] = useState([]);

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
    services.getListStorePromotion({store_id: id}).then(function (response) {
      // props.onGetList(response?.data);
      if (response) {
        // console.log('thai mai', response);
        if (response.data.code === 200) {
          setDataPromotion(response?.data?.data);
        }
      } else {
        return;
      }
    });
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('PromotionRestaurantDetailScreen', {
            id: item.id,
          });
        }}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          // alignItems: 'center',
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
          <View>
            <Image
              source={{uri: item.image}}
              style={{
                width: 122,
                height: 108,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: 5,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 108,
              padding: 5,
              // backgroundColor: 'red',
            }}>
            <View style={{width: Dimensions.get('window').width - 152}}>
              <Text
                numberOfLines={1}
                style={{
                  fontSize: 14,
                  fontWeight: '400',
                }}>
                {item.name}
              </Text>
            </View>
            <Text style={{fontSize: 12, fontWeight: '400'}}>
              Sản phẩm:{' '}
              <Text
                style={{
                  color: Color.main,
                  fontSize: 11,
                  fontWeight: '400',
                }}>
                {item.name_public}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 11,
                fontWeight: '400',
                color: 'black',
              }}>
              Thời gian: Từ{' '}
              <Text
                numberOfLines={1}
                style={{
                  color: Color.main,
                  fontSize: 11,
                  fontWeight: '400',
                }}>
                {item.time_open}
              </Text>{' '}
              đến{' '}
              <Text
                numberOfLines={1}
                style={{
                  color: Color.main,
                  fontSize: 11,
                  fontWeight: '400',
                }}>
                {item.time_close}
              </Text>
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  height: 25,
                  width: 90,
                  marginRight: 10,
                  backgroundColor: Color.buttonColor,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    color: 'black',
                  }}>
                  Xóa
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 25,
                  width: 90,
                  backgroundColor:
                    item.status === 1 ? Color.main : Color.buttonColor,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: '400',
                    color: item.status === 1 ? Color.white : 'black',
                  }}>
                  {item.status === 0
                    ? 'Chưa diễn ra'
                    : item.status === 1
                    ? 'Đang diễn ra'
                    : 'Đã hết hạn'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <FontAwesomeIcon
          color="#898989"
          icon={faChevronRight}
          size={20}
          style={{}}
          color={Color.main}
        /> */}
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
