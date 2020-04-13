
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from '@ui-kitten/components';
import AuthReduxService from '../services/auth_redux_service'
import { avatars } from '../img/avatarRequire'

export default class Stories extends Component {

  render() {
    const avatar = this.props.avatar ?
      avatars[this.props.avatar - 1].require :
      avatars[0].require

    return (
      <Avatar style={styles.story} source={avatar} />
    );
  }
}

const styles = StyleSheet.create({
  story: {
  }
});


