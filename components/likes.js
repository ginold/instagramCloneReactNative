import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import { Fab } from '../components/fab-details'
import { SafeAreaView, useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';
import SliderPostPhotos from '../components/slider_post_photos'
import CardActions from '../components/post_actions';
import { Comment } from '../components/comment'
import { TopBackNavigation } from '../components/top_back_navigation'
import PostService from '../api/posts_api'
import { connect, ReactReduxContext } from 'react-redux'

export class Likes extends React.Component {
  constructor(props) {
    super(props)
    console.log('likes constructor')
    this.state = { likes: props.likes }
  }
  render() {
    return (
      <Text>{this.state.likes.total}</Text>
    )
  }
}