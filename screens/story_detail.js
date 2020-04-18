
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, StatusBar } from 'react-native';
import { Avatar, Layout, Text, Icon, Button } from '@ui-kitten/components';
import { avatars } from '../img/avatarRequire'
import { SharedElement } from 'react-navigation-shared-element';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView } from '../components/camera';
import { useNavigation } from '@react-navigation/native';
import StoryApi from '../api/story_api';
import { LoadingIndicator } from '../components/loading_indicator';
const BackIcon = (props) => (
  <Icon {...props} name='arrow-back-outline' />
);
const NextIcon = (props) => (
  <Icon {...props} name='arrow-forward-outline' />
);

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
    navigation.goBack()
  }
  const goToCameraView = () => {
    navigation.navigate('CameraView')
  }
  const goToImagePickerView = () => {
    navigation.navigate('PickImageView', { handleImageFromPickImageView })
  }
  const onTouch = (e) => {
    if (e.nativeEvent.pageX > width / 2) {
      setPicIndex(picIndex === story.pictures.length - 1 ? 0 : picIndex + 1)
    } else {
      setPicIndex(picIndex === 0 ? story.pictures.length - 1 : picIndex - 1)
    }
  }
  return (
    <SafeAreaView >
      {story.pictures.length > 0 &&
        <>
          <Layout style={styles.header}>
            <Button icon={BackIcon} onPress={() => navigation.goBack()}>Go back</Button>
            <Layout style={{ backgroundColor: 'transparent', alignItems: 'center' }}>
              <SharedElement id={`${story.uid}-avatar`} style={{ flex: 1 }}>
                <Avatar source={avatars[story.avatar - 1].require} />
              </SharedElement>
              <SharedElement id={`${story.uid}-text`} >
                <Text>{story.displayName}</Text>
              </SharedElement>
            </Layout>
          </Layout>

          <Layout style={styles.imgContainer} onStartShouldSetResponder={onTouch}>
            <SharedElement id={`${story.uid}-image`} >
              <Image
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                resizeMode="contain"
                source={{ uri: story.pictures[picIndex].url, height, width }}
              />
            </SharedElement>
          </Layout>
        </>
      }

      {story.pictures.length === 0 &&
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
    position: 'absolute', zIndex: 20,
    marginTop: StatusBar.currentHeight + 20,
    paddingHorizontal: 20,
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  imgContainer: {
    zIndex: 2,
    top: 0, position: 'absolute',
    backgroundColor: 'black',
    flex: 1,
  },
  image: {
    backgroundColor: 'black',
    width: 33,
    height: 444,
  },
  button: {
    marginTop: 20,
    width: '50%'
  }
});


