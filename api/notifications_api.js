import { auth, db } from './init_firebase'
import AuthReduxService from '../services/auth_redux_service'
import { Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
// import messaging from '@react-native-firebase/messaging';

export default {
  registerAppWithFCM: async () => {
    // await messaging().registerDeviceForRemoteMessages();
  },
  registerForPushNotifications: async () => {

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
      console.log('regiseter')
      let expoToken = await Notifications.getExpoPushTokenAsync();
      console.log(expoToken)
      getPushToken().then(token => {
        if (!token) {
          updatePushToken(expoToken)
        }
      })
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
    function updatePushToken(token) {
      AuthReduxService.updateUserData({ pushToken: token })
      db.collection('users').doc(auth.currentUser.uid).update({ pushToken: token })
    }
    async function getPushToken() {
      const user = await db.collection('users').doc(auth.currentUser.uid)
      return user.get().then(doc => doc.data().pushToken)
    }
  },
  sendMessageNotification: (message) => {
    const user = db.collection('users').doc(message.to.uid).get()
    user.then(doc => {
      console.log('from ;' + message.from.displayName + 'sending to ' + message.to.displayName + doc.data().pushToken)
      const messageObj = {
        to: doc.data().pushToken,
        sound: 'default',
        title: 'Message from ' + message.user.name,
        body: message.text,
        data: { message },
        _displayInForeground: true,
      };
      fetch('https://exp.host/--/api/v2/push/send', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Accept-encoding': 'gzip, deflate',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageObj),
      });
    })
  }
}