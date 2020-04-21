
import React from 'react';
import { BackHandler } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';


export class ImagePickerExpo extends React.Component {

  constructor(props) {
    super(props)
    this.aspect = { galleryAspect: [12, 10], storyAspect: [9, 15] }
    this.navigation = props.navigation
    this.route = props.route
    this.imageForType = this.route.params.imageForType
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this)
    this.handleImageFromPickImageView = this.props.route.params.handleImageFromPickImageView
  }
  componentDidMount() {
    this.getPermissionAsync();
    this.pickImage()
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  handleBackButtonClick() {
    this.navigation.goBack()
  }
  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') alert('Sorry, we need camera roll permissions to make this work!');
    }
  };
  pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: this.imageForType === 'story' ? this.aspect.storyAspect : this.aspect.galleryAspect,
        quality: .8,
        allowsMultipleSelection: true
      });
      if (!result.cancelled) {
        this.handleImageFromPickImageView(result)
        this.navigation.goBack()
      } else {
        this.navigation.goBack()

      }
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    return (<></>)
  }
}