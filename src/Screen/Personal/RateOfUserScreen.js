import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TextInput,
  Alert,
  Dimensions,
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

const LoginScreen = (props) => {
  const [dataRate, setDataRate] = useState([
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      star: 4,
      content:
        'Thức ăn quán ngon, cửa hàng phục vụ tận tinh, nhân viên dễ thương!',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      star: 4,
      content:
        'Thức ăn quán ngon, cửa hàng phục vụ tận tinh, nhân viên dễ thương!',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      star: 4,
      content:
        'Thức ăn quán ngon, cửa hàng phục vụ tận tinh, nhân viên dễ thương!',
    },
    {
      image: Images.avatar,
      name: 'Trần Văn Tét',
      star: 4,
      content:
        'Thức ăn quán ngon, cửa hàng phục vụ tận tinh, nhân viên dễ thương!',
    },
  ]);

  const [printers, setPrinters] = useState({});

  const [currentPrinter, setCurrentPrinter] = useState(null);

  // useEffect(() => {
  //   NetPrinter.init().then(() => {
  //     setPrinters({host: '192.168.2.222', port: 9100});
  //   });
  // }, []);

  // const _connectPrinter = () => {
  //   NetPrinter.connectPrinter(printers.host, printers.port).then(
  //     (printer) => setCurrentPrinter(printer),
  //     (error) => console.warn(error),
  //   );
  // };

  // const printTextTest = () => {
  //   if (currentPrinter) {
  //     NetPrinter.printText('<C>Test text</C>\n');
  //   } else {
  //     console.log('Test text');
  //   }
  // };

  // const printBillTest = () => {
  //   if (currentPrinter) {
  //     NetPrinter.printBill('<C>Test bill</C>');
  //   } else {
  //     console.log('Test bill');
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          {/* <TouchableOpacity onPress={() => _connectPrinter()}>
            <Text>Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => printTextTest()}>
            <Text> Print Text </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => printBillTest()}>
            <Text> Print Bill Text </Text>
          </TouchableOpacity> */}
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <ScrollView showsVerticalScrollIndicator={false} style={{}}>
              {dataRate.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginBottom: 25,
                    }}>
                    <Image
                      source={item.image}
                      style={{width: 80, height: 80}}
                    />
                    <Text
                      style={{fontWeight: '700', fontSize: 15, marginTop: 5}}>
                      Khách hàng: {item.name}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                        // width: Dimensions.get('window').width - 136,
                        // justifyContent: 'space-between',
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
                    <View
                      style={{
                        padding: 10,
                        borderWidth: 1,
                        borderColor: 'grey',
                        borderRadius: 10,
                        marginTop: 5,
                      }}>
                      <Text style={{fontSize: 15, fontWeight: '400'}}>
                        {item.content}
                      </Text>
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
