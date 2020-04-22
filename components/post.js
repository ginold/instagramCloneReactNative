
import {
  Button, Text, Layout, Icon
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import PostActions from './post_actions';
import SliderPostPhotos from './slider_post_photos'
import Story from './story'
import moment from "moment";

export const Post = (props) => {
  const navigation = useNavigation()
  const navigateDetails = () => {
    navigation.navigate('Details', { post });
  };
  const post = props.item

  return (
    <Layout style={styles.card}>
      <Layout style={styles.header}>
        <Story avatar={post.author.avatar} />
        <Text style={styles.author}>{post.author.displayName}</Text>
        <Text style={styles.date}>{moment(post.createdAt).fromNow()}</Text>
      </Layout>
      <SliderPostPhotos screen='feed' pictures={post.pictures} navigation={navigation} />
      <Text>{post.description}</Text>
      {/* NEEED TO ADD A KEY IN ORDER TO RERENDER!@!!!! */}
      <PostActions key={`${post.id}-postactions`} post={post} />
      <Button onPress={navigateDetails}>View more</Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  date: {
    position: 'absolute',
    right: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10, marginTop: 10
  },
  author: {
    marginLeft: 10,
    fontWeight: 'bold'
  },
  card: {
    flex: 1,
  }
});
