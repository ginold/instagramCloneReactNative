import { auth, db } from './init_firebase'
import AuthReduxService from '../services/auth_redux_service'

export default {
  updatePushToken: (token) => {
    AuthReduxService.updateUserData({ pushToken: token })
    db.collection('users').doc(auth.currentUser.uid).update({ pushToken: token })
  },
  sendMessageNotification: (message) => {
    const user = db.collection('users').doc(message.to.uid).get()
    user.then(doc => {
      const token = doc.data().pushToken
      const messageObj = {
        to: token,
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