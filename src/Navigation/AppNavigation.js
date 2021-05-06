import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createBottomTabNavigator,
  BottomTabBar,
} from '@react-navigation/bottom-tabs';
import SplashScreen from '../Screen/SplashScreen';
import Home from '../Screen/OrderOnline';
import Notification from '../Screen/InCome';
import EarnCoin from '../Screen/Product';
import Personal from '../Screen/Personal';
import Utilities from '../Screen/OrderOffline';
import Images from '../Theme/Images';
import {
  Image,
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faStore,
  faChevronRight,
  faUsers,
  faUser,
  faTag,
  faClipboardList,
  faKey,
  faSignOutAlt,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import Color from '../Theme/Color';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import LoginScreen from './../Screen/Login/LoginScreen';
import RegisterScreen from './../Screen/Login/RegisterScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ConfirmOTPRegisterScreen from '../Screen/Login/ConfirmOTPScreen';
import ForgotPasswordScreen from './../Screen/Login/ForgotPasswordScreen';
import ConfirmForgotPasswordScreen from '../Screen/Login/ConfirmForgotPasswordScreen';
import NewOrderOnlineDetailScreen from '../Screen/OrderOnline/NewOrderOnlineDetailScreen';
import OrderOnlineRecievedDetailScreen from '../Screen/OrderOnline/OrderOnlineRecievedDetailScreen';
import OrderOnlineHasTakenDetailScreen from '../Screen/OrderOnline/OrderOnlineHasTakenDetailScreen';
import OrderOnlineCancelledDetailScreen from '../Screen/OrderOnline/OrderOnlineCancelledDetailScreen';
import InformationRestaurantScreen from './../Screen/Product/InformationRestaurantScreen';
import EditInformationRestaurantScreen from './../Screen/Product/EditInformationRestaurantScreen';
import AddRestaurantScreen from './../Screen/Product/AddRestaurantScreen';
import EditTableScreen from './../Screen/Product/EditTableScreen';
import EditProductScreen from './../Screen/Product/EditProductScreen';
import ListProductScreen from './../Screen/Product/ListProductScreen';
import ListTableScreen from './../Screen/Product/ListTableScreen';
import YourRestaurantScreen from './../Screen/Personal/YourRestaurantScreen';
import PromotionScreen from './../Screen/Personal/PromotionScreen';
import AccountShipperScreen from './../Screen/Personal/AccountShipperScreen';
import PromotionJoinScreen from './../Screen/Personal/Promotion/PromotionJoinScreen';
import AddShipperScreen from './../Screen/Personal/AccountShipper/AddShipperScreen';
import PromotionTimziScreen from './../Screen/Personal/Promotion/PromotionTimziScreen';
import PromotionRestaurantScreen from './../Screen/Personal/Promotion/PromotionRestaurantScreen';
import PromotionComboScreen from './../Screen/Personal/Promotion/PromotionComboScreen';
import ManageAccountStaffScreen from './../Screen/Personal/ManageAccountStaffScreen';
import DecentralizationStaffScreen from './../Screen/Personal/DecentralizationStaffScreen';
import ActionDecentralizationStaffScreen from './../Screen/Personal/DecentralizationStaff/ActionDecentralizationStaffScreen';
import RateOfUserScreen from './../Screen/Personal/RateOfUserScreen';
import ChangePasswordScreen from './../Screen/Personal/ChangePasswordScreen';
import ConfirmChangePasswordScreen from './../Screen/Personal/ChangePassword/ConfirmChangePasswordScreen';
import WalletScreen from './../Screen/Personal/WalletScreen';
import AddMoneyScreen from './../Screen/Personal/Wallet/AddMoneyScreen';
import MoneyWithdrawalScreen from './../Screen/Personal/Wallet/MoneyWithdrawalScreen';
import AddPromotionRestaurantScreen from './../Screen/Personal/Promotion/ActionPromotion/AddPromotionRestaurantScreen';
import AddComboScreen from './../Screen/Personal/Promotion/ActionPromotion/AddComboScreen';
import PromotionRestaurantDetailScreen from './../Screen/Personal/Promotion/ActionPromotion/PromotionRestaurantDetailScreen';
import PromotionTimziDetailScreen from './../Screen/Personal/Promotion/ActionPromotion/PromotionTimziDetailScreen';
import PromotionComboDetailScreen from './../Screen/Personal/Promotion/ActionPromotion/PromotionComboDetailScreen';
import EditComboScreen from './../Screen/Personal/Promotion/ActionPromotion/EditComboScreen';
import NewOrderOfflineDetailScreen from '../Screen/OrderOffline/NewOrderOfflineDetailScreen';
import OrderOfflineReceivedDetailScreen from '../Screen/OrderOffline/OrderOfflineReceivedDetailScreen';
import OrderOfflineServingDetailScreen from '../Screen/OrderOffline/OrderOfflineServingDetailScreen';
import OrderOfflineServedDetailScreen from '../Screen/OrderOffline/OrderOfflineServedDetailScreen';
import OrderOfflineCancelledDetailScreen from '../Screen/OrderOffline/OrderOfflineCancelledDetailScreen';
import ChooseRestaurantScreen from '../Screen/Staff/ChooseRestaurantScreen';
import FindRestaurantScreen from '../Screen/Staff/FindRestaurantScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const getTabBarVisibility = (route) => {
  const routename = getFocusedRouteNameFromRoute(route) ?? 'Home';
  if (routename == 'HistoryTurn') {
    return false;
  }
  if (routename == 'NewOrderOnlineDetailScreen') {
    return false;
  }
  if (routename == 'InformationRestaurantScreen') {
    return false;
  }
  if (routename == 'EditInformationRestaurantScreen') {
    return false;
  }
  if (routename == 'EditTableScreen') {
    return false;
  }
  if (routename == 'ListProductScreen') {
    return false;
  }
  if (routename == 'ListTableScreen') {
    return false;
  }
  if (routename == 'YourRestaurantScreen') {
    return false;
  }
  if (routename == 'PromotionScreen') {
    return false;
  }
  if (routename == 'PromotionJoinScreen') {
    return false;
  }
  if (routename == 'PromotionTimziScreen') {
    return false;
  }
  if (routename == 'PromotionRestaurantScreen') {
    return false;
  }
  if (routename == 'PromotionComboScreen') {
    return false;
  }
  if (routename == 'ManageAccountStaffScreen') {
    return false;
  }
  if (routename == 'DecentralizationStaffScreen') {
    return false;
  }
  if (routename == 'ActionDecentralizationStaffScreen') {
    return false;
  }
  if (routename == 'RateOfUserScreen') {
    return false;
  }
  if (routename == 'ChangePasswordScreen') {
    return false;
  }
  if (routename == 'ConfirmChangePasswordScreen') {
    return false;
  }
  if (routename == 'WalletScreen') {
    return false;
  }
  if (routename == 'AddMoneyScreen') {
    return false;
  }
  if (routename == 'MoneyWithdrawalScreen') {
    return false;
  }
  if (routename == 'AddPromotionRestaurantScreen') {
    return false;
  }
  if (routename == 'AddComboScreen') {
    return false;
  }
  if (routename == 'EditComboScreen') {
    return false;
  }
  if (routename == 'NewOrderOfflineDetailScreen') {
    return false;
  }
  if (routename == 'OrderOfflineReceivedDetailScreen') {
    return false;
  }
  if (routename == 'OrderOfflineServingDetailScreen') {
    return false;
  }
  if (routename == 'OrderOfflineServedDetailScreen') {
    return false;
  }
  if (routename == 'OrderOfflineCancelledDetailScreen') {
    return false;
  }
  if (routename == 'EditProductScreen') {
    return false;
  }
  if (routename == 'OrderOnlineRecievedDetailScreen') {
    return false;
  }
  if (routename == 'OrderOnlineHasTakenDetailScreen') {
    return false;
  }
  if (routename == 'OrderOnlineCancelledDetailScreen') {
    return false;
  }
  if (routename == 'ChooseRestaurantScreen') {
    return false;
  }
  if (routename == 'FindRestaurantScreen') {
    return false;
  }
  if (routename == 'AccountShipperScreen') {
    return false;
  }
  if (routename == 'AddShipperScreen') {
    return false;
  }
  if (routename == 'PromotionRestaurantDetailScreen') {
    return false;
  }
  if (routename == 'PromotionComboDetailScreen') {
    return false;
  }
  if (routename == 'AddRestaurantScreen') {
    return false;
  }
  if (routename == 'PromotionTimziDetailScreen') {
    return false;
  }
  return true;
};
export function isIPhoneX() {
  const {width, height} = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
}

