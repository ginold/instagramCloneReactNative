import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text, Avatar } from '@ui-kitten/components';
import moment from "moment";

export const Comment = (props) => {
  const { author, text, date } = props.comment
  return (
    <Layout style={styles.comment}>
      <Avatar style={styles.avatar} source={require('../img/2.jpg')} />
      <Layout style={styles.container}>
        <Text style={styles.authorContent}>
          <Text style={styles.author}>{author.displayName}: &nbsp;</Text>
          <Text style={styles.content}>{text}</Text>
        </Text>
        <Layout style={styles.footer}>
          <Text >{moment(date).fromNow()}</Text>
        </Layout>
      </Layout>
    </Layout>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 10,
    opacity: 0.8
  },
  comment: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 20
  },
  container: {
    flex: 1, flexWrap: 'wrap',
    flexDirection: 'row',
  },
  avatar: {
    marginRight: 20,
  },
  author: {
    fontWeight: 'bold'
  },
  date: {

  },
  authorContent: {
    width: '100%'
  }
})
