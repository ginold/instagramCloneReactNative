import UserReduxService from '../services/user_redux_service'
import { db, auth } from './init_firebase'
import * as firebase from 'firebase'
import User from './user_api'
import NotificationsApi from '../api/notifications_api'

export default {
  sendMessage: async (message, chatId) => {
    return new Promise((resolve, reject) => {
      db.collection('messages').doc(chatId).collection('messages').add(message)
        .then((res) => {
          console.log('message sent')
          NotificationsApi.sendMessageNotification(message)
          resolve(res)
        })
        .catch(err => console.log(err))
    })
  },
  getMessages: async (chatId) => {
    let messagesArr = []
    let messages = await db.collection('messages').doc(chatId).collection('messages').orderBy('createdAt', 'desc').get()
    messages.docs.forEach(doc => {
      messagesArr.push({ ...doc.data(), createdAt: Date(doc.data().createdAt.seconds) })
    })
    return messagesArr
  },
  getUid: () => {
    return (auth.currentUser || {}).uid;
  },
  updateLastMessage: (message, myId, receiverId, chatId) => {
    const meRef = db.collection('users').doc(myId)
    const himRef = db.collection('users').doc(receiverId)
    const meDoc = db.collection('users').doc(myId).get()
    const himDoc = db.collection('users').doc(receiverId).get()
    const me = { ref: meRef, doc: meDoc }
    const him = { ref: himRef, doc: himDoc }
    const us = [me, him]
    console.log('last message updating')

    for (let user of us) {
      user.doc.then(doc => {
        const conversations = doc.data().conversations
        let cacheConversations = conversations // because conversations are read-only

        for (let i = 0; i <= conversations.length - 1; i++) {
          if (conversations[i].chatId === chatId) {
            let cacheConversation = conversations[i]
            cacheConversation.lastMessage = message
            cacheConversation.createdAt = Date.now()
            user.ref.update({ conversations: cacheConversations })
            console.log('last message updated')
            if (user.ref.id === myId) {
              cacheConversations.sort((a, b) => b.createdAt - a.createdAt)
              UserReduxService.setUserConversations(cacheConversations)
            }
            break
          }
        }
      })
        .catch(err => console.log(err))
    }
  },
  createChat: (receiverId, message) => {
    const myId = auth.currentUser.uid
    const chatId = (myId + receiverId).split('').sort().join('');

    return new Promise((resolve, reject) => {
      db.collection('messages').doc(chatId).set({ messages: [] }).then(() => {
        console.log('chat created')
        addConversationsToUsers(myId, receiverId, chatId, message)
        resolve(chatId)
      }).catch(err => reject(err))
    })
  },
  getMyConversations: () => {
    console.log('getting conversations for' + auth.currentUser.displayName)
    return new Promise((resolve, reject) => {

      const me = db.collection('users').doc(auth.currentUser.uid).get()
      me.then(doc => {
        console.log(doc.data())
        const conversations = doc.data().conversations
        console.log(conversations)
        if (!conversations || conversations.length === 0) {
          resolve([])
        } else {
          conversations.sort((a, b) => b.createdAt - a.createdAt)
          resolve(conversations)
        }
      })
        .catch(err => reject(err))
    })
  }
}

function addConversationsToUsers(myId, hisId, chatId, message) {
  console.log('adding conversations to users')
  const me = db.collection('users').doc(myId)
  const him = db.collection('users').doc(hisId)
  const lastMessage = message
  const promises = [User.getUserById(myId), User.getUserById(hisId)]

  Promise.all(promises).then(users => {
    const myConv = { chatId, withUserId: hisId, displayName: users[1].displayName, avatar: users[1].photoURL, lastMessage, createdAt: Date.now() }
    const hisConv = { chatId, withUserId: myId, displayName: users[0].displayName, avatar: users[0].photoURL, lastMessage, createdAt: Date.now() }

    me.update({ conversations: firebase.firestore.FieldValue.arrayUnion(myConv) })
    him.update({ conversations: firebase.firestore.FieldValue.arrayUnion(hisConv) })
    UserReduxService.addUserConversation(myConv)
  })

}