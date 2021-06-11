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
// import {USBPrinter, NetPrinter, BLEPrinter} from 'react-native-printer';
import services from '../../Redux/Service/incomeService';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const LoginScreen = (props) => {
  const [dataRate, setDataRate] = useState([]);

  const [page, setPage] = useState(1);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [storeName, setStoreName] = useState('');

  const [storeId, setStoreId] = useState(null);

  const [totalMoney, setTotalMoney] = useState('');

  const [dataRevenueFood, setDataRevenueFood] = useState([]);

  const [isVisibleTime, setIsVisibleTime] = useState(false);
  const [minimumDate, setMinimumDate] = useState(false);
  const [isVisibleTime2, setIsVisibleTime2] = useState(false);
  const [selectTime, setSelectTime] = useState(false);
  const [date1, setDate1] = useState(
    moment(new Date()).utcOffset(7).format('DD/MM/YYYY'),
  );
  const [timestamp1, setTimeStamp1] = useState(new Date(Date.now()));
  const [timestamp2, setTimeStamp2] = useState(new Date(Date.now()));
  const [date2, setDate2] = useState(
    moment(new Date()).utcOffset(7).format('DD/MM/YYYY'),
  );

  const handleLoadMore = () => {
    dataRate.length >= 12 ? setPage(page + 1) : null;
  };

  useEffect(() => {
    if (selectTime) {
      setModalVisibleLoading(true);
      setSelectTime(false);
      services
        .getListRevenueFoodStore(
          null,
          storeId,
          1,
          moment(timestamp1).utcOffset(7).format('YYYY-MM-DD'),
          moment(timestamp2).utcOffset(7).format('YYYY-MM-DD'),
        )
        .then(function (response) {
          if (response) {
            if (response.data.code === 200) {
              setDataRevenueFood(response?.data?.data?.list_food);
              setModalVisibleLoading(false);
              // setModalVisibleLoading(false);
              setTotalMoney(response?.data?.data?.total_money);
            }
          } else {
            return;
          }
        });
    }
  }, [selectTime]);

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreName(data.name);
        setStoreId(data.id);
        services
          .getListRevenueFoodStore(
            null,
            data.id,
            1,
            moment(timestamp1).utcOffset(7).format('YYYY-MM-DD'),
            moment(timestamp2).utcOffset(7).format('YYYY-MM-DD'),
          )
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataRevenueFood(response?.data?.data?.list_food);
                // setModalVisibleLoading(false);
                setTotalMoney(response?.data?.data?.total_money);
              }
            } else {
              return;
            }
          });
        services
          .getListRevenueStore(null, data.id, 1)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataRate(response?.data?.data?.list_revenue?.data);
                setModalVisibleLoading(false);
                // setTotalMoney(response?.data?.data?.total_money);
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
    services.getListRevenueStore(null, storeId, page).then(function (response) {
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
            Doanh thu tháng{' '}
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
          <DateTimePickerModal
            headerTextIOS="Chọn ngày bắt đầu"
            // minimumDate={new Date(Date.now())}
            maximumDate={new Date(Date.now())}
            isVisible={isVisibleTime}
            mode="date"
            onConfirm={(date) => {
              console.log(date);
              setMinimumDate(date);
              setDate1(moment(date).utcOffset(7).format('DD/MM/YYYY'));
              setTimeStamp1(date);
              setIsVisibleTime(false);
              setTimeout(() => {
                setIsVisibleTime2(true);
              }, 400);
              // setIsVisibleTime2(true)
            }}
            onCancel={() => setIsVisibleTime(false)}
          />
          <DateTimePickerModal
            // ref = {refDateEnd}
            headerTextIOS="Chọn ngày kết thúc"
            minimumDate={new Date(minimumDate)}
            maximumDate={new Date(Date.now())}
            isVisible={isVisibleTime2}
            mode="date"
            onConfirm={(date) => {
              setDate2(moment(date).utcOffset(7).format('DD/MM/YYYY'));
              setIsVisibleTime2(false);
              setTimeStamp2(date);
              setSelectTime(true);
              // handleChangeTab(2);
            }}
            onCancel={() => {
              setIsVisibleTime2(false);
            }}
          />
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              // justifyContent: 'space-between',
              height: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text>Từ ngày: </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleTime(true);
                }}
                style={{
                  height: 40,
                  width: '50%',
                  borderColor: Color.main,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>{date1}</Text>
                <MaterialIcons
                  name={'calendar-today'}
                  size={24}
                  color={Color.main}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Text>Đến ngày: </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsVisibleTime2(true);
                }}
                style={{
                  height: 40,
                  width: '50%',
                  borderColor: Color.main,
                  borderWidth: 1,
                  borderRadius: 8,
                  padding: 5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text>{date2}</Text>
                <MaterialIcons
                  name={'calendar-today'}
                  size={24}
                  color={Color.main}
                />
              </TouchableOpacity>
            </View>
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
              <Text>Tổng doanh thu</Text>
              <Text>{styles.dynamicSort(totalMoney)} đ</Text>
            </View>
            <ScrollView>
              {dataRevenueFood.map((item, index) => {
                return (
                  <View
                    style={{
                      width: '100%',
                      backgroundColor: Color.white,
                      marginBottom: 10,
                      borderRadius: 8,
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={{uri: item.image}}
                      // resizeMode="cover"
                      style={{width: 100, height: 100, borderRadius: 8}}
                    />
                    <View
                      style={{
                        padding: 10,
                        justifyContent: 'space-around',
                        height: 100,
                      }}>
                      <Text style={{fontWeight: '700'}}>{item?.name}</Text>
                      <Text style={{fontSize: 13}}>
                        Giá: {styles.dynamicSort(item?.price_discount)} đ / 1
                        sản phẩm
                      </Text>
                      <Text style={{fontSize: 13}}>
                        Số lượng: {item.total_quantity}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
            {/* <FlatList
              nestedScrollEnabled={true}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              style={{
                marginTop: 10,
                // marginBottom: 40,
                paddingBottom: 10,
                backgroundColor: 'red',
              }}
              data={dataRate}
              renderItem={renderProduct}
              keyExtractor={(item, index) => index.toString()}
              // extraData={dataOrder}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={Platform.OS === 'ios' ? 0 : 1}
              // ListFooterComponent={renderFooter}
            /> */}

            {/* <View
              style={{
                backgroundColor: Color.main,
                height: 10,
                width: Dimensions.get('window').width,
                marginTop: 10,
              }}></View> */}
            {/* {dataRate.map((item, index) => {
              return (
                <View
                  style={{
                    flexDirection: 'column',
                    // alignItems: 'center',
                    marginBottom: 10,
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
                      Doanh thu tháng{' '}
                      {item.month.substring(5, 8) + item.month.substring(0, 4)}
                    </Text>
                    <Text>{styles.dynamicSort(item.money)} đ</Text>
                  </View>
                </View>
              );
            })} */}
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
