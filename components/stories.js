
import React, { Component } from 'react';
import { Layout, ListItem, List } from '@ui-kitten/components';
import Story from './story'
import StoryApi from '../api/story_api'
import { db } from '../api/init_firebase'
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux'
import AuthReduxService from '../services/auth_redux_service'
import StoriesReduxService from '../services/stoires_redux_service'

class StoriesClass extends Component {
  constructor(props) {
    super(props)
    this.props = props
    this.storiesRef = db.collection('stories')
    this.state = { stories: [], initialized: false, snackbarVisible: false }
    this.myStory = {
      displayName: 'My Story',
      displayName: props.user.displayName,
      uid: props.user.uid,
      avatar: props.user.photoURL,
      pictures: []
    }
    this.handleStories = this.handleStories.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.init = this.init.bind(this)
  }
  init() {
    this.storiesRef.onSnapshot(querySnapshot => this.parseSnapshot(querySnapshot))
    StoryApi.getStories().then(stories => {
      StoriesReduxService.setStories(stories)
      this.handleStories(stories)
      // could run in the cloud functions but requires an upgraded firebase account
      setInterval(() => {
        StoryApi.deleteOldStories(stories)
      }, 60000);
    })
  }
  parseSnapshot(snapshot) {
    if (this.state.initialized) {
      snapshot.docChanges().forEach(storySnapshot => {
        this.handleUpdate(storySnapshot.doc.data())
      })
    }
  }
  componentDidMount() {
    this.init()
  }
  componentDidUpdate(prevProps) {
    console.log('update ===================')

    // A logout has occured and stories in redux have been reset => reset state stories
    // if a new user has logged in => reinitialize 
    if (prevProps.user.uid !== this.props.user.uid && this.props.stories.length === 0) {
      console.log('new user')
      this.setState({
        stories: [], initialized: false
      }, () => {
        this.init()
      });
    }
  }
  handleStories(stories) {
    let myStory = {
      uid: this.props.user.uid,
      avatar: this.props.user.photoURL,
      pictures: []
    }
    for (let i = stories.length - 1; i >= 0; i--) {
      if (!stories[i].pictures || stories[i].pictures.length === 0) {
        stories.splice(i, 1)
        continue
      }
      if (stories[i].uid === this.props.user.uid) {
        myStory = stories[i]
        stories.splice(i, 1)
      }
    }
    myStory.displayName = 'My Story'
    this.setState({ stories: [myStory, ...stories], initialized: true })
  }
  handleUpdate(newStory) {
    let myStory = this.myStory
    let allStories = this.state.stories
    // if its my story, just update the first index of stories
    if (newStory.uid === this.props.user.uid) {
      this.setState({ snackbarVisible: true })
      AuthReduxService.setAddingToStory(false)
      myStory = newStory
      myStory.displayName = 'My story'
      allStories.splice(0, 1)
      this.setState({ stories: [myStory, ...allStories] })
      return
    }
    // if its an existing story of someone else, update
    for (let i = allStories.length - 1; i >= 0; i--) {
      if (newStory.uid === allStories[i].uid) {
        console.log('existing story!')
        if (!newStory.pictures || newStory.pictures.length === 0) {
          allStories.splice(i, 1)
        } else {
          allStories[i] = newStory
        }
        this.setState({ stories: allStories })
        return
      }
    }
    // a completely new story, add to the end
    console.log('another story')
    this.setState({ stories: [...allStories, newStory] })
  }

  renderItem = ({ item }) => (
    <ListItem key={`story-${item.id}`} >
      <Story storyDetails={true} story={item} />
    </ListItem>
  );
  render() {

    return (
      <>
        <Layout style={{ paddingHorizontal: 10, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: 'gray' }}>
          <List contentContainerStyle={{ backgroundColor: 'gray' }} horizontal={true} data={this.state.stories} renderItem={this.renderItem}></List >
        </Layout>
        <Snackbar
          visible={this.state.snackbarVisible}
          onDismiss={() => this.setState({ snackbarVisible: false })}
          duration={2000}
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