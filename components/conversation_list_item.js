import React from 'react';
import moment from "moment";
import { TouchableOpacity, StyleSheet } from 'react-native';
import Story from './story'
import {
  Text, Layout
} from '@ui-kitten/components';


export const ConversationListItem = (props) => {
  const conv = props.conversation
  return (
    <TouchableOpacity
      style={styles.conversation}
      onPress={() => props.goToConversation(conv)}>

      <Layout style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
        <Story avatar={conv.avatar} style={{ marginLeft: 10, width: '20%' }} />
        <Layout style={{ marginLeft: 10, width: '80%' }}>
          <Text style={{ fontWeight: 'bold' }}>{conv.displayName}</Text>
          <Layout style={styles.messageDetails}>
            <Text numberOfLines={1}>{conv.lastMessage.text}</Text>
            <Text style={styles.date}>{moment(conv.createdAt).fromNow(true)}</Text>
          </Layout>
        </Layout>
      </Layout>

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  conversation: {
    width: '100%',
    marginBottom: 20
  },
  messageDetails: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    color: 'gold'
  },
});
