import { auth, db } from './init_firebase'
import AuthReduxService from '../services/auth_redux_service'
const axios = require('axios').default;

export default {
  authStateChanged: (callback) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        AuthReduxService.setUserData(user)
        return callback(user)
      } else {
        // No user is signed in.
      }
    });
  },
  signIn: async (email, password) => {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password).
        then((res) => {
          AuthReduxService.setUserData(res.user)
          resolve(res.user)
        })
        .catch(err => reject(err))
    })
  },
  getUid: () => {
    return (auth.currentUser || {}).uid;
  },
  signOut: () => {
    auth.signOut().then(() => {
      console.log("Sign-out successful.");
    }).catch(function (error) {
      console.log("An error happened when signing out");
    });
  },
  createUser: async (user) => {
    try {
      return new Promise((resolve, rej) => {
        auth.createUserWithEmailAndPassword(user.email, user.password)
          .then((res) => {
            console.log(res)
            addAdditionalInfo(user)
            addUserAndConversationPropsToCollection(auth.currentUser)
            console.log(auth.currentUser)
            AuthReduxService.setUserData({ ...auth.currentUser, displayName: user.name, photoURL: user.avatar })
            resolve()
          })
          .catch(err => rej(err))
      })

      function addAdditionalInfo(userObj) {
        let user = auth.currentUser;
        user.updateProfile({
          displayName: userObj.name, // props given by firebase auth doc
          photoURL: userObj.avatar
        }).then((res) => {
          console.log('user created')
        }).catch(err => console.log(err))
      }
    } catch (err) {
      console.log(err)
    }
  },
  getUsers: async () => {
    return axios.get('https://us-central1-instagramclone-b2da0.cloudfunctions.net/addMessage')
    return axios.get('https://us-central1-instagramclone-b2da0.cloudfunctions.net/getUsers')
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    // firebase function in index.js
    // return fetch('https://us-central1-instagramclone-b2da0.cloudfunctions.net/getUsers',
    //   {
    //     method: 'GET',
    //     headers: {
    //       'Access-Control-Allow-Origin': '*',
    //       'Access-Control-Allow-Credentials': true,
    //       'Access-Control-Allow-Methods': 'POST, GET'
    //     }
    //   }).then(res => {
    //     console.log(res)
    //   })
  }
}

function addUserAndConversationPropsToCollection(user) {
  db.collection("users").doc(user.uid).set({ conversations: [] })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}