
import {
  Autocomplete as KittenAutocomplete, Text, Layout, Icon
} from '@ui-kitten/components';
import React, { useRef } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Story from './story'
import MessagesApi from '../api/messages_api'
import { LoadingIndicator } from './loading_indicator'
import User from '../api/user_api'
import { connect } from 'react-redux'
import { ConversationListItem } from './conversation_list_item';
import UserReduxService from '../services/user_redux_service'

const CloseIcon = (style) => (
  <Icon {...style} name='close' />
);

const LastMessages = (props) => {
  const [placement, setPlacement] = React.useState('bottom');
  const navigation = props.navigation
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [dataCopy, setDataCopy] = React.useState([]);
  const [conversations, setConversations] = React.useState(props.user.conversations)
  const user = props.user

  React.useEffect(() => {
    console.log('conversations ')
    if (conversations) {
      console.log('con leng ' + conversations.length)
    }
    console.log(props.user.displayName)
    console.log(user.displayName)
    if (!data) getUsers()
    if (!conversations && user.uid) {
      MessagesApi.getMyConversations().then(conversations => {
        setConversations(conversations)
        console.log(conversations)
        UserReduxService.setUserConversations(conversations)
        setLoading(false)
      })
    } else if (!user.uid) {
      setConversations(null)
      setLoading(false)
    }
    if (needsUpdate(conversations, props.user.conversations)) {
      setConversations(props.user.conversations)
    }
  }, [props.user])

  const needsUpdate = (c1, c2) => {
    if (!c1 || !c2) return false
    if (c1 && c1.length < c2.length) return true
    for (let i = 0; i <= c1.length - 1; i++) {
      if (c1[i].lastMessage.text !== c2[i].lastMessage.text) return true
    }
  }
  const getUsers = () => {
    User.getUsers().then(users => {
      for (let i = 0; i <= users.length - 1; i++) {
        if (users[i].uid === user.uid) {
          users.splice(i, 1)
          break
        }
      }
      setData(users)
      setDataCopy(users)
      console.log('got users')
    })
  }

  const goToConversation = (conversation) => {
    const { withUserId, displayName, avatar } = conversation
    setValue('');
    navigation.navigate('ChatDetailsView', { withUserId, displayName, avatar, darkTheme: props.settings.darkTheme })
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(dataCopy.filter(item => {
      if (item.displayName) {
        if (item.displayName.toLowerCase().includes(query.toLowerCase())) {
          item.title = item.displayName
          return true
        }
      }
    }))
  };

  const clearInput = () => {
    setValue('');
    setData(dataCopy);
  };
  const autoCompleteItem = (props) => {
    const i = props.index
    const { displayName, photoURL, uid } = props.item

    return (
      <Layout style={{
        flex: 1, borderWidth: 1, borderColor: '#dcdcdc', borderRadius: 20,
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5
      }}>
        <Story navigation={navigation} avatar={photoURL} />
        <Text style={{ marginLeft: 20 }}>{displayName}</Text>
      </Layout>
    )
  }
  return (
    <Layout style={styles.container}>
      <KittenAutocomplete
        ref={autocompleteRef}
        placeholder='Search for an user'
        value={value}
        data={data}
        icon={CloseIcon}
        placement={'bottom start'}
        renderItem={autoCompleteItem}
        onIconPress={clearInput}
        onChangeText={onChangeText}
        onSelect={(user) => {
          goToConversation({ withUserId: user.uid, avatar: user.photoURL, displayName: user.displayName })
        }}
      />
      <Layout style={{ flex: 1, marginTop: 20 }} >

        {loading && <LoadingIndicator />}
        {!loading &&
          <ScrollView
            keyboardShouldPersistTaps='handled'>
            {conversations && conversations.length > 0 && conversations.map(conv => {
              return <ConversationListItem goToConversation={goToConversation} conversation={conv} key={conv.chatId + '-conversation'} />
            })}
            {(!conversations || conversations.length === 0) && <Text style={{ textAlign: 'center' }}>No conversations yet.</Text>}
          </ScrollView>
        }
      </Layout>

    </Layout >
  );
};
const mapStateToProps = state => {
  return {
    user: state.user,
    settings: state.settings
  }
}
export default connect(mapStateToProps)(LastMessages)

const styles = StyleSheet.create({
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    marginHorizontal: 20
  },
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20,
  },
  autocompletesContainer: {
    paddingTop: 0,
    zIndex: 1,
    width: "100%",
    paddingHorizontal: 8,
  },
  input: { maxHeight: 40 },
  inputContainer: {
    display: "flex",
    flexShrink: 0,
    flexGrow: 0,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#c7c6c1",
    paddingVertical: 13,
    paddingLeft: 12,
    paddingRight: "5%",
    width: "100%",
    justifyContent: "flex-start",
  }, plus: {
    position: "absolute",
    left: 15,
    top: 10,
  },
});
