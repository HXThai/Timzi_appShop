import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Dimensions,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../Theme/Color';
import Images from '../Theme/Images';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/HomeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

import Modal from 'react-native-modal';
import * as actionsGetListStore from '../Redux/Action/orderOnlineAction';
import {connect} from 'react-redux';
import services from './../Redux/Service/incomeService';

const Home = (props) => {
  const [dataListStore, setDataListStore] = useState([]);

  const [storeName, setStoreName] = useState('');

  const [storeId, setStoreId] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);

  const [dataDiscount, setDataDiscount] = useState([]);

  useEffect(() => {
    dataStore = storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreName(data.name);
        setStoreId(data.id);
        services
          .getListDiscountThisMonthStore(null, data.id)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataDiscount(response?.data?.data);
                // setModalVisibleLoading(false);
              }
            } else {
              return;
            }
          });
      } else {
        props.data.responseListStore?.data.forEach((element, index) => {
          if (element.status === 1) {
            setStoreName(element.name);
            setStoreId(element.id);
            storage.setItem('dataStore', element);
            services
              .getListDiscountThisMonthStore(null, element.id)
              .then(function (response) {
                if (response) {
                  if (response.data.code === 200) {
                    setDataDiscount(response?.data?.data);
                    // setModalVisibleLoading(false);
                  }
                } else {
                  return;
                }
              });
          }
        });
      }
    });
    setDataListStore(props.data.responseListStore);
  }, [props.data.responseListStore]);

  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    storage.getItem('role_id').then((data) => {
      if (data) {
        setRoleId(data);
      } else {
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <SafeAreaView style={{flex: 1}}>
            {roleId === 3 ? (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: Dimensions.get('window').height * 0.4,
                }}>
                <Text>Bạn không có quyền sử dụng chức năng này!</Text>
              </View>
            ) : (
              <View style={{padding: 10}}>
                <Modal
                  style={{alignItems: 'center', justifyContent: 'center'}}
                  isVisible={modalVisible}>
                  <View
                    style={{
                      height: '40%',
                      width: '100%',
                      backgroundColor: '#fff',
                      borderRadius: 10,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                      {dataListStore?.data?.map((item, index) => {
                        return item.status === 1 ? (
                          <View style={{}} key={index}>
                            <TouchableOpacity
                              onPress={() => {
                                setStoreName(item.name);
                                storage.setItem('dataStore', item);
                                props.navigation.reset({
                                  // index: 0,
                                  routes: [{name: 'TabNav'}],
                                });
                                setModalVisible(false);
                              }}
                              style={{
                                // height: 45,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderBottomWidth: 0.5,
                                borderColor: Color.main,
                                width: Dimensions.get('window').width * 0.8,
                              }}
                              key={index}>
                              <Text
                                style={{
                                  fontWeight: '700',
                                  fontSize: 15,
                                  marginBottom: 15,
                                  marginTop: 15,
                                }}>
                                {item.name}
                              </Text>
                            </TouchableOpacity>
                          </View>
                        ) : null;
                      })}
                    </ScrollView>
                    <TouchableOpacity
                      style={{marginTop: 10}}
                      onPress={() => setModalVisible(false)}>
                      <View
                        style={{
                          width: 90,
                          height: 35,
                          backgroundColor: Color.main,
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 25,
                          marginBottom: 10,
                        }}>
                        <Text style={[styles.text, {color: '#fff'}]}>Đóng</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </Modal>
                <ScrollView showsVerticalScrollIndicator={false}>
                  {roleId === 2 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(true);
                      }}
                      style={{
                        height: 45,
                        width: '100%',
                        backgroundColor: Color.main,
                        alignItems: 'center',
                        borderRadius: 20,
                        borderWidth: 1,
                        borderColor: Color.main,
                        marginBottom: 10,
                        justifyContent: 'center',
                        flexDirection: 'row',
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: '700',
                          color: Color.white,
                        }}>
                        {storeName}
                      </Text>
                      <MaterialIcons
                        name={'keyboard-arrow-down'}
                        size={25}
                        color={Color.white}
                      />
                    </TouchableOpacity>
                  ) : null}
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('IncomeHistoryScreen');
                    }}
                    style={{
                      width: Dimensions.get('window').width - 20,
                      height: 50,
                      paddingLeft: 15,
                      paddingRight: 15,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 8,
                      backgroundColor: Color.white,
                      flexDirection: 'row',
                      marginTop: 10,
                    }}>
                    <Text style={{fontSize: 15}}>
                      Tra cứu lịch sử doanh thu
                    </Text>
                    <MaterialIcons
                      name={'navigate-next'}
                      size={28}
                      color={Color.main}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      props.navigation.navigate('DiscountScreen');
                    }}
                    style={{
                      width: Dimensions.get('window').width - 20,
                      height: 50,
                      paddingLeft: 15,
                      paddingRight: 15,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: 8,
                      backgroundColor: Color.white,
                      flexDirection: 'row',
                      marginTop: 20,
                    }}>
                    <Text style={{fontSize: 15}}>
                      Tra cứu lịch sử chiết khấu
                    </Text>
                    <MaterialIcons
                      name={'navigate-next'}
                      size={28}
                      color={Color.main}
                    />
                  </TouchableOpacity>
                  {dataDiscount.map((item, index) => {
                    return (
                      <View>
                        <Text style={{marginTop: 20}}>
                          Chiết khấu phải thanh toán tháng{' '}
                          {item.month.substring(5, 8) +
                            item.month.substring(0, 4)}
                        </Text>
                        <TouchableOpacity
                          style={{
                            width: Dimensions.get('window').width - 20,
                            height: 50,
                            paddingLeft: 15,
                            paddingRight: 15,
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            borderRadius: 8,
                            backgroundColor: Color.white,
                            flexDirection: 'row',
                            marginTop: 10,
                          }}>
                          <View
                            style={{
                              height: 50,
                              flexDirection: 'column',
                              justifyContent: 'space-evenly',
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                              }}>
                              <Text style={{fontSize: 15}}>
                                Tổng tiền trả:{' '}
                              </Text>
                              <Text>
                                {styles.dynamicSort(item.fee_money)} đ
                              </Text>
                            </View>
                            <Text style={{fontSize: 12}}>
                              Muộn: {item.late_day} ngày
                            </Text>
                          </View>
                          <MaterialIcons
                            name={'navigate-next'}
                            size={28}
                            color={Color.main}
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            )}
          </SafeAreaView>
        </ImageBackground>
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  // console.log("data : " ,state.homeReducer);
  return {
    data: state.orderOnlineReducer,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGetListStore: (params) => {
    dispatch(actionsGetListStore.getListStore(params));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
