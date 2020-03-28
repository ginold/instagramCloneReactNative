import firebase from 'react-native-firebase';


export async function addPost() {
  let post = {
    description: 'qwewqe',
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  }
  firebase.firestore().collection.('posts').add(post)
    .then((data) => addComplete(data))
    .catch(err => console.log(err))
}

export async function getPosts() {
  let postArr = []
  let posts = await firebase.firestore().collection('posts').orderBy('createdAt').get()
  console.log(posts)

  posts.forEach(doc => {
    postArr.push(doc.data())
  })
}