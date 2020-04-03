import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBackNavigation } from '../components/top_back_navigation'
import { LocationAutocomplete } from '../components/location_autocomplete'
import PostApiService from '../api/posts_api'
import PostsReduxService from '../services/post_redux_service'

const pictures = [
  {
    title: 'beautifl', subtitle: 'jwioej', illustration: 'gs://instagramclone-b2da0.appspot.com/DSC06548.jpg'
  },
  { title: 'beautifl', subtitle: 'jwioej', illustration: 'gs://instagramclone-b2da0.appspot.com/DSC06562.jpg' },
  { title: 'beautifl', subtitle: 'jwioej', illustration: 'gs://instagramclone-b2da0.appspot.com/DSC06572.jpg' }

]

let postObj = {
  author: '', createdAt: null, description: '',
  location: {}, likes: { total: 0 }, comments: [],
  pictures: [{
    title: '', subtitle: '', illustration: '',
  }]
}

export class AddScreen extends React.Component {

  constructor(props) {

    //fetch('https://cors-anywhere.herokuapp.com/https://us-central1-instagramclone-b2da0.cloudfunctions.net/getUsers',
    fetch('http://localhost:5001/instagramclone-b2da0/us-central1/getUsers',

      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Access-Control-Allow-Methods': 'POST, GET'
        }
      }).then(res => {
        console.log(res)
      })
    super(props)
    this.state = { post: postObj }
    this._addPost = this._addPost.bind(this)
  }

  _addPost() {
    let post = this.state.post
    PostApiService.addPost(post).then((addedPost) => {
      this.props.navigation.navigate('Home')
      this.setState({ post: postObj })
      PostsReduxService.addPost(addedPost)
    })
  }
  onSelectLocation(location) {
    console.log(location)
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='handled'>
          <Button>Next</Button>
          <Layout>
            <Text category='h1'>Add post</Text>
            <Button>chooose a photo</Button>
            {/* <Cameraroll /> */}
          </Layout>

          <Layout>
            <Text>Add a caption</Text>
            <Input
              multiline={true}
              numberOfLines={4}
              iconResult={<Icon name='home-outline' size={25} />}
              placeholder={'write something...'}
              onChangeText={(text) => {
                let post = this.state.post
                this.setState({ post: { ...post, description: text } })
              }}
              value={this.state.text}>
            </Input>
          </Layout>

          <Layout>
            <Text>Add a location</Text>
            <LocationAutocomplete onSelectLocation={this.onSelectLocation} />
          </Layout>

          <Button onPress={this._addPost}>SHARE</Button>

        </ScrollView>
      </SafeAreaView >
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20
  }
})
