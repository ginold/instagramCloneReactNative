
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Layout, ListItem, List } from '@ui-kitten/components';
import Story from './story'
import StoryApi from '../api/story_api'
import AuthApi from '../api/auth_api'
import { db } from '../api/init_firebase'
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux'
import AuthReduxService from '../services/auth_redux_service'


// const Stories = (props) => {
//   const storiesRef = db.collection('stories')
//   const [stories, setStories] = React.useState([])
//   const [initialized, setInitialized] = React.useState(false)
//   const [snackbarVisible, setSnackbarVisible] = React.useState(false)
//   const user = props.user
//   const myStoryDefault = {
//     displayName: 'My Story',
//     uid: props.user.uid,
//     avatar: props.user.photoURL,
//     pictures: []
//   }

//   React.useEffect(() => {
//     console.log('mount')
//     setStories([])
//     storiesRef.onSnapshot(querySnapshot => parseSnapshot(querySnapshot))
//     StoryApi.getStories().then(stories => { handleStories(stories) })
//     // Could run with Firebase Functions periodically but requires an upgraded account
//     setInterval(() => { StoryApi.deleteOldStories(stories) }, 22000)
//   }, [props.user.uid])

//   const parseSnapshot = (snapshot) => {
//     console.log('parrse')
//     if (initialized) {
//       snapshot.docChanges().forEach(storySnapshot => {
//         console.log('new story')
//         const newStory = storySnapshot.doc.data()
//         handleUpdate(newStory)
//       })
//     }
//   }
//   const handleUpdate = (newStory) => {
//     console.log('handle update')

//     if (newStory.uid === props.user.uid) {
//       setSnackbarVisible(true)
//       AuthReduxService.setAddingToStory(false)
//     }
//     let myStory = myStoryDefault
//     let allStories = stories
//     console.log(props.user.displayName)
//     for (let i = allStories.length - 1; i >= 0; i--) {
//       if (newStory.uid === props.user.uid) {
//         console.log('my story!')
//         myStory = newStory
//         myStory.displayName = 'My story'
//         allStories.splice(0, 1)
//         setStories([myStory, ...allStories])
//         return
//       } else if (newStory.uid === allStories[i].uid) {
//         allStories[i] = newStory
//         setStories(allStories)
//         return
//       }
//     }
//   }
//   const handleStories = (stories) => {
//     console.log('handle stories')
//     let myStory = myStoryDefault
//     for (let i = stories.length - 1; i >= 0; i--) {
//       if (stories[i].uid === props.user.uid) {
//         myStory = stories[i]
//         stories.splice(i, 1)
//       }
//     }
//     myStory.displayName = 'My Story'
//     setStories([myStory, ...stories])
//     setInitialized(true)
//   }
//   const renderItem = ({ item }) => (
//     <ListItem key={`story-${item.id}`} >
//       <Story storyDetails={true} story={item} />
//     </ListItem>
//   );
//   return (
//     <>
//       <Layout>
//         <List contentContainerStyle={styles.container} horizontal={true} data={stories.filter(story => story.pictures.length > 0 || story.uid === user.uid)} renderItem={renderItem}></List >
//       </Layout>
//       <Snackbar
//         visible={snackbarVisible}
//         onDismiss={() => setSnackbarVisible(false)}
//         duration={4000}
//       > Story added!
//         </Snackbar>
//     </>
//   )
// }
// const mapStateToProps = state => {
//   return { user: state.user }
// }
// export default connect(mapStateToProps)(Stories);


class StoriesClass extends Component {
  constructor(props) {
    super(props)
    this.user = AuthApi.getUser()
    this.storiesRef = db.collection('stories')
    this.state = { stories: [], initialized: false, snackbarVisible: false, user: props.user }
    this.myStory = {
      displayName: 'My Story',
      uid: props.user.uid,
      avatar: props.user.photoURL,
      pictures: []
    }
    this.handleStories = this.handleStories.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.init = this.init.bind(this)
    console.log('construdto')
  }
  componentDidMount() {
    console.log('MOUNT')
    this.init()
  }
  init() {
    this.storiesRef.onSnapshot(querySnapshot => this.parseSnapshot(querySnapshot))
    StoryApi.getStories().then(stories => { this.handleStories(stories) })
    // Could run with Firebase Functions periodically but requires an upgraded account
    //  setInterval(() => { StoryApi.deleteOldStories(this.state.stories) }, 22000)
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('update')
    console.log(this.user.displayName)
    // if (prevProps.user.displayName !== this.user.displayName) {
    //   console.log('anders')
    //   //StoryApi.getStories().then(stories => { this.handleStories(stories) })
    // }
  }
  parseSnapshot(snapshot) {
    if (this.state.initialized) {
      snapshot.docChanges().forEach(storySnapshot => {
        console.log('new story')
        const newStory = storySnapshot.doc.data()
        this.handleUpdate(newStory)
      })
    }
  }
  handleUpdate(newStory) {
    if (newStory.uid === this.user.uid) {
      this.setState({ snackbarVisible: true })
      AuthReduxService.setAddingToStory(false)
    }
    let myStory = this.myStory
    let allStories = this.state.stories

    for (let i = allStories.length - 1; i >= 0; i--) {
      if (newStory.uid === this.user.uid) {
        console.log('my story!')
        myStory = newStory
        myStory.displayName = 'My story'
        allStories.splice(0, 1)
        this.setState({ stories: [myStory, ...allStories] })
        return
      } else if (newStory.uid === allStories[i].uid) {
        allStories[i] = newStory
        this.setState({ stories: allStories })
        return
      }
    }
  }
  handleStories(stories) {
    let myStory = this.myStory
    for (let i = stories.length - 1; i >= 0; i--) {
      if (stories[i].uid === this.user.uid) {
        myStory = stories[i]
        stories.splice(i, 1)
      }
    }
    myStory.displayName = 'My Story'
    this.setState({ stories: [myStory, ...stories], initialized: true })
  }
  renderItem = ({ item }) => (
    <ListItem key={`story-${item.id}`} >
      <Story storyDetails={true} story={item} />
    </ListItem>
  );
  render() {
    return (
      <>
        <Layout>
          <List contentContainerStyle={styles.container} horizontal={true} data={this.state.stories.filter(story => story.pictures.length > 0 || story.uid === this.user.uid)} renderItem={this.renderItem}></List >
        </Layout>
        <Snackbar
          visible={this.state.snackbarVisible}
          onDismiss={() => this.setState({ snackbarVisible: false })}
          duration={4000}
        > Story added!
        </Snackbar>
      </>
    );
  }
}
const Stories = (props) => {
  return (
    <StoriesClass {...props} />
  )
}
const mapStateToProps = state => {
  return { user: state.user }
}
export default connect(mapStateToProps)(Stories);


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flexGrow: 1
  },
  story: {
    flex: 1
  }
});