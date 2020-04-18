
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { Layout, ListItem, List, Avatar } from '@ui-kitten/components';
import Story from './story'
import StoryApi from '../api/story_api'
import AuthApi from '../api/auth_api'
import { db } from '../api/init_firebase'
import { Snackbar } from 'react-native-paper';

export default class Stories extends Component {
  constructor(props) {
    super(props)
    this.user = AuthApi.getUser()
    this.storiesRef = db.collection('stories')
    this.state = { stories: [], initialized: false, snackbarVisible: false }
    this.handleStories = this.handleStories.bind(this)
  }
  componentDidMount() {
    this.storiesRef.onSnapshot(querySnapshot => this.parseSnapshot(querySnapshot))

    StoryApi.getStories().then(stories => {
      this.handleStories(stories)
    })
  }
  parseSnapshot(snapshot) {
    if (this.state.initialized) {
      snapshot.docChanges().forEach(storySnapshot => {
        console.log('new story')
        this.handleStories(this.state.stories, storySnapshot.doc.data())
      })
    }
  }
  handleStories(stories, newStory) {
    // User has no stories
    let myStory = {
      uid: this.user.uid,
      avatar: this.user.photoURL,
      pictures: []
    }
    if (newStory) {
      let currentStories = this.state.stories
      stories = [newStory, ...currentStories]
      if (newStory.uid === this.user.uid) this.setState({ snackbarVisible: true })
    }

    for (let i = stories.length - 1; i >= 0; i--) {
      if (stories[i].uid === this.user.uid) {
        myStory = stories[i]
        stories.splice(i, 1)
      }
    }
    myStory.displayName = 'My Story'
    this.setState({ stories: [myStory, ...stories], initialized: true })
  }
  renderItem = ({ item, index }) => (
    <ListItem key={`story-${item.id}`} >
      <Story storyDetails={true} story={item} />
    </ListItem>
  );
  render() {
    return (
      <>
        <Layout>
          <List contentContainerStyle={styles.container} horizontal={true} data={this.state.stories} renderItem={this.renderItem}></List >
        </Layout>
        <Snackbar
          visible={this.state.snackbarVisible}
          onDismiss={() => this.setState({ snackbarVisible: false })}
          duration={5000}
        > Story added!
        </Snackbar>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flexGrow: 1
  },
  story: {
    flex: 1
  }
});