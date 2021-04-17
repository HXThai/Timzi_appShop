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
import storage from './asyncStorage/Storage';
import services from '../Redux/Service/productService';

const Home = (props) => {
  const [dataListStore, setDataListStore] = useState([]);

  const [storeId, setStoreId] = useState(null);

  const [storeName, setStoreName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState(null);

  // useEffect(() => {
  //   const dataStore = storage.getItem('dataStore');
  //   console.log('thai', storage.getItem('dataStore'));
  // });

  useEffect(() => {
    // console.log('thai meo');
    // console.log(props.data.responseListStore?.code);
    storage.getItem('dataStore').then((data) => {
      // console.log(data);
      if (data) {
        setStoreName(data.name);
        setStoreId(data.id);
        services.storeDetail(data.id).then(function (response) {
          if (response) {
            // console.log('thai', response);
            if (response.data.code === 200) {
              setData(response?.data?.data);
            }
          } else {
            return;
          }
        });
      } else {
        setStoreName(props.data.responseListStore?.data[0]?.name);
        setStoreId(props.data.responseListStore?.data[0]?.id);
        services
          .storeDetail(props.data.responseListStore?.data[0]?.id)
          .then(function (response) {
            // props.onGetList(response?.data);
            // console.log(response);
            if (response) {
              // console.log('thai', response?.data?.status);
              if (response?.data?.code === 200) {
                setData(response?.data?.data);
              }
            } else {
              return;
            }
          });
      }
    });
    setDataListStore(props.data.responseListStore);
  }, [props.data.responseListStore]);

  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    storage.getItem('role_id').then((data) => {
      // console.log(data);
      if (data) {
        // console.log('role', data);
        setRoleId(data);
      } else {
      }
    });
  }, []);

  return (
    // <View style={{backgroundColor: 'green', flex: 1}}>
    //   <SafeAreaView style={{flex: 1}}>
    //     <View style={styles.container}></View>
    //   </SafeAreaView>
    // </View>
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <SafeAreaView style={{flex: 1}}>
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
                      return (
                        <View style={{}} key={index}>
                          <TouchableOpacity
                            onPress={() => {
                              // console.log(item);
                              setStoreName(item.name);
                              storage.setItem('dataStore', item);
                              props.navigation.reset({
                                index: 0,
                                routes: [{name: 'TabNav'}],
                              });
                              // props.navigation.reset({
                              //   index: 0,
                              //   routes: [{name: 'EarnCoin'}],
                              // });
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
                      );
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
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{marginBottom: 20}}>
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
                <View
                  style={{
                    // marginTop: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        height: 70,
                        width: '100%',
                        marginTop: 25,
                      }}>
                      <TextInput
                        style={{
                          height: 45,
                          color: '#000000',

                          borderColor: Color.main,
                          borderWidth: 1,
                          borderRadius: 20,
                          paddingLeft: 20,
                        }}
                        placeholder="Tìm đơn?"
                        placeholderTextColor="gray"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      // width: '100%',
                      justifyContent: 'flex-end',
                      alignSelf: 'flex-end',
                      height: 45,
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <TouchableOpacity onPress={() => {}}>
                      <MaterialIcons
                        name={'search'}
                        size={26}
                        color={Color.main}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  style={{marginTop: 10}}
                  onPress={() =>
                    props.navigation.navigate('InformationRestaurantScreen', {
                      store_params: storeId,
                    })
                  }>
                  <View
                    style={{
                      flexDirection: 'column',
                      backgroundColor: '#fff',
                      borderRadius: 8,
                    }}>
                    <Image
                      source={{uri: data?.store?.image}}
                      style={{height: 140, width: '100%', borderRadius: 8}}
                    />
                    <View
                      style={{
                        flexDirection: 'row',
                        padding: 10,
                        width: '100%',
                      }}>
                      <View style={{width: '10%'}}>
                        <MaterialIcons
                          name={'check-circle'}
                          size={25}
                          style={{color: Color.buttonColor}}
                        />
                      </View>
                      <View
                        style={{
                          justifyContent: 'space-between',
                          flexDirection: 'column',
                          width: '90%',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',

                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 19, fontWeight: '600'}}>
                            {data?.store?.name}
                          </Text>
                          <View
                            style={{
                              padding: 5,
                              backgroundColor: Color.buttonColor,
                              borderRadius: 4,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: '#fff',
                              }}>
                              Yêu thích
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 5,
                            alignItems: 'center',
                          }}>
                          <Text style={{fontSize: 13, fontWeight: '400'}}>
                            {data?.store?.address}
                          </Text>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 13,
                                color: 'black',
                              }}>
                              {data?.store?.star}
                            </Text>
                            <MaterialIcons
                              name={'star'}
                              size={20}
                              color={Color.buttonColor}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      Đặt bàn
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('EditTableScreen', {
                          status: 'add',
                          store_id: storeId,
                        })
                      }
                      style={{
                        padding: 5,
                        borderRadius: 4,
                        marginLeft: 10,
                        borderWidth: 1,
                        borderColor: Color.main,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.main,
                        }}>
                        Thêm bàn
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate('ListTableScreen', {
                        store_id: storeId,
                      })
                    }>
                    <Text style={{fontStyle: 'italic'}}>Quản lý bàn</Text>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  style={{marginTop: 20}}>
                  {data?.store?.table_store?.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={{
                          width: 128,
                          borderRadius: 8,
                          backgroundColor: '#fff',
                          alignItems: 'center',
                          marginRight: 10,
                        }}>
                        <View
                          style={{
                            alignItems: 'center',
                            width: '100%',
                          }}>
                          <View
                            style={{
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginTop: 10,
                            }}>
                            <Image
                              source={
                                item.status === 'Hết chỗ'
                                  ? Images.iconOrderOfflineGrey
                                  : Images.iconOrderOfflineYellow
                              }
                              style={{height: 64, width: 64}}
                            />
                            <Text style={{color: '#fff', position: 'absolute'}}>
                              {item.number_table}
                            </Text>
                          </View>
                          <Text
                            style={{
                              fontSize: 13,
                              fontWeight: '700',
                              marginTop: 10,
                            }}>
                            Bàn số {item.number_table}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              fontWeight: '400',
                              marginTop: 5,
                            }}>
                            {item.number_people_max} chỗ ngồi
                          </Text>
                          <View
                            style={{
                              height: 35,
                              width: 128,
                              alignItems: 'center',
                              justifyContent: 'space-evenly',
                              marginTop: 10,
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
                              onPress={() =>
                                props.navigation.navigate('EditTableScreen', {
                                  status: 'edit',
                                  // data: dataOrderTable[index],
                                  dataTable: item,
                                  store_id: storeId,
                                })
                              }
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
                    );
                  })}
                </ScrollView>
                {data?.category_food.map((item, index) => {
                  return (
                    <View key={index}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginTop: 20,
                          alignItems: 'center',
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text style={{fontSize: 15, fontWeight: '700'}}>
                            {item.name}
                          </Text>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('EditProductScreen', {
                                status: 'add',
                                category_food_id: item.id,
                                store_id: storeId,
                              })
                            }
                            style={{
                              padding: 5,
                              borderRadius: 4,
                              marginLeft: 10,
                              borderWidth: 1,
                              borderColor: Color.main,
                            }}>
                            <Text
                              style={{
                                fontSize: 12,
                                color: Color.main,
                              }}>
                              Thêm món
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('ListProductScreen', {
                              category_food_id: item.id,
                              store_id: storeId,
                            })
                          }>
                          <Text style={{fontStyle: 'italic'}}>
                            Quản lý món ăn
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{marginTop: 20, marginBottom: 10}}>
                        {data?.category_food[index]?.food.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              style={{
                                width: 130,
                                borderRadius: 8,
                                // backgroundColor: '#fff',
                                height: 206,
                                alignItems: 'center',
                                marginRight: 10,
                                flexDirection: 'column',
                                // justifyContent: 'flex-end',
                              }}>
                              <View
                                style={{
                                  height: 155,
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
                                  source={{uri: item.image}}
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
                                  {styles.dynamicSort(item.price_discount)} đ
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
                                    marginTop: 10,
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
                                      // console.log(
                                      //   item.category_food_id,
                                      //   storeId,
                                      // );
                                      props.navigation.navigate(
                                        'EditProductScreen',
                                        {
                                          status: 'edit',
                                          id: item.id,
                                          name: item.name,
                                          price: item.price,
                                          statusFood: item.status,
                                          typeFood: 'Món ăn chính',
                                          typeSize: 'L',
                                          number: '99',
                                          promotion: item.price_discount,
                                          category_food_id:
                                            item.category_food_id,
                                          store_id: storeId,
                                          image: item.image,
                                          productDetail: item,
                                        },
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
                                    <Text style={{fontSize: 11}}>Sửa</Text>
                                  </TouchableOpacity>
                                </View>
                              </View>
                            </TouchableOpacity>
                          );
                        })}
                      </ScrollView>
                    </View>
                  );
                })}
                <View style={{marginBottom: 40}}></View>
              </ScrollView>
            </View>
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
