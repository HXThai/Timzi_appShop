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
import {interpolate} from '@popmotion/popcorn';
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
} from '@fortawesome/free-solid-svg-icons';

const Home = (props) => {
  const [dataUser, setDataUser] = useState({
    image: Images.avatar,
    name: 'HOÀNG XUÂN THÁI',
    role: 'Quản lý',
    restaurant: 'Tokkio - BBQ Nhật Bản',
    phone: '0986868686',
    date: '12/12/2021',
  });

  const [dataCategories, setDataCategories] = useState([
    {icon: faStore, name: 'Quán của bạn (Tokkio - BBQ Nhật Bản)'},
    {icon: faTag, name: 'Chương trình khuyến mãi'},
    {icon: faUser, name: 'Tài khoản nhân viên'},
    {icon: faUsers, name: 'Phân cấp quyền nhân viên'},
    {icon: faClipboardList, name: 'Đánh giá của người dùng'},
    {icon: faKey, name: 'Đổi mật khẩu'},
    {icon: faSignOutAlt, name: 'Đăng xuất'},
  ]);

  const onClickCate = (index, props) => {
    if (index === 0) {
      props.navigation.navigate('YourRestaurantScreen');
    } else if (index === 1) {
      props.navigation.navigate('PromotionScreen');
    } else if (index === 2) {
      props.navigation.navigate('ManageAccountStaffScreen');
    } else if (index === 3) {
      props.navigation.navigate('DecentralizationStaffScreen');
    } else if (index === 4) {
      props.navigation.navigate('RateOfUserScreen');
    } else if (index === 5) {
      props.navigation.navigate('ChangePasswordScreen');
    }
  };

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
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    padding: 10,
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: '#fff',
                    borderRadius: 10,
                  }}>
                  <Image
                    source={dataUser.image}
                    style={{width: 60, height: 60}}
                  />
                  <View style={{marginLeft: 10, flexDirection: 'column'}}>
                    <Text style={{fontSize: 15, fontWeight: '700'}}>
                      {dataUser.name}
                    </Text>
                    <Text
                      style={{fontSize: 13, fontWeight: '400', marginTop: 10}}>
                      Vai trò: {dataUser.role}
                    </Text>
                    <Text
                      style={{fontSize: 13, fontWeight: '400', marginTop: 10}}>
                      Cửa hàng: {dataUser.restaurant}
                    </Text>
                    <Text
                      style={{fontSize: 13, fontWeight: '400', marginTop: 10}}>
                      Số điện thoại: {dataUser.phone}
                    </Text>
                    <Text
                      style={{fontSize: 13, fontWeight: '400', marginTop: 10}}>
                      Ngày tham gia: {dataUser.date}
                    </Text>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <TouchableOpacity
                        style={{
                          width: 80,
                          height: 22,
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                          borderRadius: 4,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Color.main,
                          }}>
                          Chỉnh sửa
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate('WalletScreen')
                        }
                        style={{
                          borderColor: Color.main,
                          borderWidth: 1,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                          borderRadius: 4,
                          width: 80,
                          height: 22,
                        }}>
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: '400',
                            color: Color.main,
                          }}>
                          Ví tiền
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{}}>
                  {dataCategories.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => onClickCate(index, props)}
                        key={index}
                        style={{
                          padding: 15,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          backgroundColor: '#fff',
                          borderRadius: 8,
                          marginTop: 10,
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <FontAwesomeIcon
                            color="#898989"
                            icon={item.icon}
                            size={24}
                            style={{}}
                            color={Color.main}
                          />
                          <Text
                            style={{
                              fontWeight: '400',
                              fontSize: 15,
                              marginLeft: 10,
                            }}>
                            {item.name}
                          </Text>
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
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>
        </ImageBackground>
      </View>
    </View>
  );
};

export default Home;
