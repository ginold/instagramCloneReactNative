import { db, storage, auth } from './init_firebase'
import * as firebase from 'firebase'
import PostsReduxService from '../services/post_redux_service'

const timestamp = firebase.firestore.FieldValue.serverTimestamp()

let posts = [
  {
    description: 'The most basic use case is to plop down a TextInput and subscribe to the onChangeText events to read the user input. There are also other events, such as onSubmitEditing and onFocus that can be subscribed to. A minimal example:',
    createdAt: timestamp,
    author: 'Adam',
    likes: {
      total: 20,
      likedBy: ['marta', 'adamm']
    },
    pictures: [
      {
        title: 'beautifl', subtitle: 'jwioej', illustration: 'gs://instagramclone-b2da0.appspot.com/DSC06548.jpg'
      },
      { title: 'beautifl', subtitle: 'jwioej', illustration: 'gs://instagramclone-b2da0.appspot.com/DSC06562.jpg' },
      { title: 'beautifl', subtitle: 'jwioej', illustration: 'gs://instagramclone-b2da0.appspot.com/DSC06572.jpg' }

    ],
    comments: [
      { author: 'chuj', text: 'zxiocj ajsdoi owie jwioe', date: new Date(), likes: 2 }
    ]
  }
]

export default {
  getPostById: async (id) => {
    let post = await db.collection("posts").doc(postId);
    return post.then(doc => doc.data())
  },
  getPosts: async () => {

    try {
      let postArr = []
      let picturesUrl = []
      let posts = await db.collection('posts').orderBy('createdAt', 'desc').get()
      posts.docs.forEach(doc => {
        postArr.push({ ...doc.data(), id: doc.id })
      })

      picturesUrl = await getImagesFromPost()
      postArr.forEach(post => post['pictures'] = picturesUrl)

      return postArr
    } catch (err) {
      console.error(err)
    }

    async function getImagesFromPost(postId) {
      let folderRef = storage.ref("post1");
      let promises = []

      let urls = await folderRef.listAll().then(res => {
        res.items.forEach(image => {
          promises.push(getImageUrl(image))
        })
        return Promise.all(promises).then(urls => urls)
      })
      return urls
    }

    function getImageUrl(imageRef) {
      return new Promise((res, rej) => {
        imageRef.getDownloadURL().then(url => {
          res(url)
        }).catch(err => console.log(err))
      })
    }
  },
  addLike: async (post) => {
    try {
      let postDoc = await db.collection("posts").doc(post.id);
      return postDoc.update({ ['likes.total']: firebase.firestore.FieldValue.increment(1) })
        .then((ex) => {
          console.log("Document likes successfully updated!");
        })
        .catch(function (error) {
          console.error("Error updating likes  document: ", error);
        });
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
  addPost: async (post) => {
    try {
      post.createdAt = Date.now()
      post.author = {
        displayName: auth.currentUser.displayName,
        id: auth.currentUser.uid
      }
      return new Promise((resolve, reject) => {
        db.collection("posts").add(post)
          .then(function (docRef) {
            post.id = docRef.id
            resolve(post)
            console.log("Document written with ID: ", docRef.id);
          })
          .catch(function (error) {
            reject(error)
            console.error("Error adding document: ", error);
          });
      })
    } catch (err) {
      console.log(err)
    }
  }
}


function updateStatePosts(post) {
  console.log('update')
  let posts = PostsReduxService.getPosts()
  for (let p of posts) {
    if (p.id === post.id) {
      p = post
      break
    }
  }
  console.log('set')
  PostsReduxService.setPosts(posts)
}