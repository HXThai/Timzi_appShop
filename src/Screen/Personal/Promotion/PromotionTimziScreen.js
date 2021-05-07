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
  ActivityIndicator,
  RefreshControl,
  Platform,
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

const LoginScreen = (props) => {
  const [storeId, setStoreId] = useState(null);
  const [dataPromotion, setDataPromotion] = useState([]);

  useEffect(() => {
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreId(data.id);
        services
          .getListProgramSystem(null, data.id, 1)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataPromotion(response?.data?.data?.list_program?.data);
                // setModalVisibleLoading(false);
              }
            } else {
              return;
            }
          });
      } else {
      }
    });
  }, []);

  const handleJoin = (id) => {
    Alert.alert(
      'Thông báo',
      'Bạn chắc chắn muốn tham gia chương trình này?',
      [
        {text: 'Hủy', onPress: () => {}},
        {
          text: 'Đồng ý',
          onPress: async () => {
            services
              .receiveProgramSystem({program_id: id, store_id: storeId})
              .then(function (response) {
                if (response) {
                  if (response.data.code === 200) {
                    Alert.alert(
                      'Thông báo',
                      'Tham gia chương trình thành công!',
                      [
                        {
                          text: 'Đồng ý',
                          onPress: () => {
                            services
                              .getListProgramSystem(null, storeId, 1)
                              .then(function (response) {
                                if (response) {
                                  if (response.data.code === 200) {
                                    setDataPromotion(
                                      response?.data?.data?.list_program?.data,
                                    );
                                    // setModalVisibleLoading(false);
                                  }
                                } else {
                                  return;
                                }
                              });
                          },
                        },
                      ],
                      {cancelable: false},
                    );
                  } else {
                    Alert.alert(
                      'Thông báo',
                      response.data.message,
                      [{text: 'Đồng ý', onPress: () => {}}],
                      {cancelable: false},
                    );
                  }
                } else {
                  return;
                }
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const renderProduct = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('PromotionTimziDetailScreen', {
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
          <View>
            <Image
              source={{uri: item.image.toString()}}
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
              // marginLeft: 5,
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
                  fontSize: 15,
                  fontWeight: '400',
                }}>
                {item?.name}
              </Text>
            </View>
            <Text style={{fontSize: 12, fontWeight: '400'}}>
              Nội dung:{' '}
              <Text
                style={{
                  color: Color.main,
                  fontSize: 12,
                  fontWeight: '400',
                  width: Dimensions.get('window').width * 0.6,
                  numberOfLines: 1,
                }}>
                {item?.content}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: 'black',
              }}>
              Thời gian:{' '}
              <Text
                numberOfLines={1}
                style={{
                  color: Color.main,
                  fontSize: 12,
                  fontWeight: '400',
                }}>
                {item?.time_open + ' - ' + item?.time_close}
              </Text>
            </Text>
            {item?.status_store === 0 ? (
              <TouchableOpacity
                onPress={() => {
                  handleJoin(item?.id);
                }}
                style={{
                  height: 25,
                  width: 90,
                  backgroundColor: Color.main,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: Color.white,
                  }}>
                  Tham gia
                </Text>
              </TouchableOpacity>
            ) : (
              <View
                style={{
                  height: 25,
                  width: 90,
                  backgroundColor: Color.grey,
                  borderRadius: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '400',
                    color: Color.white,
                  }}>
                  Đã tham gia
                </Text>
              </View>
            )}
          </View>
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
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              style={{
                marginTop: 10,
                marginBottom: 40,
              }}
              data={dataPromotion}
              renderItem={renderProduct}
              keyExtractor={(item, index) => index.toString()}
              // extraData={dataOrder}
              // onEndReached={handleLoadMore}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
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