function TabNav(props) {
  return (
    <Tab.Navigator
      tabBar={(tab) => (
        <BottomTabBar
          {...tab}
          style={{
            ...tab.style,
            height: Platform.OS != 'ios' ? 60 : isIPhoneX ? 80 : 68,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}
        />
      )}
      screenOptions={({route}) => ({
        tabBarVisible: getTabBarVisibility(route),
        tabBarIcon: ({focused, color}) => {
          const routeName = route.name;
          let url;
          let size = 24;
          if (routeName === 'Đơn Online') {
            url = focused ? Images.homeC : Images.home;
          } else if (routeName === 'Đơn Offline') {
            url = focused ? Images.ultitiC : Images.ultiti;
          } else if (routeName === 'Sản phẩm') {
            url = focused ? Images.earncoinC : Images.earncoin;
          } else if (routeName === 'Thu nhập') {
            url = focused ? Images.notificationC : Images.notification;
          } else if (routeName === 'Tài khoản') {
            url = focused ? Images.personalC : Images.personal;
          }
          return <Image source={url} style={{width: size, height: size}} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: Color.main,
        inactiveTintColor: 'gray',
        style: {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          position: 'absolute',
          height: 60,
          backgroundColor: '#fff',
        },
        tabStyle: {
          paddingVertical: 5,
        },
      }}>
      <Tab.Screen
        name="Đơn Online"
        component={HomeStack}
        navigationOptions={{tabBarLabel: 'Trang chủ'}}
      />
      <Tab.Screen
        name="Đơn Offline"
        component={UtilitiesStack}
        navigationOptions={{tabBarLabel: 'Tiện ích'}}
      />
      <Tab.Screen
        name="Sản phẩm"
        component={EarnCoinStack}
        navigationOptions={{tabBarLabel: 'Kiếm xu'}}
      />
      <Tab.Screen
        name="Thu nhập"
        component={NotificationStack}
        navigationOptions={{tabBarLabel: 'Thông báo'}}
      />
      <Tab.Screen
        name="Tài khoản"
        component={PersonalStack}
        navigationOptions={{tabBarLabel: 'Tài khoản'}}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TabNav"
        component={TabNav}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Staff"
        component={StaffStack}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function StaffStack(props) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseRestaurantScreen"
        component={ChooseRestaurantScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chọn cửa hàng',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('EarnCoin');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight: 15, padding: 5}}
              onPress={() => {
                Alert.alert(
                  'Đăng xuất',
                  'Bạn chắc chắn muốn đăng xuất?',
                  [
                    // {
                    //   text: 'Cancel',
                    //   onPress: () => {},
                    //   style: 'cancel',
                    // },
                    {text: 'Hủy', onPress: () => {}},
                    {
                      text: 'Đồng ý',
                      onPress: async () => {
                        await AsyncStorage.clear();
                        props.navigation.navigate('Login');
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }}>
              <FontAwesomeIcon
                color="#898989"
                icon={faSignOutAlt}
                size={24}
                style={{}}
                color={Color.white}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="FindRestaurantScreen"
        component={FindRestaurantScreen}
        options={({route}) => ({
          headerShown: false,
          headerTitle: 'Tìm cửa hàng',
          headerTitleStyle: {color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ChooseRestaurantScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={Color.white}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  height: 56,
                  width: 15,
                  backgroundColor: '#F2F2F2',
                }}></View>

              <TouchableOpacity
                onPress={() => {
                  // props.navigation.navigate('LoginScreen');
                  // console.log('test');
                }}
                style={{
                  width: Dimensions.get('window').width * 0.35,
                  height: 56,
                  backgroundColor: Color.buttonColor,
                  // marginRight: 50,
                }}>
                <View style={{marginLeft: 20}}>
                  <MaterialIcons
                    name={'arrow-back-ios'}
                    size={26}
                    color={null}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

function LoginStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <View style={{marginTop: 70, alignItems: 'center'}}>
              <Image
                source={Images.logo}
                resizeMode="cover"
                style={{width: 308, height: 109}}
              />
            </View>
          ),
          // headerTitleStyle: {alignSelf: 'center', color: '#333333'},
          headerStyle: {
            backgroundColor: Color.background,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={Color.main}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('AirTicketScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ConfirmOTPRegisterScreen"
        component={ConfirmOTPRegisterScreen}
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <View style={{marginTop: 70, alignItems: 'center'}}>
              <Image
                source={Images.logo}
                resizeMode="cover"
                style={{width: 308, height: 109}}
              />
            </View>
          ),
          // headerTitleStyle: {alignSelf: 'center', color: '#333333'},
          headerStyle: {
            backgroundColor: Color.background,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('RegisterScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={Color.main}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('AirTicketScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <View style={{marginTop: 70, alignItems: 'center'}}>
              <Image
                source={Images.logo}
                resizeMode="cover"
                style={{width: 308, height: 109}}
              />
            </View>
          ),
          // headerTitleStyle: {alignSelf: 'center', color: '#333333'},
          headerStyle: {
            backgroundColor: Color.background,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={Color.main}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('AirTicketScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ConfirmForgotPasswordScreen"
        component={ConfirmForgotPasswordScreen}
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <View style={{marginTop: 70, alignItems: 'center'}}>
              <Image
                source={Images.logo}
                resizeMode="cover"
                style={{width: 308, height: 109}}
              />
            </View>
          ),
          // headerTitleStyle: {alignSelf: 'center', color: '#333333'},
          headerStyle: {
            backgroundColor: Color.background,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ForgotPasswordScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={Color.main}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('AirTicketScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons name={'arrow-back-ios'} size={26} color={null} />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function EarnCoinStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="EarnCoin"
        component={EarnCoin}
        options={{
          headerShown: false,
          headerTitle: 'Kiếm xu',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="InformationRestaurantScreen"
        component={InformationRestaurantScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Thông tin quán',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('EarnCoin');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditInformationRestaurantScreen"
        component={EditInformationRestaurantScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chỉnh sửa thông tin quán',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('InformationRestaurantScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="EditTableScreen"
        component={EditTableScreen}
        options={({route}) => ({
          // headerShown: false,
          headerTitle:
            route?.params?.status === 'edit' ? 'Chỉnh sửa bàn' : 'Thêm bàn',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ListTableScreen', {
                  store_id: route?.params?.store_id,
                });
                // console.log(route);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}></View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({route}) => ({
          // headerShown: false,
          headerTitle:
            route?.params?.status === 'edit'
              ? 'Chỉnh sửa món ăn'
              : 'Thêm món ăn',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.reset({
                //   index: 0,
                //   routes: [{name: 'ListProductScreen'}],
                // });
                props.navigation.navigate('ListProductScreen', {
                  category_food_id: route?.params?.category_food_id,
                  store_id: route?.params?.store_id,
                });
                // console.log(route);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}></View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="ListProductScreen"
        component={ListProductScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Danh sách món ăn',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.reset({
                  index: 0,
                  routes: [{name: 'EarnCoin'}],
                });
                props.navigation.navigate('EarnCoin');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ListTableScreen"
        component={ListTableScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Danh sách bàn ăn',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('EarnCoin');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          headerTitle: (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Images.logoNews}
                style={{width: 150, height: 40}}
                resizeMode="contain"
              />
            </View>
          ),
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="NewOrderOnlineDetailScreen"
        component={NewOrderOnlineDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết đơn mới',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OrderOnlineRecievedDetailScreen"
        component={OrderOnlineRecievedDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết đơn đã nhận',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OrderOnlineHasTakenDetailScreen"
        component={OrderOnlineHasTakenDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết đơn đã lấy',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OrderOnlineCancelledDetailScreen"
        component={OrderOnlineCancelledDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết đơn đã hủy',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Home');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function NotificationStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          headerShown: false,
          headerTitle: 'Thông báo',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function PersonalStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Personal"
        component={Personal}
        options={{
          headerShown: false,
          headerTitle: 'Thông báo',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="YourRestaurantScreen"
        component={YourRestaurantScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Quán của bạn',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AddRestaurantScreen');
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: Color.buttonColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 22, color: '#fff', fontWeight: '500'}}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddRestaurantScreen"
        component={AddRestaurantScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Thêm quán',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('YourRestaurantScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionScreen"
        component={PromotionScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chương trình khuyến mãi',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionJoinScreen"
        component={PromotionJoinScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chương trình đang tham gia',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionTimziScreen"
        component={PromotionTimziScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chương trình của TimZi',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionRestaurantScreen"
        component={PromotionRestaurantScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chương trình của cửa hàng',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AddPromotionRestaurantScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: Color.buttonColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 22, color: '#fff', fontWeight: '500'}}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionComboScreen"
        component={PromotionComboScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Combo của cửa hàng',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AddComboScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: Color.buttonColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 22, color: '#fff', fontWeight: '500'}}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ManageAccountStaffScreen"
        component={ManageAccountStaffScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Quản lý tài khoản nhân viên',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="DecentralizationStaffScreen"
        component={DecentralizationStaffScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chủ cửa hàng',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ActionDecentralizationStaffScreen"
        component={ActionDecentralizationStaffScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Nhân viên Elon Musk',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('DecentralizationStaffScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="RateOfUserScreen"
        component={RateOfUserScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Đánh giá của người dùng',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <View style={{marginTop: 70, alignItems: 'center'}}>
              <Image
                source={Images.logo}
                resizeMode="cover"
                style={{width: 308, height: 109}}
              />
            </View>
          ),
          // headerTitleStyle: {alignSelf: 'center', color: '#333333'},
          headerStyle: {
            backgroundColor: Color.background,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={Color.main}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('AirTicketScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="ConfirmChangePasswordScreen"
        component={ConfirmChangePasswordScreen}
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <View style={{marginTop: 70, alignItems: 'center'}}>
              <Image
                source={Images.logo}
                resizeMode="cover"
                style={{width: 308, height: 109}}
              />
            </View>
          ),
          // headerTitleStyle: {alignSelf: 'center', color: '#333333'},
          headerStyle: {
            backgroundColor: Color.background,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('ChangePasswordScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={Color.main}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('AirTicketScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                {/* <MaterialIcons name={'arrow-back-ios'} size={26} color={null} /> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="WalletScreen"
        component={WalletScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Ví tiền',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddMoneyScreen"
        component={AddMoneyScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Nạp tiền vào tài khoản',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('WalletScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="MoneyWithdrawalScreen"
        component={MoneyWithdrawalScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Rút tiền',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('WalletScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddPromotionRestaurantScreen"
        component={AddPromotionRestaurantScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Thêm chương trình',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionRestaurantScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionRestaurantDetailScreen"
        component={PromotionRestaurantDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết C.Trình cửa hàng',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionRestaurantScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionTimziDetailScreen"
        component={PromotionTimziDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết C.Trình TimZi',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionTimziScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="PromotionComboDetailScreen"
        component={PromotionComboDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết combo cửa hàng',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionComboScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AddComboScreen"
        component={AddComboScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Thêm combo',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionComboScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="EditComboScreen"
        component={EditComboScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chỉnh sửa combo',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('PromotionComboScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="AccountShipperScreen"
        component={AccountShipperScreen}
        options={({route}) => ({
          // headerShown: false,
          headerTitle: 'Shipper ruột',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Personal');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AddShipperScreen', {
                  store_id: route?.params?.store_id,
                });
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: Color.buttonColor,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 22, color: '#fff', fontWeight: '500'}}>
                  +
                </Text>
              </View>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AddShipperScreen"
        component={AddShipperScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Thêm shipper ruột',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('AccountShipperScreen');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('AddPromotionRestaurantScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {/* <Text style={{fontSize: 22, color: '#fff', fontWeight: '500'}}>
                  +
                </Text> */}
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function UtilitiesStack(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Utilities"
        component={Utilities}
        options={{
          headerShown: false,
          headerTitle: (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Images.logoNews}
                style={{width: 150, height: 40}}
                resizeMode="contain"
              />
            </View>
          ),
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
        }}
      />
      <Stack.Screen
        name="NewOrderOfflineDetailScreen"
        component={NewOrderOfflineDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết đơn đặt mới',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Utilities');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OrderOfflineReceivedDetailScreen"
        component={OrderOfflineReceivedDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết đơn đã nhận',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Utilities');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OrderOfflineServingDetailScreen"
        component={OrderOfflineServingDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết bàn đang phục vụ',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Utilities');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OrderOfflineServedDetailScreen"
        component={OrderOfflineServedDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết bàn đã phục vụ',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Utilities');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="OrderOfflineCancelledDetailScreen"
        component={OrderOfflineCancelledDetailScreen}
        options={{
          // headerShown: false,
          headerTitle: 'Chi tiết bàn đã hủy',
          headerTitleStyle: {alignSelf: 'center', color: '#fff'},
          headerStyle: {
            backgroundColor: Color.main,
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => {
                props.navigation.navigate('Utilities');
                // console.log(props);
              }}>
              <View style={{marginLeft: 20}}>
                <MaterialIcons
                  name={'arrow-back-ios'}
                  size={26}
                  color={'#fff'}
                />
              </View>
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate('LoginScreen');
                // console.log(props);
              }}>
              <View
                style={{
                  // marginLeft: 20,
                  marginRight: 10,
                  width: 30,
                  height: 30,
                  borderRadius: 4,
                  backgroundColor: null,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}></View>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default App;
