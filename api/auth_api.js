import { auth, db } from './init_firebase'
import AuthReduxService from '../services/auth_redux_service'

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
            addUserToCollection(auth.currentUser)
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
  }
  // getUsers: async () => {
  //   try {
  //     return new Promise(async (resolve, reject) => {
  //       let users = []
  //       const usersRef = await db.collection("users").get()
  //       console.log(usersRef)
  //       usersRef.docs.forEach((userRecord) => {
  //         console.log(userRecord);
  //         users.push(userRecord.data())
  //       });
  //       resolve(users)
  //     })
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
}

function addUserToCollection(user) {
  db.collection("users").add({ uid: user.uid })
    .then(function (docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function (error) {
      console.error("Error adding document: ", error);
    });
}