
import React from 'react';
import { StyleSheet, Animated, Image, Share } from 'react-native';
import { Avatar, ViewPager, Icon, Text } from '@ui-kitten/components';
import { avatars } from '../img/avatarRequire'
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';

export default (props) => {
  const navigation = props.navigation || useNavigation()
  const [picIndex, setPicIndex] = React.useState(0)
  const story = props.story
  const details = props.storyDetails
  const avatar = props.avatar ?
    avatars[props.avatar - 1].require :
    avatars[props.story.avatar - 1].require

  const nextImage = () => {
    setPicIndex(picIndex === story.pictures.length - 1 ? 0 : picIndex + 1)
  }
  return (
    details ?
      <TouchableScale
        style={styles.flex}
        activeScale={0.9}
        tension={50}
        friction={7}
        useNativeDriver
        onPress={() => navigation.navigate('StoryDetail', { story })}>

        <SharedElement id={`${story.uid}-avatar`} >
          <Avatar style={[styles.story]} source={avatar} />
        </SharedElement>
        <SharedElement id={`${story.uid}-text`}>
          <Text numberOfLines={1} style={{ width: 50 }}>{story.displayName}</Text>
        </SharedElement>
        {story.pictures.length > 0
          ? <SharedElement id={`${story.uid}-image`} >
            <Image source={{ uri: story.pictures[0].url }} />
          </SharedElement>
          : <Icon name='plus-outline' heigth={20} width={20} />
        }
      </TouchableScale>
      : <Avatar style={styles.story} source={avatar} />
  );
}

const styles = StyleSheet.create({
  story: {
    padding: 5,
  }
});
