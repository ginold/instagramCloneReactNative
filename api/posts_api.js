import { db, storage, auth } from './init_firebase'
import * as firebase from 'firebase'
import PostsReduxService from '../services/post_redux_service'

export default {
  getPostById: async (id) => {
    let post = await db.collection("posts").doc(postId);
    return post.then(doc => doc.data())
  },
  getPosts: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let postArr = []
        const posts = await db.collection('posts').orderBy('createdAt', 'desc').get()
        posts.docs.forEach(async (doc) => {
          postArr.push({ ...doc.data(), id: doc.id })
        })
        resolve(postArr)
      } catch (err) {
        reject(err)
      }
    })
  },
  addLike: async (post) => {
    try {
      let postDoc = await db.collection("posts").doc(post.id);
      return postDoc.update({ ['likes.total']: firebase.firestore.FieldValue.increment(1) })
        .then(() => {
          console.log("Document likes successfully updated!");
        })
        .catch((error) => console.error("Error updating likes  document: ", error));
    } catch (error) {
      console.log(error)
    }
  },
  addComment: async (comments, postId) => {
    comments[0].author = {
      displayName: auth.currentUser.displayName,
      uid: auth.currentUser.uid,
      avatar: auth.currentUser.photoURL
    }
    try {
      let post = await db.collection("posts").doc(postId);
      return post.update({ comments })
        .then(function () {
          console.log("Document comments successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating comments  document: ", error);
        });
    } catch (error) {
      console.log(error)
    }
  },
  addPost: (post) => {
    try {
      post.createdAt = Date.now()
      post.author = {
        displayName: auth.currentUser.displayName,
        id: auth.currentUser.uid,
        avatar: auth.currentUser.photoURL
      }
      console.log('addign post')
      db.collection("posts").add(post)
        .then((docRef) => {
          post.id = docRef.id
          uploadPictures(post)
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } catch (err) {
      console.log(err)
    }

    async function uploadPictures(post) {
      let promises = []
      console.log(post)
      for (let p of post.pictures) {
        console.log('adding picture ', post.id)
        // first get our hands on the local file
        const localFile = await fetch(p.uri);
        // then create a blob out of it (only works with RN 0.54 and above)
        const fileBlob = await localFile.blob();
        const storageRef = storage.ref('pictures/posts');

        promises.push(new Promise((resolve, reject) => {
          const uploadTask = storageRef.child(post.id + '/photo' + Math.random() + '.jpg').put(fileBlob)
          uploadTask.on('state_changed', function (snapshot) {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          }, function (error) {
            reject(error)
            console.log(error)
          }, function () {
            // Handle successful uploads on complete
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
              console.log('File available at', downloadURL);
              resolve(downloadURL)
            });
          });
        }))
      }
      Promise.all(promises).then(urls => formatPostAndAddToFeed(post, urls))
    }
    async function formatPostAndAddToFeed(post, urls) {
      console.log('post finished!')
      post.pictures = urls
      PostsReduxService.addPost(post)
      const postDoc = await db.collection("posts").doc(post.id);
      postDoc.update({ pictures: urls })
    }
  }
}

// not useful anymore
// async function getImagesFromPost(postId) {
//   let folderRef = storage.ref("pictures/posts/" + postId);
//   let promises = []
//   let urls = await folderRef.listAll().then(res => {
//     res.items.forEach(image => {
//       promises.push(getImageUrl(image))
//     })
//     return Promise.all(promises).then(urls => urls)
//   })
//   return urls
// }

// function getImageUrl(imageRef) {
//   return new Promise((res, rej) => {
//     imageRef.getDownloadURL().then(url => {
//       res(url)
//     }).catch(err => console.log(err))
//   })
// }