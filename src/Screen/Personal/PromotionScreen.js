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

const LoginScreen = (props) => {
  const [dataPromotion, setDataPromotion] = useState([
    {
      image: Images.iconPromotionJoin,
      title: 'Chương trình đang tham gia',
      number: 4,
      type: 0,
    },
    {
      image: Images.iconPromotionTimzi,
      title: 'Chương trình của TIMZI',
      number: 4,
      type: 0,
    },
    {
      image: Images.iconPromotionShop,
      title: 'Chương trình của cửa hàng',
      number: 4,
      type: 0,
    },
    {
      image: Images.iconComboShop,
      title: 'Combo của cửa hàng',
      number: 4,
      type: 1,
    },
  ]);

  const onClickCate = (index) => {
    if (index === 0) {
      props.navigation.navigate('PromotionJoinScreen');
    } else if (index === 1) {
      props.navigation.navigate('PromotionTimziScreen');
    } else if (index === 2) {
      props.navigation.navigate('PromotionRestaurantScreen');
    } else {
      props.navigation.navigate('PromotionComboScreen');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contend}>
        <ImageBackground
          source={Images.backgroundHome}
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}>
          <View
            style={{
              padding: 10,
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{marginTop: 5}}>
              {dataPromotion.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => onClickCate(index)}
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 15,
                      backgroundColor: Color.white,
                      borderRadius: 10,
                      padding: 5,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        // backgroundColor: 'red',
                      }}>
                      <Image
                        source={item.image}
                        style={{width: 50, height: 50, marginTop: 7}}
                      />
                      <View
                        style={{
                          marginLeft: 10,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                          height: 40,
                          // backgroundColor: 'red',
                        }}>
                        <Text style={{fontSize: 15, fontWeight: '400'}}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Color.main,
                          }}>
                          Số lượng: {item.number}{' '}
                          {item.type === 1 ? 'Combo' : 'Chương trình'}
                        </Text>
                      </View>
                    </View>
                    <FontAwesomeIcon
                      color="#898989"
                      icon={faChevronRight}
                      size={20}
                      style={{}}
                      color={Color.main}
                    />
                  </TouchableOpacity>
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
