import {
  Button, Text, Layout, Icon
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import PostActions from './post_actions';
import SliderPostPhotos from './slider_post_photos'

export const CardItem = (props) => {

  const { title, description } = props.item
  const navigation = useNavigation()
  const navigateDetails = () => {
    navigation.navigate('Details');
  };

  return (
    <Layout style={styles.card}>
      {/* <Carousel screen='feed' /> */}
      <SliderPostPhotos screen='feed' />

      <Text>{description}</Text>
      <PostActions />
      <Button onPress={navigateDetails}>View more</Button>
    </Layout>
  )
}

const styles = StyleSheet.create({

  card: {
    flex: 1,
  }
});