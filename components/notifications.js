import React from 'react';
import { Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import NotificationsApi from '../api/notifications_api'
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
// import messaging from '@react-native-firebase/messaging';

// limited functionality with Expo's notifications => push token is generated onnce per session
// Would need to reinstall the app, completely refresh or delete cache.
class NotificationServiceClass extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.navigation = props.navigation
    this.navigationState = props.navigationState
    // this.unsubscribe = messaging().onMessage(async remoteMessage => {
    //   Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // });
    this._handleNotification = this._handleNotification.bind(this)
  }
  componentDidMount() {
    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    NotificationsApi.registerForPushNotifications()
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user.uid !== this.props.user.uid) {
      // this.registerForPushNotificationsAsync()
    }
  }

  _handleNotification = notification => {
    console.log('hello')
    // TODO: don't show notificatino if already in ch
    if (notification.origin === 'received') {
      Vibration.vibrate();
    } else if (notification.origin === 'selected') {
      const message = notification.data.message
      const user = notification.data.message.from

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
const NotificationService = (props) => {
  const navigation = useNavigation();

  return <NotificationServiceClass {...props} navigation={navigation} />;
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(NotificationService);