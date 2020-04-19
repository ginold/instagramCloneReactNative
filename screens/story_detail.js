
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, StatusBar } from 'react-native';
import { Avatar, Layout, Text, Icon, Button, ButtonGroup } from '@ui-kitten/components';
import { avatars } from '../img/avatarRequire'
import { SharedElement } from 'react-navigation-shared-element';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import StoryApi from '../api/story_api';
import AuthReduxService from '../services/auth_redux_service'
import moment from "moment";
import auth_api from '../api/auth_api';
import { LoadingIndicator } from '../components/loading_indicator';

const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline' />
);
const headerHeight = 100

export const StoryDetail = (props) => {
  const navigation = useNavigation()
  const story = props.route.params.story
  const [picIndex, setPicIndex] = React.useState(0)
  const width = Dimensions.get('window').width
  const height = Dimensions.get('window').height
  const [loading, setLoading] = React.useState(true)

  const nextImage = () => {
    setPicIndex(picIndex === story.pictures.length - 1 ? 0 : picIndex + 1)
  }
  const handleImageFromPickImageView = (result) => {
    StoryApi.addPictureToStory(result)
    AuthReduxService.setAddingToStory(true)
    navigation.goBack()
  }
  const goToCameraView = () => {
    navigation.navigate('CameraView')
  }
  const goToImagePickerView = () => {
    navigation.navigate('PickImageView', { handleImageFromPickImageView, imageForType: 'story' })
  }
  const onTouch = (e) => {
    if (e.nativeEvent.pageX > width / 2) {
      setPicIndex(picIndex === story.pictures.length - 1 ? 0 : picIndex + 1)
    } else {
      setPicIndex(picIndex === 0 ? story.pictures.length - 1 : picIndex - 1)
    }
  }
  return (
    <SafeAreaView style={{ justifyContent: 'flex-start', flex: 1 }}>
      {story.pictures.length > 0 &&
        <>
          <Layout style={styles.header}>
            <Button size='small' icon={BackIcon} onPress={() => navigation.goBack()} />
            {story.uid === auth_api.getUid() && <Button size='small' onPress={goToImagePickerView}>Choose from gallery</Button>}
            <Layout style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
              <SharedElement id={`${story.uid}-avatar`} >
                <Avatar source={avatars[story.avatar - 1].require} />
              </SharedElement>
              <SharedElement id={`${story.uid}-text`} >
                <Text style={{ color: "white" }}>{story.displayName}</Text>
              </SharedElement>
              <Text style={{ color: 'white' }}>{moment(story.pictures[picIndex].createdAt).fromNow(true)}</Text>
            </Layout>
          </Layout>
          {loading && <LoadingIndicator />}
          <Layout style={styles.imgContainer} onStartShouldSetResponder={onTouch}>
            <SharedElement id={`${story.uid}-image`} >
              <Image
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                resizeMode="contain"
                source={{ uri: story.pictures[picIndex].url, height: height - StatusBar.currentHeight - headerHeight, width: '100%' }}
              />
            </SharedElement>
          </Layout>
        </>
      }

      {(!story.pictures || story.pictures.length === 0) &&
        <Layout style={{ paddingHorizontal: 30, height: '100%', flexDirection: 'row', alignItems: 'center' }}>
          <Layout style={{ alignItems: 'center' }}>
            <SharedElement id={`${story.uid}-avatar`} >
              <Avatar source={avatars[story.avatar - 1].require} />
            </SharedElement>
            <Text style={{ marginTop: 20 }}>You don't have any stories. Would you like to add a picture?</Text>
            <Button onPress={goToCameraView} style={styles.button}>Take a picture</Button>
            <Button onPress={goToImagePickerView} style={styles.button}>Upload a picture</Button>
            <Button style={styles.button} onPress={() => props.navigation.goBack()}>Back</Button>
          </Layout>
        </Layout>

      }
    </SafeAreaView>
  );
}
StoryDetail.sharedElements = (navigation) => {
  const story = navigation.params.story
  return [
    { id: story.uid + '-avatar' },
    { id: story.uid + '-image' },
    { id: story.uid + '-text', resize: 'none', animation: 'fade' },
  ];
}
const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: '100%',
    height: headerHeight,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  imgContainer: {
    backgroundColor: 'black',
  },
  button: {
    marginTop: 20,
    width: '50%'
  }
});


