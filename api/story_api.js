import { auth, db, storage, firebaseSvc } from './init_firebase'

export default {
  getStories: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        let storiesArr = []
        const stories = await db.collection('stories').get()
        stories.docs.forEach((doc) => {
          console.log(doc)
          storiesArr.push({ ...doc.data() })
        })
        resolve(storiesArr)
      } catch (err) {
        reject(err)
      }
    })
  },
  addPictureToStory: async (picture) => {
    const localFile = await fetch(picture.uri);
    // then create a blob out of it (only works with RN 0.54 and above)
    const fileBlob = await localFile.blob();
    const storageRef = storage.ref('pictures/stories');

    return new Promise((resolve, reject) => {
      const uploadTask = storageRef.child(auth.currentUser.uid + '/story' + Math.random() + '.jpg').put(fileBlob)
      uploadTask.on('state_changed', function (snapshot) {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, function (error) {
        reject(error)
        console.log(error)
      }, function () {
        // Handle successful uploads on complete
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log('File available at', downloadURL);
          const story = db.collection('stories').doc(auth.currentUser.uid)
          story.get().then(doc => {
            console.log(doc)
            if (doc.exists) {
              console.log('exists')
              const oldPictures = doc.data().pictures
              const newPictures = [{ url: downloadURL, createdAt: Date.now() }, ...oldPictures]
              story.update({ pictures: newPictures })
            } else {
              console.log('nope')
              createNewStory(downloadURL)
            }
          })
          resolve(downloadURL)
        });
      });
    })
    function createNewStory(picUrl) {
      const myStory = {
        displayName: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        avatar: auth.currentUser.photoURL,
        pictures: [{ url: picUrl, createdAt: Date.now() }]
      }
      db.collection('stories').doc(myStory.uid).set(myStory).then(() => {
        console.log('story created')
      })
    }
  }
}

// story = {
//   'uid':23,
//   avatar: 2,
//   displayName: 'adam',
//   pictures: [
//     url: 'we', createdAt: new Date()
//   ],
// }
// https://firebasestorage.googleapis.com/v0/b/instagramclone-b2da0.appspot.com/o/pictures%2Fstories%2Fstory1%2FDSC06588.JPG?alt=media&token=1cdbadb0-8438-4244-9d7a-0ead46a43e68
// https://firebasestorage.googleapis.com/v0/b/instagramclone-b2da0.appspot.com/o/pictures%2Fstories%2Fstory1%2FDSC_1568.JPG?alt=media&token=837cae23-0de7-43e5-8be9-119677a7f150
// https://firebasestorage.googleapis.com/v0/b/instagramclone-b2da0.appspot.com/o/pictures%2Fstories%2Fstory1%2FDSC_1622.JPG?alt=media&token=04db39ec-8eb3-4ca5-aa48-3ddb6b6b2ec0

// https://firebasestorage.googleapis.com/v0/b/instagramclone-b2da0.appspot.com/o/pictures%2Fstories%2Fstory2%2FIMG_1106.JPG?alt=media&token=2e40eca0-6abd-4482-a348-92d178cb7a41
// https://firebasestorage.googleapis.com/v0/b/instagramclone-b2da0.appspot.com/o/pictures%2Fstories%2Fstory2%2FUntitled_Panorama1.jpg?alt=media&token=0c38e2db-7926-45aa-83a6-bb83aecba32c