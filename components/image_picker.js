
import React from 'react';
import { StyleSheet, BackHandler, Image } from 'react-native';
import { Input, Icon, Layout, Text, Button } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LocationAutocomplete } from '../components/location_autocomplete'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export class ImagePickerExpo extends React.Component {
  constructor(props) {
    super(props)
    this.navigation = props.navigation
    this.route = props.route
    console.log(props)
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
        aspect: [12, 10],
        quality: 1,
        allowsMultipleSelection: true
      });
      console.log(result)
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