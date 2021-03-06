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
  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreId(data.id);
        services
          .getListProgramSystemWithStore(null, data.id)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataPromotion(response?.data?.data?.list_program);
                setModalVisibleLoading(false);
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
      'Th??ng b??o',
      'B???n ch???c ch???n mu???n d???ng tham gia ch????ng tr??nh n??y?',
      [
        {text: 'H???y', onPress: () => {}},
        {
          text: '?????ng ??',
          onPress: async () => {
            services
              .stopProgramSystemWithStore({program_id: id, store_id: storeId})
              .then(function (response) {
                if (response) {
                  if (response.data.code === 200) {
                    Alert.alert(
                      'Th??ng b??o',
                      'D???ng ch????ng tr??nh th??nh c??ng!',
                      [
                        {
                          text: '?????ng ??',
                          onPress: () => {
                            services
                              .getListProgramSystemWithStore(null, storeId)
                              .then(function (response) {
                                if (response) {
                                  if (response.data.code === 200) {
                                    setDataPromotion(
                                      response?.data?.data?.list_program,
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
                      'Th??ng b??o',
                      response.data.message,
                      [{text: '?????ng ??', onPress: () => {}}],
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
      <View
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
              N???i dung:{' '}
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
              Th???i gian:{' '}
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

            <TouchableOpacity
              onPress={() => {
                handleJoin(item?.id);
              }}
              style={{
                height: 25,
                width: 90,
                backgroundColor: Color.red,
                borderRadius: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 11,
                  fontWeight: '400',
                  color: Color.white,
                }}>
                D???ng tham gia
              </Text>
            </TouchableOpacity>
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
