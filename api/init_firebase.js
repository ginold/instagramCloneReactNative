//import firebase from 'react-native-firebase';
import * as firebase from 'firebase'
require('firebase/firestore')
require('firebase/auth')
require('firebase/firebase-storage')
import { decode, encode } from 'base-64'
import { Platform } from 'react-native'

var firebaseConfig = {
  apiKey: "AIzaSyAjVnLnOUWwdAyT6tebbdVPemKtYDl7btI",
  authDomain: "instagramclone-b2da0.firebaseapp.com",
  databaseURL: "https://instagramclone-b2da0.firebaseio.com",
  projectId: "instagramclone-b2da0",
  storageBucket: "instagramclone-b2da0.appspot.com",
  messagingSenderId: "422091104705",
  appId: "1:422091104705:web:f91730494108923e74cf40",
  measurementId: "G-JEZE3KR54S"
};
if (Platform.OS !== 'web') {
  // BUG without it : 'cannot find crypto'
  global.crypto = require("@firebase/firestore");
  global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }
  if (!global.btoa) { global.btoa = encode; }
  if (!global.atob) { global.atob = decode; }
}


firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();
export const db = firebase.firestore();
export const auth = firebase.auth();
export const firebaseSvc = firebase