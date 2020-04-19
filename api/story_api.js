import { auth, db, storage, firebaseSvc } from './init_firebase'
const refLocation = 'pictures/stories'
import moment from "moment";

export default {
  deleteOldStories: async (stories) => {
    console.log('caling')
    if (stories) {
      const now = moment(new Date())
      const storageRef = storage.ref(refLocation)
      for (let story of stories) {
        if (story.pictures.length > 0) {
          const storyRef = db.collection('stories').doc(story.uid)

          for (let i = story.pictures.length - 1; i >= 0; i--) {
            const end = moment(story.pictures[i].createdAt); // another date
            const minutesDIff = now.diff(end, 'minutes')
            if (minutesDIff >= 10) {
              const pictureRef = storageRef.child(story.uid + '/' + story.pictures[i].imageName);
              console.log('delete picture')
              pictureRef.delete().then(function () {
                console.log('image from story deleted')
              }).catch(err => console.log(err));
              story.pictures.splice(i, 1)
            }
          }
          storyRef.update({ pictures: story.pictures.length ? story.pictures : [] })
        }
      }
    }
  },
  getStories: async () => {
    let storiesArr = []
    return new Promise(async (resolve, reject) => {
      try {
        const stories = await db.collection('stories').get()
        stories.docs.forEach((doc) => {
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
    const imageName = 'story' + Math.random() + '.jpg'
    const storageRef = storage.ref(refLocation);
    const myId = auth.currentUser.uid

    return new Promise((resolve, reject) => {
      const uploadTask = storageRef.child(myId + '/' + imageName).put(fileBlob)
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
          const story = db.collection('stories').doc(myId)
          story.get().then(doc => {
            if (doc.exists) {
              const oldPictures = doc.data().pictures
              const myPicture = { url: downloadURL, createdAt: Date.now(), location: refLocation + '/' + myId, imageName }
              const newPictures = [myPicture, ...oldPictures]
              story.update({ pictures: newPictures })
            } else {
              createNewStory(downloadURL, imageName, refLocation)
            }
          })
          resolve(downloadURL)
        });
      });
    })
    function createNewStory(picUrl, imageName, refLocation) {
      const myPicture = { url: picUrl, createdAt: Date.now(), location: refLocation + '/' + auth.currentUser.uid, imageName }
      const myStory = {
        displayName: auth.currentUser.displayName,
        uid: auth.currentUser.uid,
        avatar: auth.currentUser.photoURL,
        pictures: [myPicture]
      }
      db.collection('stories').doc(myStory.uid).set(myStory).then(() => {
        console.log('story created')
      })
    }
  },

}