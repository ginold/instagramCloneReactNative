import React from 'react';
import { StyleSheet, ScrollView, Image, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { Input, Icon, Layout, Text, Button, ButtonGroup } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationAutocomplete } from '../components/location_autocomplete'
import PostApiService from '../api/posts_api'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AuthReduxService from '../services/auth_redux_service'

export class AddScreen extends React.Component {

  constructor(props) {
    super(props)
    this.imgSize = Dimensions.get('window').width / 4.3
    this.paramPicture = props.route.params ? props.route.params.picture : null
    this.state = {
      post: {
        author: '', createdAt: null, description: '',
        location: {}, likes: { total: 0 }, comments: [],
        pictures: this.paramPicture ? [this.paramPicture] : []
      }
    }
    this.navigation = this.props.navigation
    this.defaultPost = this.state.post
    this._addPost = this._addPost.bind(this)
    this.pickImage = this.pickImage.bind(this)
    this.onSelectLocation = this.onSelectLocation.bind(this)
    this.addPictureFromCamera = this.addPictureFromCamera.bind(this)
  }
  addPictureFromCamera = (picture) => {

  }
  componentDidMount() {
    this.getPermissionAsync();
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') alert('Sorry, we need camera roll permissions to make this work!');
    }
  };
  handleImageFromPickImageView = (result) => {
    console.log(result)
    const post = this.state.post
    const imgs = [result, ...this.state.post.pictures]
    this.setState({ post: { ...post, pictures: imgs } });
  }
  pickImage = async () => {
    this.navigation.navigate('PickImageView', { handleImageFromPickImageView: this.handleImageFromPickImageView.bind(this), imageForType: 'post' })
  };
  takePhoto = () => {
    this.navigation.navigate('CameraView', { handleImageFromAddPost: this.handleImageFromPickImageView.bind(this), fromPost: true })
  }
  _addPost() {
    this.props.navigation.navigate('Main', { screen: 'Feed' })
    PostApiService.addPost(this.state.post)
    this.setState({ post: this.defaultPost })
    AuthReduxService.setAddingPost(true)
  }
  onSelectLocation(data) {
    if (!data.error_message) {
      const coordinates = data.result.geometry.location
      const name = data.result.name
      const location = { name, coordinates }
      let post = this.state.post
      post.location = location
      this.setState({ post })
    }
  }
  render() {
    const { pictures } = this.state.post;

    return (

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps='handled'>
          <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == "ios" ? "padding" : null}>
            <Layout style={{ padding: 20, flex: 1, height: Dimensions.get('window').height }}>
              <Text style={{ marginBottom: 20 }} category='h1'>Add post</Text>

              <Layout style={styles.picturesContainer}>
                <Text category='h6'>Add some images</Text>
                <Layout style={{ flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                  {pictures.length > 0 && pictures.map((img, i) => {
                    return <Image key={`image-${i}`} source={{ uri: img.uri }} style={{ marginTop: 5, marginRight: 10, marginBottom: 10, width: this.imgSize, height: this.imgSize }} />
                  })}
                  <TouchableOpacity onPress={this.pickImage}>
                    <Icon name='plus-outline' width={this.imgSize} height={this.imgSize} style={{ borderWidth: 1 }} fill='grey' />
                  </TouchableOpacity>
                </Layout>
                <ButtonGroup style={{ marginTop: 20, width: '100%' }}>
                  <Button style={{ flex: 1 }} onPress={this.pickImage}>Choose an image</Button>
                  <Button style={{ flex: 1 }} onPress={this.takePhoto}>Take a photo</Button>
                </ButtonGroup>
              </Layout>


              <Layout style={{ marginBottom: 20 }} >
                <Text category='h6' style={{ marginBottom: 10 }} > Add a caption</Text>
                <Input
                  multiline={true}
                  numberOfLines={4}
                  iconResult={<Icon name='home-outline' size={25} />}
                  placeholder={'write something...'}
                  onChangeText={(text) => {
                    const post = this.state.post
                    this.setState({ post: { ...post, description: text } })
                  }}
                  value={this.state.post.description}>
                </Input>
              </Layout>

              <Layout>
                <Text category='h6' style={{ marginBottom: 10 }}>Add a location</Text>
                <LocationAutocomplete onSelectLocation={this.onSelectLocation} />
              </Layout>
              <Button onPress={this._addPost}>SHARE</Button>
            </Layout>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView >
    );
  }
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  picturesContainer: {
    marginBottom: 20,
    borderWidth: 1, borderRadius: 20,
    padding: 20
  }
})


