import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import Images from '../Theme/Images';
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import styles from './Styles/SplashScreenStyles';

const SplashScreen = (props) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('Login');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={Images.logo}
        resizeMode="cover"
        style={{width: 308, height: 109}}
      />
    </View>
  );
};

export default SplashScreen;
