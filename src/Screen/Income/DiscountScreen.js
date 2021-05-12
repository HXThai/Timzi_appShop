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
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
// import {USBPrinter, NetPrinter, BLEPrinter} from 'react-native-printer';
import services from '../../Redux/Service/incomeService';

const LoginScreen = (props) => {
  const [dataRate, setDataRate] = useState([]);

  const [page, setPage] = useState(1);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [storeName, setStoreName] = useState('');

  const [storeId, setStoreId] = useState(null);

  const [totalMoney, setTotalMoney] = useState('');

  const handleLoadMore = () => {
    dataRate.length >= 12 ? setPage(page + 1) : null;
  };

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreName(data.name);
        setStoreId(data.id);
        services
          .getListDiscountStore(null, data.id, 1)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataRate(response?.data?.data?.list_revenue?.data);
                setModalVisibleLoading(false);
                setTotalMoney(response?.data?.data?.total_money);
              }
            } else {
              return;
            }
          });
      }
    });
  }, []);

  useEffect(() => {
    getData();
    return () => {};
  }, [page]);

  const getData = () => {
    services
      .getListDiscountStore(null, storeId, page)
      .then(function (response) {
        if (response) {
          if (response.data.code === 200) {
            setDataRate((prev) => [
              ...prev,
              ...response?.data?.data?.list_revenue?.data,
            ]);
            setModalVisibleLoading(false);
          }
        } else {
          return;
        }
      });
  };

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View
          style={{
            justifyContent: 'space-between',
            width: Dimensions.get('window').width - 20,
            padding: 10,
            backgroundColor: Color.white,
            borderRadius: 8,
            height: 50,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text>
            Chiết khấu tháng{' '}
            {item.month.substring(5, 8) + item.month.substring(0, 4)}
          </Text>
          <Text>{styles.dynamicSort(item.money)} đ</Text>
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
            <View
              style={{
                justifyContent: 'space-between',
                width: Dimensions.get('window').width - 20,
                padding: 10,
                backgroundColor: Color.white,
                borderRadius: 8,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Text>Tổng doanh số chiếu khấu</Text>
              <Text>{styles.dynamicSort(totalMoney)} đ</Text>
            </View>
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
              data={dataRate}
              renderItem={renderProduct}
              keyExtractor={(item, index) => index.toString()}
              // extraData={dataOrder}
              onEndReached={handleLoadMore}
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
