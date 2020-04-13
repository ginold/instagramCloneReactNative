import React from 'react';
import {
    StyleSheet, TouchableOpacity, Animated,
    Easing,
} from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat'
import { db, auth } from '../api/init_firebase'
import { connect } from 'react-redux'
import MessagesApi from '../api/messages_api'
import Auth from '../api/auth_api'
import LastMessages from '../components/lastMessages';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Story from '../components/story'
import { LoadingIndicator } from '../components/loading_indicator'

const Stack = createStackNavigator();

export class ChatScreen extends React.Component {
    render() {
        return (
            <Stack.Navigator headerMode='none'>
                <Stack.Screen name="LastMessagesView" component={LastMessagesView} />
                <Stack.Screen options={{ ...TransitionPresets.SlideFromRightIOS }} name="ChatDetailsView" component={ChatDetailsView} />
            </Stack.Navigator>
        )
    }
}
export default ChatScreen

const LastMessagesView = ({ navigation }) => {
    return (
        <SafeAreaView style={{ flex: 1, paddingVertical: 10 }}>
            <Text style={{ paddingHorizontal: 20, marginBottom: 10 }} category="h4">Messages</Text>
            <LastMessages />
        </SafeAreaView >
    )
}

class ChatDetailsView extends React.Component {
    constructor(props) {
        super(props)
        this.withUserId = this.props.route.params.withUserId
        this.withUserDisplayName = this.props.route.params.displayName
        this.chatId = this.getChatId(this.withUserId, auth.currentUser.uid)
        this.withUserAvatar = this.props.route.params.avatar

        this.state = { createChatOnMessage: false, loading: true, displayName: null, uid: Auth.getUid(), messages: [], initialized: false, isTyping: false, }
        this.messagesRef = db.collection('messages').doc(this.chatId).collection('messages');
        this.setUserData = this.setUserData.bind(this)
        this.detectTyping = this.detectTyping.bind(this);
        this.renderFooter = this.renderFooter.bind(this)
        this.goToLastMessages = this.goToLastMessages.bind(this)
        Auth.getUserById(this.withUserId)
    }
    setUserData(data) {
        this.setState({ displayName: data.displayName, uid: data.uid })
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
            console.log(messages)
            if (messages.length === 0) {
                this.setState({ createChatOnMessage: true, loading: false })
            } else {
                this.setState({ messages, initialized: true, loading: false })
            }
        })
    }
    getChatId(id1, id2) {
        return (id1 + id2).split('').sort().join('');
    }
    onSend(messages = []) {
        if (this.state.createChatOnMessage) {
            MessagesApi.createChat(this.withUserId, messages[0]).then(() => {
                this.setState({ initialized: true, loading: false })
                MessagesApi.sendMessage(messages[0], this.chatId)
            })
        } else {
            MessagesApi.sendMessage(messages[0], this.chatId)
            MessagesApi.updateLastMessage(messages[0], this.state.uid, this.withUserId, this.chatId)
        }
    }
    renderFooter() {
        if (this.state.isTyping)
            return <Text>You are typing</Text>
        else
            return null
    }
    goToLastMessages() {
        this.props.navigation.navigate('LastMessagesView')
    }

    render() {
        const { loading, uid } = this.state
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Layout style={styles.header}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={this.goToLastMessages} >
                        <Icon name='arrow-back' height={42} width={42} />
                    </TouchableOpacity>
                    <Story avatar={this.withUserAvatar} />
                    <Text style={{ marginLeft: 10 }} category='h4'>{this.withUserDisplayName}</Text>
                </Layout>
                {loading && <LoadingIndicator />}
                {uid &&
                    <GiftedChat
                        //   renderFooter={this.renderFooter}
                        isTyping={this.state.isTyping}
                        messages={this.state.messages}
                        onInputTextChanged={this.detectTyping}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.state.uid,
                            name: this.state.displayName
                        }}
                    />}
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
    header: {
        backgroundColor: 'gray',
        paddingVertical: 7,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})
