
import {
  Autocomplete as KittenAutocomplete, Text, Layout, Icon, Card
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import React, { useRef } from 'react';
import { StyleSheet, Keyboard, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Story from './story'
import MessagesApi from '../api/messages_api'
import { LoadingIndicator } from './loading_indicator'
import Auth from '../api/auth_api'
import moment from "moment";
import { Autocomplete } from 'react-native-autocomplete-input'
import AuthApi from '../api/auth_api'
import { connect } from 'react-redux'

const CloseIcon = (style) => (
  <Icon {...style} name='close' />
);

const showEvent = Platform.select({
  android: 'keyboardDidShow',
  default: 'keyboardWillShow',
});

const hideEvent = Platform.select({
  android: 'keyboardDidHide',
  default: 'keyboardWillHide',
});

const LastMessages = (props) => {
  const [placement, setPlacement] = React.useState('bottom');
  const navigation = useNavigation()
  const autocompleteRef = useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(null);
  const [dataCopy, setDataCopy] = React.useState([]);
  const [conversations, setConversations] = React.useState(props.conversations)
  const myId = AuthApi.getUid()

  React.useEffect(() => {
    if (!data) getUsers()
    if (!conversations) {
      MessagesApi.getMyConversations().then(conversations => {
        setConversations(conversations)
        setLoading(false)
      })
    }
    if (needsUpdate(conversations, props.conversations)) {
      setConversations(props.conversations)
    }
    // const keyboardShowListener = Keyboard.addListener(showEvent, () => {
    //   setPlacement('top');
    // });
    // const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
    //   setPlacement('bottom');
    // });
    // return () => {
    //   keyboardShowListener.remove();
    //   keyboardHideListener.remove();
    // };
  }, [props.conversations])

  const needsUpdate = (c1, c2) => {
    if (!c1 || !c2) return false
    if (c1 && c1.length < c2.length) return true
    for (let i = 0; i <= c1.length - 1; i++) {
      if (c1[i].lastMessage.text !== c2[i].lastMessage.text) return true
    }
  }
  const getUsers = () => {
    Auth.getUsers().then(users => {
      for (let i = 0; i <= users.length - 1; i++) {
        if (users[i].uid === myId) {
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
    console.log(conversation)
    const { withUserId, displayName, avatar } = conversation
    setValue('');
    navigation.navigate('ChatDetailsView', { withUserId, displayName, avatar })
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
        <Story avatar={photoURL} />
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
      {/* <Layout style={styles.autocompleteContainer}>

        <Autocomplete
          data={data}
          defaultValue={value}
          onChangeText={onChangeText}
        />
      </Layout> */}
      <Layout style={{ flex: 1, marginTop: 20 }} >

        {loading && <LoadingIndicator />}
        {!loading &&
          <ScrollView
            keyboardShouldPersistTaps='handled'>
            {conversations && conversations.length > 0 && conversations.map(conv => {
              return <TouchableOpacity
                key={conv.chatId}
                style={styles.conversation}
                onPress={() => goToConversation(conv)}>

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
    conversations: state.user.conversations
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
