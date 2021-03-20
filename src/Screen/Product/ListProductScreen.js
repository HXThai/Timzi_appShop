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
} from 'react-native';
import Images from '../../Theme/Images';
import ToggleSwitch from 'toggle-switch-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from '../Styles/NotificationStyles';
import Color from '../../Theme/Color';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Swipeout from 'react-native-swipeout';
// import loginService from '../Redux/Service/LoginService';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import services from '../../Redux/Service/productService';

const LoginScreen = (props) => {
  const [dataFood, setDataFood] = useState([]);

  const category_food_id = props?.route?.params?.category_food_id || null;

  const store_id = props?.route?.params?.store_id || null;

  // console.log(category_food_id, store_id);

  const getData = () => {
    services
      .getListProduct({category_food_id: category_food_id, store_id: store_id})
      .then(function (response) {
        // props.onGetList(response?.data);
        if (response) {
          // console.log('thai mai', response);
          if (response.data.code === 200) {
            // setDataProduct(response?.data?.data?.data);
            // console.log(response.data.data.data);
            // console.log(response?.data?.data);
            setDataFood(response?.data?.data?.data);
          }
        } else {
          return;
        }
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
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
                onPress={() => {
                  // console.log(item.name);
                  props.navigation.reset({
                    index: 0,
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
                    store_id: store_id,
                    image: item.image,
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
                <Text style={{fontSize: 11}}>Sửa</Text>
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
