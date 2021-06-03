import React, {useEffect, useState, useCallback} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  TextInput,
  Dimensions,
  RefreshControl,
  Alert,
  ActivityIndicator,
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
import ImageView from 'react-native-image-viewing';

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const Home = (props) => {
  const [dataListStore, setDataListStore] = useState([]);

  const [storeId, setStoreId] = useState(null);

  const [storeName, setStoreName] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState(null);

  const [refreshing, setRefreshing] = useState(false);

  const [dataCateWithStore, setDataCateWithStore] = useState([]);

  const [dataCateStoreFood, setDataCateStoreFood] = useState([]);

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const [modalVisibleShowImage, setModalVisibleShowImage] = useState(false);

  const [imageView, setImageView] = useState([{}]);

  const [visible, setIsVisible] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDataFood();
    wait(1000).then(() => {
      setRefreshing(false);
    });
  });

  const getDataFood = () => {
    services.storeDetail(storeId).then(function (response) {
      if (response) {
        // console.log('thai', response);
        if (response.data.code === 200) {
          setData(response?.data?.data);
        }
      } else {
        return;
      }
    });
    services.getListCategoryWithStore(null).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setDataCateWithStore(response.data.data);
        }
      } else {
        return;
      }
    });
    services.getListCategoryStoreFood(null, storeId).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setDataCateStoreFood(response.data.data);
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    // storage.getItem('dataStore').then((data) => {
    //   if (data) {
    //     setStoreName(data.name);
    //     setStoreId(data.id);
    //     services.storeDetail(data.id).then(function (response) {
    //       if (response) {
    //         if (response.data.code === 200) {
    //           setData(response?.data?.data);
    //         }
    //       } else {
    //         return;
    //       }
    //     });
    //   } else {
    props.data.responseListStore?.data.forEach((element, index) => {
      // console.log(element.status);
      if (element.status === 1) {
        setStoreName(element.name);
        setStoreId(element.id);
        storage.setItem('dataStore', element);
        services.storeDetail(element.id).then(function (response) {
          if (response) {
            if (response?.data?.code === 200) {
              setData(response?.data?.data);
            }
          } else {
            return;
          }
        });
      }
    });
    //   }
    // });
    setDataListStore(props.data.responseListStore);
  }, [props.data.responseListStore]);

  const [roleId, setRoleId] = useState('');

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('role_id').then((data) => {
      if (data) {
        setRoleId(data);
      } else {
      }
    });
    services.getListCategoryWithStore(null).then(function (response) {
      if (response) {
        // console.log('thai', response);
        if (response.data.code === 200) {
          setDataCateWithStore(response.data.data);
        }
      } else {
        return;
      }
    });
    services.getListCategoryStoreFood(null, storeId).then(function (response) {
      if (response) {
        // console.log('thai', response);
        if (response.data.code === 200) {
          setDataCateStoreFood(response.data.data);
          setModalVisibleLoading(false);
        }
      } else {
        return;
      }
    });
  }, []);

  const onShowImage = (uriImage) => {
    var img = [{uri: uriImage}];
    setImageView(img);
    setIsVisible(true);
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
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
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
                {/* <View
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
                </View> */}
                {storeId == null ? (
                  <View
                    style={{
                      height: Dimensions.get('window').height,
                      width: Dimensions.get('window').width,
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingBottom: 100,
                    }}>
                    <Text>Không tìm thấy cửa hàng!</Text>
                  </View>
                ) : null}
                {data != null ? (
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
                        style={{height: 200, width: '100%', borderRadius: 8}}
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
                            <View
                              style={{
                                width: Dimensions.get('window').width - 120,
                              }}>
                              <Text
                                numberOfLines={1}
                                style={{fontSize: 13, fontWeight: '400'}}>
                                {data?.store?.address}
                              </Text>
                            </View>
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
                ) : null}
                {data != null ? (
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
                ) : null}
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
                              onPress={() => {
                                Alert.alert(
                                  'Xoá bàn ăn!',
                                  'Bạn chắc chắn muốn xoá bàn ăn này?',
                                  [
                                    {
                                      text: 'Đồng ý',
                                      onPress: async () => {
                                        services
                                          .deleteTable(null, item.id)
                                          .then(function (response) {
                                            if (response) {
                                              if (response.data.code === 200) {
                                                getDataFood();
                                                Alert.alert(
                                                  'Thông báo!',
                                                  'Xoá bàn ăn thành công!',
                                                  [
                                                    {
                                                      text: 'Đồng ý',
                                                    },
                                                  ],
                                                  {cancelable: false},
                                                );
                                              } else {
                                                Alert.alert(
                                                  'Thông báo!',
                                                  response.data.message,
                                                  [
                                                    {
                                                      text: 'Đồng ý',
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
                                      text: 'Huỷ',
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
                {data != null ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 20,
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('ListCategoryStoreFood')
                      }
                      style={{
                        padding: 5,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: Color.main,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.main,
                        }}>
                        Quản lý danh mục món ăn
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate('EditProductScreen', {
                          status: 'add',
                          // category_food_id: item?.id,
                          store_id: storeId,
                        })
                      }
                      style={{
                        padding: 5,
                        borderRadius: 4,
                        borderWidth: 1,
                        borderColor: Color.main,
                      }}>
                      <Text
                        style={{
                          fontSize: 12,
                          color: Color.main,
                        }}>
                        Thêm món ăn
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : null}
                {data?.category_food?.map((item, index) => {
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
                            {item?.name}
                          </Text>
                          {/* <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('EditProductScreen', {
                                status: 'add',
                                category_food_id: item?.id,
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
                          </TouchableOpacity> */}
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
                            <View
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
                                <TouchableOpacity
                                  onPress={() => {
                                    onShowImage(item.image);
                                  }}>
                                  <Image
                                    source={{uri: item.image}}
                                    style={{
                                      height: 97,
                                      width: 97,
                                      borderRadius: 50,
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
                                    onPress={() => {
                                      Alert.alert(
                                        'Xoá món ăn!',
                                        'Bạn chắc chắn muốn xoá món ăn này?',
                                        [
                                          {
                                            text: 'Đồng ý',
                                            onPress: async () => {
                                              services
                                                .deleteFood(null, item.id)
                                                .then(function (response) {
                                                  if (response) {
                                                    if (
                                                      response.data.code === 200
                                                    ) {
                                                      getDataFood();
                                                      Alert.alert(
                                                        'Thông báo!',
                                                        'Xoá món ăn thành công!',
                                                        [
                                                          {
                                                            text: 'Đồng ý',
                                                          },
                                                        ],
                                                        {cancelable: false},
                                                      );
                                                    } else {
                                                      Alert.alert(
                                                        'Thông báo!',
                                                        response.data.message,
                                                        [
                                                          {
                                                            text: 'Đồng ý',
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
                                            text: 'Huỷ',
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
                                    <Text style={{fontSize: 11}}>Xóa</Text>
                                  </TouchableOpacity>
                                  <TouchableOpacity
                                    onPress={() => {
                                      props.navigation.navigate(
                                        'EditProductScreen',
                                        {
                                          status: 'edit',
                                          id: item.id,
                                          name: item.name,
                                          price: item.price,
                                          statusFood: item.status,
                                          promotion: item.price_discount,
                                          category_food_id:
                                            item.category_food_id,
                                          store_id: storeId,
                                          image: item.image,
                                          productDetail: item,
                                          category_store_food:
                                            item.category_store_food_id,
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
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  );
                })}
                {data?.category_store_food?.map((item, index) => {
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
                            {item?.name}
                          </Text>
                          {/* <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate('EditProductScreen', {
                                status: 'add',
                                category_food_id: item?.id,
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
                          </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate('ListProductScreen', {
                              category_food_id: item.id,
                              store_id: storeId,
                              type: 'food',
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
                        {data?.category_store_food[index]?.food.map(
                          (item, index) => {
                            return (
                              <View
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
                                  <TouchableOpacity
                                    onPress={() => {
                                      onShowImage(item.image);
                                    }}>
                                    <Image
                                      source={{uri: item.image}}
                                      style={{
                                        height: 97,
                                        width: 97,
                                        borderRadius: 50,
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
                                      onPress={() => {
                                        Alert.alert(
                                          'Xoá món ăn!',
                                          'Bạn chắc chắn muốn xoá món ăn này?',
                                          [
                                            {
                                              text: 'Đồng ý',
                                              onPress: async () => {
                                                services
                                                  .deleteFood(null, item.id)
                                                  .then(function (response) {
                                                    if (response) {
                                                      if (
                                                        response.data.code ===
                                                        200
                                                      ) {
                                                        getDataFood();
                                                        Alert.alert(
                                                          'Thông báo!',
                                                          'Xoá món ăn thành công!',
                                                          [
                                                            {
                                                              text: 'Đồng ý',
                                                            },
                                                          ],
                                                          {cancelable: false},
                                                        );
                                                      } else {
                                                        Alert.alert(
                                                          'Thông báo!',
                                                          response.data.message,
                                                          [
                                                            {
                                                              text: 'Đồng ý',
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
                                              text: 'Huỷ',
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
                                      <Text style={{fontSize: 11}}>Xóa</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                      onPress={() => {
                                        props.navigation.navigate(
                                          'EditProductScreen',
                                          {
                                            status: 'edit',
                                            id: item.id,
                                            name: item.name,
                                            price: item.price,
                                            statusFood: item.status,
                                            promotion: item.price_discount,
                                            category_food_id:
                                              item.category_food_id,
                                            store_id: storeId,
                                            image: item.image,
                                            productDetail: item,
                                            category_store_food:
                                              item.category_store_food_id,
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
                              </View>
                            );
                          },
                        )}
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
