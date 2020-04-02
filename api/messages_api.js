import AuthReduxService from '../services/auth_redux_service'
import { db, storage, auth } from './init_firebase'

export default {
  sendMessage: async (message) => {
    return new Promise((resolve, reject) => {
      const messagesRef = db.collection('messages').add(message)
        .then((res) => {
          console.log('message sent')
          resolve(res)
        })
        .catch(err => console.log(err))
    })
  },
  getMessages: async () => {
    let messagesArr = []
    let messages = await db.collection('messages').orderBy('createdAt', 'desc').get()
    messages.docs.forEach(doc => {
      console.log(doc.data().createdAt)
      messagesArr.push({ ...doc.data(), createdAt: Date(doc.data().createdAt.seconds) })
    })
    return messagesArr
  },
  getUid: () => {
    return (auth.currentUser || {}).uid;
  }
}