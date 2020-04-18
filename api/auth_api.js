import { auth, db, functions } from './init_firebase'
import AuthReduxService from '../services/auth_redux_service'

export default {
  authStateChanged: (callback) => {
    return new Promise((resolve, reject) => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          AuthReduxService.setUserData(user)
          resolve(user)
          if (callback) return callback(user)
        } else {
          reject()
        }
      });
    })
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
  getUser: () => {
    return auth.currentUser
  },
  getUid: () => {
    return (auth.currentUser || {}).uid;
  },
  signOut: () => {
    auth.signOut().then(() => {
      AuthReduxService.signOut()
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
            addUserPropertiesToCollection(auth.currentUser)
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
  db.collection("users").doc(user.uid).set({ conversations: [] })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}