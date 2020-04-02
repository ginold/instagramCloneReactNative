
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Avatar } from '@ui-kitten/components';


export default class Stories extends Component {
  render() {
    return (
      <Avatar
        style={styles.story}
        source={require('../img/2.jpg')}
      />
    );
  }
}

const styles = StyleSheet.create({
  story: {
  }
});


