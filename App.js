import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/Navigation/AppNavigation';
import {StatusBar, Alert} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/index';
import reactotron from 'reactotron-react-native';
import storage from './src/Screen/asyncStorage/Storage';
if (__DEV__) {
  import('./ReactotronConfig').then(() => {});
}
import OneSignal from 'react-native-onesignal';

export default class App extends React.Component {
  async componentDidMount() {
    // console.log('thai meo fake');
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('570a33bf-ddd5-414e-9470-a027dfd28faa');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      console.log('Prompt response:', response);
    });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        console.log(
          'OneSignal: notification will show in foreground:',
          notifReceivedEvent,
        );
        let notif = notifReceivedEvent.getNotification();

        const button1 = {
          text: 'Cancel',
          onPress: () => {
            notifReceivedEvent.complete();
          },
          style: 'cancel',
        };

        const button2 = {
          text: 'Complete',
          onPress: () => {
            notifReceivedEvent.complete(notif);
          },
        };

        Alert.alert('Complete notification?', 'Test', [button1, button2], {
          cancelable: true,
        });
      },
    );
    OneSignal.setNotificationOpenedHandler((notification) => {
      console.log('OneSignal: notification opened:', notification);
    });
    OneSignal.setInAppMessageClickHandler((event) => {
      console.log('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      console.log('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver((event) => {
      console.log('OneSignal: subscription changed:', event);
      this.setState({isSubscribed: event.to.isSubscribed});
    });
    OneSignal.addPermissionObserver((event) => {
      console.log('OneSignal: permission changed:', event);
    });

    const deviceState = await OneSignal.getDeviceState();
    // console.log('userrrrr', deviceState.userId);

    // reactotron.log('thai', await OneSignal.getDeviceState());
    storage.setItem('userIdPushNoti', deviceState.userId);
    this.setState({
      isSubscribed: deviceState.isSubscribed,
    });
  }

  render() {
    // console.log('thai meo');
    return (
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
          />
          <AppNavigation />
        </NavigationContainer>
      </Provider>
    );
  }
}
