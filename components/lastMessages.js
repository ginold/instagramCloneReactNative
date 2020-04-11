
import {
  Autocomplete, Text, Layout, Icon, Card
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Keyboard, Platform, ScrollView } from 'react-native';
import Story from './story'
import MessagesApi from '../api/messages_api'
import { LoadingIndicator } from './loading_indicator'
import Auth from '../api/auth_api'

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

export const LastMessages = (props) => {
  const [placement, setPlacement] = React.useState('bottom');
  const navigation = useNavigation()
  const [loading, setLoading] = React.useState(true);
  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [dataCopy, setDataCopy] = React.useState([]);
  const [conversations, setConversations] = React.useState([])

  React.useEffect(() => {
    getUsers()
    MessagesApi.getMyConversations().then(conversations => {
      setConversations(conversations)
      setLoading(false)
    })
    const keyboardShowListener = Keyboard.addListener(showEvent, () => {
      setPlacement('top');
    });
    const keyboardHideListener = Keyboard.addListener(hideEvent, () => {
      setPlacement('bottom');
    });
    return () => {
      keyboardShowListener.remove();
      keyboardHideListener.remove();
    };

  }, [])

  const getUsers = () => {
    Auth.getUsers().then(users => {
      setData(users)
      setDataCopy(users)
      console.log('got users')
    })
  }

  const goToConversation = (user) => {
    setValue('');
    navigation.navigate('ChatDetailsView', { withUserId: user.uid, displayName: user.displayName })
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

  return (
    <Layout style={styles.container}>

      <Autocomplete
        placeholder='Search for an user'
        value={value}
        data={data}
        icon={CloseIcon}
        placement={'bottom'}
        renderItem={autoCompleteItem}
        onIconPress={clearInput}
        placeholderData={[{ title: 'no data' }]}
        onChangeText={onChangeText}
        onSelect={goToConversation}
      />
      <Layout style={{ flex: 1 }} >
        {loading && <LoadingIndicator />}
        {!loading &&
          <ScrollView
            keyboardShouldPersistTaps='handled'>
            {conversations.map(conv => {
              return <Card
                style={{ width: '100%' }}
                onPress={() => goToConversation({ uid: conv.withUserId, displayName: conv.displayName })}>
                <Layout style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                  <Story />
                  <Text style={{ marginLeft: 10 }}>{conv.displayName}</Text>
                </Layout>
              </Card>
            })}
          </ScrollView>}
      </Layout>
    </Layout >
  );
};
const autoCompleteItem = (props) => {
  console.log(props)
  const { displayName } = props.item
  return (
    <Layout style={{
      flex: 1,
      flexDirection: 'row', alignItems: 'center',
    }}>
      <Story />
      <Text>{displayName}</Text>
    </Layout>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 20
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
