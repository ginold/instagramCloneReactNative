import {
  Text, Layout, Icon
} from '@ui-kitten/components';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const PostActions = () => {
  const [liked, setLiked] = React.useState(false);
  const [likes, setLikes] = React.useState(0)
  const _onPress = () => {
    setLiked(!liked);
    setLikes(prev => prev + 1)
  };
  const size = 32;

  return (
    <Layout style={styles.actions}>
      <TouchableOpacity onPress={_onPress}>
        <Icon name={'share-outline'} style={{ marginRight: 5 }} width={size} height={size} fill='gray' />
      </TouchableOpacity>
      <TouchableOpacity onPress={_onPress}>
        <Icon name={'message-circle-outline'} width={size} height={size} fill='gray' />
      </TouchableOpacity>
      <Layout style={styles.heartIcon}>
        <Text>{`${likes} likes`}  </Text>
        <TouchableOpacity onPress={_onPress}>
          <Icon name={liked ? 'heart' : 'heart-outline'} width={size} height={size} fill='red' />
        </TouchableOpacity>
      </Layout>
    </Layout>
  )
}

export default PostActions;


const styles = StyleSheet.create({
  actions: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
  },
  heartIcon: {
    right: 0, position: 'absolute', flexDirection: 'row',
    alignItems: 'center'
  }
})