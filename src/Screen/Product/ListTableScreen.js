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
import services from '../../Redux/Service/productService';

const LoginScreen = (props) => {
  const store_id = props?.route?.params?.store_id || null;

  const [modalVisibleLoading, setModalVisibleLoading] = useState(false);

  const getData = () => {
    setModalVisibleLoading(true);
    services.storeDetail(store_id).then(function (response) {
      if (response) {
        console.log('thai mai', response);
        if (response.data.code === 200) {
          // setDataProduct(response?.data?.data?.data);
          // console.log(response.data.data.data);
          // console.log(response?.data?.data);
          setDataOrderTable(response?.data?.data?.store?.table_store);
          setModalVisibleLoading(false);
        }
      } else {
        return;
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const [dataOrderTable, setDataOrderTable] = useState([]);

  const renderProduct = ({item}) => {
    return (
      <View
        style={{
          // flexDirection: 'column',
          // alignItems: 'center',
          // justifyContent: 'center',
          width: Dimensions.get('window').width * 0.45,
          marginBottom: 15,
        }}>
        <View
          style={{
            width: '85%',
            borderRadius: 8,
            backgroundColor: '#fff',
            alignItems: 'center',
            // marginRight: 10,
            marginTop: 15,
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
                    store_id: store_id,
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
          {modalVisibleLoading === false ? (
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
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                style={{
                  width: Dimensions.get('window').width - 10,
                  marginTop: 5,
                  marginLeft: 10,
                  borderRadius: 5,
                  marginBottom: 10,
                  flex: 1,
                  paddingLeft: 5,
                  paddingRight: 5,
                }}
                data={dataOrderTable}
                renderItem={renderProduct}
                keyExtractor={(item, index) => index.toString()}
                // onEndReached={handleLoadMore}
                // onEndReachedThreshold={0}
                // ListFooterComponent={renderFooter}
              />
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
