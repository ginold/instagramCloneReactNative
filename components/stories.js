
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
import StoriesReduxService from '../services/stoires_redux_service'

class StoriesClass extends Component {
  constructor(props) {
    super(props)
    this.user = AuthApi.getUser()
    this.props = props
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
    console.log('construdto stories prop ' + props.stories.length)
  }
  componentDidMount() {
    if (this.props.stories.length === 0 && this.state.user.uid) {
      this.init()
    } else {
      this.handleStories(this.props.stories)
    }
  }
  init() {
    this.storiesRef.onSnapshot(querySnapshot => this.parseSnapshot(querySnapshot))
    StoryApi.getStories().then(stories => {
      StoriesReduxService.setStories(stories)
      this.handleStories(stories)
    })
    // Could run with Firebase Functions periodically but requires an upgraded account
    // setInterval(() => { StoryApi.deleteOldStories(this.state.stories) }, 60000)
  }
  parseSnapshot(snapshot) {
    if (this.state.initialized) {
      snapshot.docChanges().forEach(storySnapshot => {
        console.log('new story')
        this.handleUpdate(storySnapshot.doc.data())
      })
    }
  }
  handleUpdate(newStory) {
    // console.log('new story + ' + newStory.uid === this.user.uid)
    let myStory = this.myStory
    let allStories = this.state.stories
    if (newStory.uid === this.user.uid) {
      this.setState({ snackbarVisible: true })
      AuthReduxService.setAddingToStory(false)
      console.log('my story!')
      myStory = newStory
      myStory.displayName = 'My story'
      allStories.splice(0, 1)
      this.setState({ stories: [myStory, ...allStories] })
      return
    }

    for (let i = allStories.length - 1; i >= 0; i--) {
      if (newStory.uid === allStories[i].uid) {
        allStories[i] = newStory
        this.setState({ stories: allStories })
        return
      }
    }
  }
  handleStories(stories) {
    console.log('handle stories ' + this.user.displayName)
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
        <Layout style={{ paddingHorizontal: 10 }}>
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
  return { user: state.user, stories: state.stories }
}
export default connect(mapStateToProps)(Stories);


const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flexGrow: 1,
  },
  story: {
    flex: 1
  }
});