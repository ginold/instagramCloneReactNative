import React from 'react';
import { StyleSheet, } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat'
import { db, auth } from '../api/init_firebase'
import { connect } from 'react-redux'
import MessagesApi from '../api/messages_api'
import Auth from '../api/auth_api'
import { UsersAutocomplete } from '../components/users_autocomplete';
import { createStackNavigator } from '@react-navigation/stack';
import Story from '../components/story'


const Stack = createStackNavigator();

export class ChatScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="LastMessagesView" component={LastMessagesView} />
                <Stack.Screen name="ChatDetailsView" component={ChatDetailsView} />
            </Stack.Navigator>
        )
    }
}
export default ChatScreen

const LastMessagesView = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Text category="h4">Messages</Text>
            <UsersAutocomplete />
        </SafeAreaView >
    )
}

class ChatDetailsView extends React.Component {
    constructor(props) {
        super(props)
        this.withUserId = this.props.route.params.withUserId
        this.withUserDisplayName = this.props.route.params.displayName
        this.chatId = this.getChatId(this.withUserId, auth.currentUser.uid)
        this.user = { displayName: '', uid: '' }

        this.state = { messages: [], initialized: false, isTyping: false, }
        this.messagesRef = db.collection('messages').doc(this.chatId).collection('messages');
        this.setUserData = this.setUserData.bind(this)
        this.detectTyping = this.detectTyping.bind(this);
        this.renderFooter = this.renderFooter.bind(this)
        Auth.authStateChanged(this.setUserData)
    }
    setUserData(data) {
        this.user = {
            displayName: data.displayName,
            uid: data.uid
        }
    }
    detectTyping(text) {
        //  console.log(text)
        if (text) this.setState({ isTyping: true })
        //  this.stopTyping();
    }
    parseSnapshot(snapshot) {
        if (this.state.initialized) {
            snapshot.docChanges().forEach(messageSnapshot => {
                console.log(' new message')
                //  let messages = this.state.messages
                const messageDoc = messageSnapshot.doc.data()

                this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, {
                        _id: messageDoc._id,
                        text: messageDoc.text,
                        timestamp: messageDoc.createdAt.seconds,
                        createdAt: Date(messageDoc.createdAt.seconds),
                        user: {
                            _id: messageDoc.user._id,
                            name: messageDoc.user.name
                        },
                    }),
                }));
            });
        }
    }
    componentDidMount() {
        this.messagesRef.onSnapshot(querySnapshot => this.parseSnapshot(querySnapshot))
        MessagesApi.getMessages(this.chatId).then(messages => {
            if (messages.length === 0) {
                MessagesApi.createChat(this.withUserId, this.withUserDisplayName).then(() => this.setState({ initialized: true }))
            } else {
                this.setState({ messages, initialized: true })
            }
        })
    }
    getChatId(id1, id2) {
        return (id1 + id2).split('').sort().join('');
    }
    onSend(messages = []) {
        MessagesApi.sendMessage(messages[0], this.chatId)
    }
    renderFooter() {
        if (this.state.isTyping)
            return <Text>You are typing</Text>
        else
            return null
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Layout>
                    <Story />
                    <Text category='h4'>{this.withUserDisplayName}</Text>
                </Layout>
                <GiftedChat
                    //   renderFooter={this.renderFooter}
                    isTyping={this.state.isTyping}
                    messages={this.state.messages}
                    onInputTextChanged={this.detectTyping}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: this.user.uid,
                        name: this.user.displayName
                    }}
                />
            </SafeAreaView>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     }
// }

const styles = StyleSheet.create({
})
