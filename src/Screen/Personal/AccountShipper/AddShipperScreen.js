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
import Color from '../../../Theme/Color';
import Images from '../../../Theme/Images';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './../../Styles/HomeStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

import {useFocusEffect} from '@react-navigation/native';

const Home = (props) => {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     // console.log('thai', props?.route?.params?.tab);
  //     if (props?.route?.params?.tab) {
  //       setTab(4);
  //     }
  //   }, [props?.route?.params?.tab]),
  // );

  const [dataStaff, setDataStaff] = useState([
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      role: 'Nhân viên',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      role: 'Nhân viên',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      role: 'Nhân viên',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      phone: '0986868686',
      role: 'Nhân viên',
    },
  ]);

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
                          fontFamily: 'Nunito',
                          borderColor: Color.main,
                          borderWidth: 1,
                          borderRadius: 20,
                          paddingLeft: 20,
                        }}
                        placeholder="Tìm shipper?"
                        placeholderTextColor="gray"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: '100%',
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
                        source={item.image}
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
                              // props.navigation.navigate(
                              //   'ActionDecentralizationStaffScreen',
                              // );
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
          </SafeAreaView>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Home;
