const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onCall((data, context) => {
  return 'hello'
});

exports.getUsers = functions.https.onCall((data, context) => {
  let users = []
  console.log('getting users')
  // List batch of users, 1000 at a time.
  return admin.auth().listUsers(1000).then((userResults) => {
    userResults.users.forEach(user => {
      users.push(user)
    })
    return users
  }).catch(err => res.status(400).send(err.message))
});


exports.getUserById = functions.https.onCall((id, context) => {
  console.log(id)
  return admin.auth().getUser(id).then((userRecord) => {
    return userRecord
  }).catch((err => err.messag))
})
//To use this solution in your Firebase project, you must be on the Blaze billing plan
// exports.removeStoriesOlderThanTwoHours = functions.https.onCall((id, context) => {

//   const filePath = `photos/${userUID}/${photoUID}.png`
//   const bucket = googleCloudStorage.bucket('myBucket-12345.appspot.com')
//   const file = bucket.file(filePath)
//   const storiesRef = admin.database().ref('/stories')
//   const pictures = admin.storage().r
//   storiesRef.once('')

// });