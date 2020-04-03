const functions = require('firebase-functions');
const admin = require('firebase-admin');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
admin.initializeApp();

exports.addMessage = functions.https.onRequest(async (req, res) => {
  res.status(201).send("OK").end();
});

exports.getUsers = functions.https.onRequest(async (req, res) => {
  let users = []
  // List batch of users, 1000 at a time.
  admin.auth().listUsers(1000).then((userResults) => {
    userResults.users.forEach(user => {
      users.push(user)
    })
    res.status(200).send(users).end()
    return users
  }).catch(err => res.status(400).send(err))

});

