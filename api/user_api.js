import { auth, db, functions } from './init_firebase'
import UserReduxService from '../services/user_redux_service'
import NotificationsApi from './notifications_api';

export default {
  authStateChanged: () => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user && user.displayName) {
          console.log('auth changed')
          UserReduxService.setUserData(user)
          NotificationsApi.registerForPushNotifications()
          resolve(user)
        } else {
          reject()
        }
      });
    })
  },
  signIn: async (email, password) => {
    return new Promise((resolve, reject) => {
      auth.signInWithEmailAndPassword(email, password).
        then(() => {
          resolve()
        })
        .catch(err => reject(err))
    })
  },
  getUser: () => {
    return auth.currentUser
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
          .then(() => {
            addAdditionalInfo(user)
            console.log('user created')
            console.log(auth.currentUser)
            addUserPropertiesToCollection({ ...auth.currentUser, displayName: user.name })
            UserReduxService.setUserData({ ...auth.currentUser, displayName: user.name, photoURL: user.avatar, avatar: user.avatar })
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
  getUsers: () => {
    return functions.httpsCallable('getUsers')()
      .then((res) => res.data)
      .catch(err => console.log(err))
  },
  getUserById: (id) => {
    return functions.httpsCallable('getUserById')(id)
      .then((res) => res.data)
      .catch(err => console.log(err))
  }
}

function addUserPropertiesToCollection(user) {
  db.collection("users").doc(user.uid).set({ conversations: [], displayName: user.displayName })
    .then(() => {
      console.log('user updated')
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}