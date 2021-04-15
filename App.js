import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './src/Navigation/AppNavigation';
import {StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import store from './src/Redux/index';
if (__DEV__) {
  import('./ReactotronConfig').then(() => {});
}

export default class App extends React.Component {
  async componentDidMount() {
    console.log('thai meo fake');
    /* O N E S I G N A L   S E T U P */
    OneSignal.setAppId('3c83d522-638f-46fa-9735-392482461178');
    OneSignal.setLogLevel(6, 0);
    OneSignal.setRequiresUserPrivacyConsent(false);
    OneSignal.promptForPushNotificationsWithUserResponse((response) => {
      this.OSLog('Prompt response:', response);
    });

    /* O N E S I G N A L  H A N D L E R S */
    OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        this.OSLog(
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
      this.OSLog('OneSignal: notification opened:', notification);
    });
    OneSignal.setInAppMessageClickHandler((event) => {
      this.OSLog('OneSignal IAM clicked:', event);
    });
    OneSignal.addEmailSubscriptionObserver((event) => {
      this.OSLog('OneSignal: email subscription changed: ', event);
    });
    OneSignal.addSubscriptionObserver((event) => {
      this.OSLog('OneSignal: subscription changed:', event);
      this.setState({isSubscribed: event.to.isSubscribed});
    });
    OneSignal.addPermissionObserver((event) => {
      this.OSLog('OneSignal: permission changed:', event);
    });

    const deviceState = await OneSignal.getDeviceState();

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
