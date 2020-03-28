import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Icon, Layout, Text, Avatar } from '@ui-kitten/components';
import moment from "moment";


export const Comment = (props) => {
  const { author, content, date } = props.comment
  return (
    <>
      <Layout style={styles.comment}>
        <Avatar style={styles.avatar} source={require('../img/2.jpg')} />
        <Layout style={styles.container}>
          <Text>
            <Text style={styles.author}>{author}: &nbsp;</Text>
            <Text style={styles.content}>{content}</Text>
          </Text>
          <Layout style={styles.footer}>
            <Text >{moment(date).fromNow()}</Text>
          </Layout>
        </Layout>
      </Layout>
      <Divider style={styles.divider} />
    </>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 10,
    opacity: 0.8
  },
  comment: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'row',

  },
  container: {
    flex: 1, flexWrap: 'wrap',
    flexDirection: 'row',
  },
  divider: {
    borderWidth: .5,
    width: '100%',
    borderColor: 'grey',
    marginVertical: 15
  },
  avatar: {
    marginRight: 20,
  },
  author: {
    fontWeight: 'bold'
  },
  date: {

  },
  content: {
  }
})
