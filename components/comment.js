import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, Text, Avatar } from '@ui-kitten/components';
import moment from "moment";
import Story from './story'

export const Comment = (props) => {
  console.log(props.comment)
  const { author, text, date } = props.comment
  return (
    <Layout style={styles.comment}>
      <Story avatar={author.avatar} />
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
    marginLeft: 20,
    flex: 1, flexWrap: 'wrap',
    flexDirection: 'row',
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
