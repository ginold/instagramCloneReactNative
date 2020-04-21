
import React from 'react';
import { StyleSheet, Image, Animated } from 'react-native';
import { Avatar, Icon, Text, Layout } from '@ui-kitten/components';
import { avatars } from '../img/avatarRequire'
import { SharedElement } from 'react-navigation-shared-element';
import { useNavigation } from '@react-navigation/native';
import TouchableScale from 'react-native-touchable-scale';
import { connect } from 'react-redux'

const Story = (props) => {
  const interpolatedRotation = new Animated.Value(0)
  const interpolatedScale = new Animated.Value(0)
  const scale = interpolatedScale.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1]
  });
  const rotation = interpolatedRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '860deg']
  });
  const rotationStyle = { transform: [{ rotate: rotation }] }
  const scaleStyle = { transform: [{ scale }] }

  const navigation = props.navigation || useNavigation()
  const story = props.story
  const details = props.storyDetails
  const avatar = props.avatar ?
    avatars[props.avatar - 1].require :
    avatars[story.avatar - 1].require
  const isUserAddingStory = (story && props.user.isAddingToStory && story.uid === props.user.uid)

  React.useEffect(() => {
    if (isUserAddingStory) animateRotation()
    animateScaleIn()
  }, [props.user])

  const animateScaleIn = () => {
    Animated.timing(
      interpolatedScale,
      {
        toValue: 1,
        duration: 500,
      }
    ).start()
  }
  const animateRotation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(
          interpolatedRotation,
          {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          }
        ),
        Animated.timing(
          interpolatedRotation,
          {
            toValue: 0,
            duration: (1000),
            useNativeDriver: true
          }
        )
      ])

    ).start();
  }
  return (
    details ?
      <>
        <TouchableScale
          style={styles.flex}
          activeScale={0.9}
          tension={50}
          friction={7}
          useNativeDriver
          style={{ marginRight: 10, alignItems: 'center' }}
          onPress={() => navigation.navigate('StoryDetail', { story })}>

          <SharedElement id={`${story.uid}-avatar`} >
            <Animated.View style={[scaleStyle, isUserAddingStory ? rotationStyle : null]} ><Avatar size='large' source={avatar} /></Animated.View>
          </SharedElement>
          <SharedElement id={`${story.uid}-text`}  >
            <Text numberOfLines={1} >{story.displayName}</Text>
          </SharedElement>
          {story.pictures.length > 0 &&
            <SharedElement id={`${story.uid}-image`} >
              <Image source={{ uri: story.pictures[0].url }} />
            </SharedElement>}
        </TouchableScale>
      </>
      : <Avatar style={styles.story} source={avatar} />
  );
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps)(Story);

const styles = StyleSheet.create({
  loading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    transform: [{ scale: 1.3 }]
  }
});
