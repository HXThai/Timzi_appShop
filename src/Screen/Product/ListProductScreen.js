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
  TouchableOpacity,
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
import services from '../../Redux/Service/productService';
import ImageView from 'react-native-image-viewing';

const LoginScreen = (props) => {
  const [dataFood, setDataFood] = useState([]);

  const category_food_id = props?.route?.params?.category_food_id || null;

  const store_id = props?.route?.params?.store_id || null;

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [imageView, setImageView] = useState([{}]);

  const [visible, setIsVisible] = useState(false);

  // console.log(category_food_id, store_id);

  const getData = () => {
    setModalVisibleLoading(true);
    if (props?.route?.params?.type) {
      services
        .getListProductType({
          category_food_id: category_food_id,
          store_id: store_id,
          type: 'food',
        })
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataFood(response?.data?.data?.data);
              setModalVisibleLoading(false);
            }
          } else {
            return;
          }
        });
    } else {
      services
        .getListProduct({
          category_food_id: category_food_id,
          store_id: store_id,
        })
        .then(function (response) {
          // props.onGetList(response?.data);
          if (response) {
            if (response.data.code === 200) {
              setDataFood(response?.data?.data?.data);
              setModalVisibleLoading(false);
            }
          } else {
            return;
          }
        });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onShowImage = (uriImage) => {
    var img = [{uri: uriImage}];
    setImageView(img);
    setIsVisible(true);
  };

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width * 0.45,
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
            <TouchableOpacity
              onPress={() => {
                onShowImage(item.image);
              }}>
              <Image
                source={{uri: item?.image}}
                style={{
                  height: 97,
                  width: 97,
                  borderRadius: 50,
                  // resizeMode: 'stretch',
                }}
              />
            </TouchableOpacity>
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
              {styles.dynamicSort(item.price)} ??
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: '400',
                marginTop: 5,
              }}>
              999
              {'+ ???? b??n'}
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
                  Alert.alert(
                    'Xo?? m??n ??n!',
                    'B???n ch???c ch???n mu???n xo?? m??n ??n n??y?',
                    [
                      {
                        text: '?????ng ??',
                        onPress: async () => {
                          services
                            .deleteFood(null, item.id)
                            .then(function (response) {
                              if (response) {
                                if (response.data.code === 200) {
                                  getData();
                                  Alert.alert(
                                    'Th??ng b??o!',
                                    'Xo?? m??n ??n th??nh c??ng!',
                                    [
                                      {
                                        text: '?????ng ??',
                                      },
                                    ],
                                    {cancelable: false},
                                  );
                                } else {
                                  Alert.alert(
                                    'Th??ng b??o!',
                                    response.data.message,
                                    [
                                      {
                                        text: '?????ng ??',
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
                        text: 'Hu???',
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
                <Text style={{fontSize: 11}}>X??a</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // console.log(item.name);
                  props.navigation.reset({
                    // index: 0,
                    routes: [{name: 'EditProductScreen'}],
                  });
                  props.navigation.navigate('EditProductScreen', {
                    status: 'edit',
                    id: item.id,
                    name: item.name,
                    price: item.price.toString(),
                    statusFood: item.status,
                    promotion: item.price_discount.toString(),
                    category_food_id: category_food_id,
                    category_store_food: item.category_store_food_id,
                    store_id: store_id,
                    image: item.image,
                    productDetail: item,
                  });
                }}
                style={{
                  width: 42,
                  height: 20,
                  backgroundColor: Color.buttonColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 4,
                }}>
                <Text style={{fontSize: 11}}>S???a</Text>
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
          <ImageView
            images={imageView}
            imageIndex={0}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
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
                data={dataFood}
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
