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
  DeviceEventEmitter,
  FlatList,
  ActivityIndicator,
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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import services from '../../Redux/Service/promotionService';

const LoginScreen = (props) => {
  const [dataRate, setDataRate] = useState([]);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('dataStore').then((data) => {
      if (data) {
        services.getListRateOfUser(null, data.id).then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataRate(response?.data?.data?.data);
              setModalVisibleLoading(false);
            }
          } else {
            return;
          }
        });
      }
    });
  }, []);

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 25,
          // paddingBottom: 20,
          // backgroundColor: Color.white,
          // borderTopLeftRadius: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: Dimensions.get('window').width,
          }}>
          <Image
            source={{uri: item?.user?.avatar}}
            style={{width: 80, height: 80, borderRadius: 6}}
          />
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginLeft: 10,
            }}>
            <Text style={{fontWeight: '700', fontSize: 15, marginTop: 5}}>
              Khách hàng: {item?.user?.name}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <MaterialIcons
                name={'star'}
                size={30}
                color={item.star > 0 ? Color.buttonColor : '#E0E0E0'}
              />
              <MaterialIcons
                name={'star'}
                size={30}
                color={item.star > 1 ? Color.buttonColor : '#E0E0E0'}
              />
              <MaterialIcons
                name={'star'}
                size={30}
                color={item.star > 2 ? Color.buttonColor : '#E0E0E0'}
              />
              <MaterialIcons
                name={'star'}
                size={30}
                color={item.star > 3 ? Color.buttonColor : '#E0E0E0'}
              />
              <MaterialIcons
                name={'star'}
                size={30}
                color={item.star > 4 ? Color.buttonColor : '#E0E0E0'}
              />
            </View>
          </View>
        </View>
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: 'grey',
            borderRadius: 10,
            marginTop: 5,
            width: Dimensions.get('window').width - 20,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '400',
              width: Dimensions.get('window').width - 40,
            }}>
            {item?.content}
          </Text>
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
              // key={}
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
              data={dataRate}
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
