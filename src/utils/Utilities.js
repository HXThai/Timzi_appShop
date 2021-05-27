import { check, openSettings, PERMISSIONS, requestMultiple, RESULTS } from 'react-native-permissions';
export const checkCam = async (props) => {
    if (Platform.OS !== 'ios') {
      check(PERMISSIONS.ANDROID.CAMERA).then(async status => {
        if (status === RESULTS.GRANTED) props.navigation.navigate("qrcode");
        if (status == RESULTS.DENIED || status == RESULTS.BLOCKED)
          await requestMultiple([PERMISSIONS.ANDROID.CAMERA]).then(async result => {
            if ((await result['android.permission.CAMERA']) === RESULTS.GRANTED) checkCam();
            else return;
          });
      });
    } else {
      check(PERMISSIONS.IOS.CAMERA).then(async status => {
        if (status === RESULTS.GRANTED) props.navigation.navigate("qrcode");
        if (status === RESULTS.DENIED || status === RESULTS.BLOCKED)
          await requestMultiple([PERMISSIONS.IOS.CAMERA]).then(async result => {
            console.log(result);
            if ((await result['ios.permission.CAMERA']) === RESULTS.GRANTED) checkCam(props);
            if (result['ios.permission.CAMERA'] === RESULTS.BLOCKED)
            console.log("lõi");
            //   await showMessages(R.strings().notification, 'Cho phép truy cập camera để sử dụng tính năng này.', () => openSettings());
            else return;
          });
      });
    }
  };