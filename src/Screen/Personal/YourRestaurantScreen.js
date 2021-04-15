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
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
// import * as actionsLogin from '../Redux/Action/loginAction';
import {SafeAreaView} from 'react-native-safe-area-context';
import services from '../../Redux/Service/orderOnlineService';

const LoginScreen = (props) => {
  const [dataRestaurant, setDataRestaurant] = useState([]);

  useEffect(() => {
    services.getListStore(null).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setDataRestaurant(response.data.data);
        }
      } else {
        return;
      }
    });
  }, []);

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 10,
          backgroundColor: '#fff',
          borderRadius: 8,
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: 98, height: 96, borderRadius: 8}}
        />
        <View
          style={{
            padding: 8,
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name={'check-circle'}
                size={20}
                color={Color.buttonColor}
              />
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: '600',
                  marginLeft: 5,
                }}>
                {item.name}
              </Text>
            </View>
            <TouchableOpacity>
              <MaterialIcons name={'clear'} size={23} color={Color.main} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <MaterialIcons name={'location-on'} size={18} color={'black'} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                marginLeft: 5,
              }}>
              {item.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: Dimensions.get('window').width - 136,
              // justifyContent: 'space-between',
            }}>
            <MaterialIcons
              name={'star'}
              size={18}
              color={parseInt(item.star) > 0 ? Color.buttonColor : '#E0E0E0'}
            />
            <MaterialIcons
              name={'star'}
              size={18}
              color={parseInt(item.star) > 1 ? Color.buttonColor : '#E0E0E0'}
            />
            <MaterialIcons
              name={'star'}
              size={18}
              color={parseInt(item.star) > 2 ? Color.buttonColor : '#E0E0E0'}
            />
            <MaterialIcons
              name={'star'}
              size={18}
              color={parseInt(item.star) > 3 ? Color.buttonColor : '#E0E0E0'}
            />
            <MaterialIcons
              name={'star'}
              size={18}
              color={parseInt(item.star) > 4 ? Color.buttonColor : '#E0E0E0'}
            />
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
                flexDirection: 'column',
                justifyContent: 'space-between',
                // alignItems: 'center',
              }}
              style={{
                width: Dimensions.get('window').width - 10,
                marginTop: 5,
                borderRadius: 5,
                marginBottom: 10,
                flex: 1,
                paddingRight: 8,
              }}
              data={dataRestaurant}
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
