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
import Modal from 'react-native-modal';

const LoginScreen = (props) => {
  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);
  const [modalVisibleAddCategory, setModalVisibleAddCategory] = useState(false);
  const [modalVisibleEditCategory, setModalVisibleEditCategory] = useState(
    false,
  );
  const [storeId, setStoreId] = useState(null);
  const [category, setCategory] = useState('');
  const [categoryEdit, setCategoryEdit] = useState('');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    setModalVisibleLoading(true);
    storage.getItem('dataStore').then((data) => {
      if (data) {
        setStoreId(data.id);
        services
          .getListCategoryStoreFood(null, data.id)
          .then(function (response) {
            if (response) {
              if (response.data.code === 200) {
                setDataOrderTable(response?.data?.data);
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

  const getData = () => {
    setModalVisibleLoading(true);
    services.getListCategoryStoreFood(null, storeId).then(function (response) {
      if (response) {
        if (response.data.code === 200) {
          setDataOrderTable(response?.data?.data);
          setModalVisibleLoading(false);
        }
      } else {
        return;
      }
    });
  };

  const [dataOrderTable, setDataOrderTable] = useState([]);

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          width: Dimensions.get('window').width * 0.9,
          margin: 10,
          height: 45,
          borderRadius: 8,
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: Color.white,
          flexDirection: 'row',
          paddingLeft: 10,
        }}>
        <Text
          numberOfLines={1}
          style={{width: Dimensions.get('window').width * 0.5}}>
          {item?.name}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 45,
            justifyContent: 'space-around',
          }}>
          <TouchableOpacity
            onPress={() => {
              setCategoryEdit(item.name);
              setCategoryId(item.id);
              setModalVisibleEditCategory(true);
            }}
            style={{
              height: 45,
              width: 60,
              borderRadius: 4,
              backgroundColor: Color.buttonColor,
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}>
            <Text style={{fontSize: 13}}>S???a</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Xo?? danh m???c m??n ??n!',
                'B???n c?? ch???c mu???n xo?? danh m???c m??n ??n n??y?',
                [
                  {
                    text: '?????ng ??',
                    onPress: () => {
                      services
                        .deleteCategoryStoreFood(null, item?.id)
                        .then(function (response) {
                          if (response) {
                            if (response.data.code === 200) {
                              getData();
                              setModalVisibleEditCategory(false);
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
                            Alert.alert(
                              'Th??ng b??o!',
                              'S???a danh m???c th???t b???i!',
                              [
                                {
                                  text: '?????ng ??',
                                },
                              ],
                              {cancelable: false},
                            );
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
              height: 45,
              width: 60,
              borderRadius: 4,
              backgroundColor: Color.red,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 13, color: Color.white}}>Xo??</Text>
          </TouchableOpacity>
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
          <Modal
            onBackdropPress={() => setModalVisibleAddCategory(false)}
            style={{alignItems: 'center', justifyContent: 'center'}}
            isVisible={modalVisibleAddCategory}>
            <View
              style={{
                height: Dimensions.get('window').height * 0.25,
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                S???a danh m???c m??n ??n
              </Text>
              <View>
                <Text>T??n danh m???c</Text>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                    width: Dimensions.get('window').width * 0.7,
                  }}
                  placeholder="T??n danh m???c"
                  placeholderTextColor="#9C9C9C"
                  onChangeText={(text) => setCategory(text)}
                  defaultValue={category}
                />

                <TouchableOpacity
                  onPress={() => {
                    services
                      .createCategoryStoreFood({
                        name: category,
                        store_id: storeId,
                      })
                      .then(function (response) {
                        if (response) {
                          if (response.data.code === 200) {
                            getData();
                            setModalVisibleAddCategory(false);
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
                          Alert.alert(
                            'Th??ng b??o!',
                            'Th??m danh m???c th???t b???i!',
                            [
                              {
                                text: '?????ng ??',
                              },
                            ],
                            {cancelable: false},
                          );
                          return;
                        }
                      });
                  }}
                  style={{
                    width: Dimensions.get('window').width * 0.7,
                    marginTop: 20,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Color.buttonColor,
                    borderRadius: 8,
                  }}>
                  <Text style={{fontSize: 14}}>Th??m danh m???c</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            onBackdropPress={() => setModalVisibleEditCategory(false)}
            style={{alignItems: 'center', justifyContent: 'center'}}
            isVisible={modalVisibleEditCategory}>
            <View
              style={{
                height: Dimensions.get('window').height * 0.25,
                width: '100%',
                backgroundColor: '#fff',
                borderRadius: 10,
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}>
              <Text style={{fontSize: 16, fontWeight: '700'}}>
                S???a danh m???c m??n ??n
              </Text>
              <View>
                <Text>T??n danh m???c</Text>
                <TextInput
                  style={{
                    height: 40,
                    borderBottomWidth: 0.8,
                    borderBottomColor: '#333333',
                    width: Dimensions.get('window').width * 0.7,
                  }}
                  placeholder="T??n danh m???c"
                  placeholderTextColor="#9C9C9C"
                  onChangeText={(text) => setCategoryEdit(text)}
                  defaultValue={categoryEdit}
                />
                <TouchableOpacity
                  onPress={() => {
                    services
                      .updateCategoryStoreFood(
                        {
                          name: categoryEdit,
                          store_id: storeId,
                        },
                        categoryId,
                      )
                      .then(function (response) {
                        if (response) {
                          if (response.data.code === 200) {
                            getData();
                            setModalVisibleEditCategory(false);
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
                          Alert.alert(
                            'Th??ng b??o!',
                            'S???a danh m???c th???t b???i!',
                            [
                              {
                                text: '?????ng ??',
                              },
                            ],
                            {cancelable: false},
                          );
                          return;
                        }
                      });
                  }}
                  style={{
                    width: Dimensions.get('window').width * 0.7,
                    marginTop: 20,
                    height: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: Color.buttonColor,
                    borderRadius: 8,
                  }}>
                  <Text style={{fontSize: 14}}>S???a danh m???c</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
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
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <FlatList
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                  flexDirection: 'column',
                  // flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                style={{
                  flex: 1,
                }}
                data={dataOrderTable}
                renderItem={renderProduct}
                keyExtractor={(item, index) => index.toString()}
                // onEndReached={handleLoadMore}
                // onEndReachedThreshold={0}
                // ListFooterComponent={renderFooter}
              />
              <TouchableOpacity
                onPress={() => setModalVisibleAddCategory(true)}
                style={{
                  height: 45,
                  width: Dimensions.get('window').width * 0.9,
                  margin: 10,
                  borderRadius: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Color.main,
                  marginBottom: 10,
                }}>
                <Text
                  style={{color: Color.white, fontSize: 16, fontWeight: '700'}}>
                  Th??m danh m???c
                </Text>
              </TouchableOpacity>
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
