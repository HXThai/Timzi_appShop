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
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Color from '../../../Theme/Color';
import Images from '../../../Theme/Images';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './../../Styles/HomeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect} from '@react-navigation/native';
import services from '../../../Redux/Service/shipperService';

const Home = (props) => {
  const store_id = props?.route?.params?.store_id || null;

  // console.log(store_id);
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log('thai', props?.route?.params?.tab);
  //     if (props?.route?.params?.tab) {
  //       setTab(4);
  //     }
  //   }, [props?.route?.params?.tab]),
  // );

  const [dataStaff, setDataStaff] = useState([]);

  const [dataSearch, setDataSearch] = useState('');

  const getData = () => {
    services.getListShipper({}).then(function (response) {
      // console.log(response);
      if (response) {
        console.log('thai mai', response);
        if (response.data.code === 200) {
          setDataStaff(response.data.data);
          // setDataRestaurant(response?.data?.data);
          // setProvince(response?.data?.data[0].name);
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    getData();
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
          <View style={{padding: 10}}>
            <ScrollView>
              <View>
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
                      height: 45,
                      width: '100%',
                      // marginTop: 25,
                    }}>
                    <TextInput
                      style={{
                        height: 45,
                        color: '#000000',
                        // fontFamily: 'Nunito',
                        borderColor: Color.main,
                        borderWidth: 1,
                        borderRadius: 20,
                        paddingLeft: 20,
                      }}
                      onChangeText={(text) => setDataSearch(text)}
                      defaultValue={dataSearch}
                      placeholder="Tìm shipper?"
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
                    // backgroundColor: 'red'
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
              {dataStaff.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      padding: 10,
                      flexDirection: 'row',
                      backgroundColor: Color.white,
                      borderRadius: 8,
                      marginTop: 15,
                    }}>
                    <Image
                      source={{uri: item.avatar}}
                      style={{width: 48, height: 48}}
                    />
                    <View
                      style={{
                        flexDirection: 'column',
                        // justifyContent: 'space-between',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginLeft: 10,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: Dimensions.get('window').width - 100,
                        }}>
                        <Text style={{fontSize: 15, fontWeight: '400'}}>
                          {item.name}
                        </Text>
                        <Text style={{fontSize: 15, fontWeight: '400'}}>
                          {item.phone}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignSelf: 'flex-end',
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            Alert.alert(
                              'Thông báo',
                              'Bạn chắc chắn muốn hợp tác với shipper?',
                              [
                                {text: 'Hủy', onPress: () => {}},
                                {
                                  text: 'Đồng ý',
                                  onPress: async () => {
                                    services
                                      .chooseShipper({
                                        store_id: store_id,
                                        shipper_id: item.id,
                                      })
                                      .then(function (response) {
                                        // console.log(response);
                                        // props.onGetList(response?.data);
                                        if (response) {
                                          // console.log('thai mai', response);
                                          if (response.data.code === 200) {
                                            props.navigation.reset({
                                              index: 0,
                                              routes: [
                                                {
                                                  name: 'AccountShipperScreen',
                                                  params: {
                                                    store_id: store_id,
                                                  },
                                                },
                                              ],
                                            });
                                          }
                                        } else {
                                          Alert.alert(
                                            'Thông báo',
                                            response.data.message,
                                            [
                                              {
                                                text: 'Đồng ý',
                                                onPress: async () => {},
                                              },
                                            ],
                                            {cancelable: false},
                                          );
                                          return;
                                        }
                                      });
                                  },
                                },
                              ],
                              {cancelable: false},
                            );
                          }}
                          style={{
                            width: 80,
                            height: 25,
                            borderRadius: 4,
                            backgroundColor: Color.buttonColor,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <Text style={{fontSize: 12}}>Hợp tác</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Home;
