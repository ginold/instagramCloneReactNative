import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import { Icon, Layout, Button, ButtonGroup } from '@ui-kitten/components'
import { SafeAreaView, } from 'react-native-safe-area-context';
import StoryApi from '../api/story_api';
import { TopBackNavigation } from '../components/top_back_navigation'

export function CameraView({ navigation, route }) {
  const cameraRef = React.useRef(null)
  const fromPost = route.params && route.params.fromPost
  const [picture, setpicture] = useState(null)
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const size = 32

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    const pictureData = await cameraRef.current.takePictureAsync();
    setpicture(pictureData)
  }
  const addToStory = () => {
    navigation.navigate('Main', { screen: 'Feed' })
    StoryApi.addPictureToStory(picture)
  }
  const addPictureToPost = () => {
    if (route.params && route.params.handleImageFromAddPost) {
      route.params.handleImageFromAddPost(picture)
      navigation.goBack()
    } else {
      navigation.navigate('Add', { picture })
    }
  }
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopBackNavigation navigation={navigation} />

      {picture && <Layout style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', }}>
        <Layout style={styles.alignBottom}>

          {!fromPost && <Button onPress={() => addToStory()}>Add to story</Button>}
          <Button onPress={() => addPictureToPost()}>Add to post</Button>
          <Button onPress={() => setpicture(null)}>Take another picture</Button>
        </Layout>
        <Image source={{ uri: picture.uri, width: '100%', height: '100%' }} />
      </Layout>

      }
      {!picture && <Camera style={{ flex: 1 }} type={type} ref={cameraRef}>
        <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row', }}>
          <Layout style={styles.alignBottom}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Icon width={size} height={size} name='flip' fill='white' />
            </TouchableOpacity>
            <TouchableOpacity onPress={takePicture}>
              <Icon width={size} height={size} name='camera' fill='white' />
            </TouchableOpacity>
          </Layout>
        </View>
      </Camera>}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  alignBottom: {
    position: 'absolute',
    zIndex: 3,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'transparent',
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'row'
  }
})