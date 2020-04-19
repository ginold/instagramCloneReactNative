import React from 'react';
import { Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import NotificationsApi from '../api/notifications_api'
import { useNavigation, useNavigationState } from '@react-navigation/native';

class NotificationServiceClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expoPushToken: '',
      notification: {},
    };
    this.navigation = props.navigation
    this.navigationState = props.navigationState
    this._handleNotification = this._handleNotification.bind(this)
  }
  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      NotificationsApi.updatePushToken(token)
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = notification => {
    // TODO: don't show notificatino if already in chat
    if (notification.origin === 'received') {
      Vibration.vibrate();
    } else if (notification.origin === 'selected') {
      const user = notification.data.message.from
      console.log(this.navigationState)
      this.navigation.navigate('Chat', {
        screen: 'ChatDetailsView', params: {
          withUserId: user.uid,
          displayName: user.displayName,
          avatar: user.avatar
        }
      })
    }
  };

  render() {
    return null
  }
}

// Wrap and export
export const NotificationService = (props) => {
  const navigation = useNavigation();
  const state = useNavigationState(state => state);

  return <NotificationServiceClass {...props} navigation={navigation} navigationState={state} />;
}