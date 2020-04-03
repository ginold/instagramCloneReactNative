import AuthReduxService from '../services/auth_redux_service'
import { db, storage, auth } from './init_firebase'
import { user } from 'firebase-functions/lib/providers/auth'
import * as firebase from 'firebase'

export default {
  sendMessage: async (message, chatId) => {
    return new Promise((resolve, reject) => {
      db.collection('messages').doc(chatId).collection('messages').add(message)
        .then((res) => {
          console.log('message sent')
          resolve(res)
        })
        .catch(err => console.log(err))
    })
  },
  getMessages: async (chatId) => {
    let messagesArr = []
    let messages = await db.collection('messages').doc(chatId).collection('messages').orderBy('createdAt', 'desc').get()
    messages.docs.forEach(doc => {
      console.log(doc.data().createdAt)
      messagesArr.push({ ...doc.data(), createdAt: Date(doc.data().createdAt.seconds) })
    })
    return messagesArr
  },
  getUid: () => {
    return (auth.currentUser || {}).uid;
  },
  createChat: (receiverId, receiverDisplayName) => {
    console.log(receiverId)
    return new Promise((resolve, reject) => {
      const myId = auth.currentUser.uid
      const chatId = (myId + receiverId).split('').sort().join('');
      db.collection('messages').doc(chatId).set({ messages: [] }).then(() => {
        console.log('chat created')
        addConversationsToUsers(myId, receiverId, chatId, receiverDisplayName)
        resolve(chatId)
      }).catch(err => reject(err))
    })
  },
  getMyConversations: () => {
    console.log('getting conversations')
    return new Promise((resolve, reject) => {
      const me = db.collection('users').doc(auth.currentUser.uid).get()
      me.then(doc => resolve(doc.data().conversations))
        .catch(err => reject(err))
    })
  }
}

function addConversationsToUsers(myId, userId, chatId, receiverDisplayName) {
  console.log('adding conversations to users')
  console.log(myId, userId, chatId)
  const me = db.collection('users').doc(myId)
  const him = db.collection('users').doc(userId)

  const myChat = { chatId, withUserId: userId, displayName: receiverDisplayName }
  const hisChat = { chatId, withUserId: myId, displayName: auth.currentUser.displayName }

  me.update({ conversations: firebase.firestore.FieldValue.arrayUnion(myChat) })
  him.update({ conversations: firebase.firestore.FieldValue.arrayUnion(hisChat) })
}