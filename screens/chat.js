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
import moment from "moment";

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
            <Layout style={{ flex: 1 }}>
                <Text style={{ paddingHorizontal: 20, marginBottom: 10 }} category="h4">Messages</Text>
                <LastMessages navigation={navigation} />
            </Layout>
        </SafeAreaView>
    )
}

class ChatDetailsView extends React.Component {
    constructor(props) {
        super(props)
        this.withUserId = this.props.route.params.withUserId
        this.withUserDisplayName = this.props.route.params.displayName
        this.chatId = this.getChatId(this.withUserId, auth.currentUser.uid)
        this.withUserAvatar = this.props.route.params.avatar

        this.state = { createChatOnMessage: false, loading: true, displayName: null, me: Auth.getUser(), messages: [], initialized: false, isTyping: false, }
        this.messagesRef = db.collection('messages').doc(this.chatId).collection('messages');
        this.detectTyping = this.detectTyping.bind(this);
        this.renderFooter = this.renderFooter.bind(this)
        this.goToLastMessages = this.goToLastMessages.bind(this)
        Auth.getUserById(this.withUserId)
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
        let message = {
            ...messages[0],
            from: {
                avatar: this.state.me.photoURL,
                uid: this.state.me.uid,
                displayName: this.state.me.displayName
            },
            to: { uid: this.withUserId }
        }
        if (this.state.createChatOnMessage) {
            MessagesApi.createChat(this.withUserId, message).then(() => {
                this.setState({ initialized: true, loading: false })
                MessagesApi.sendMessage(message, this.chatId)
            })
        } else {
            MessagesApi.sendMessage({ ...message, to: { uid: this.withUserId } }, this.chatId)
            MessagesApi.updateLastMessage(message, this.state.me.uid, this.withUserId, this.chatId)
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
    renderBubble(a) {
        console.log(a)
        const m = a.currentMessage
        return <Layout>
            <Text>{m.text}</Text>
            <Text style={styles.date}>{moment(m.createdAt).format('HH:mm')}</Text>
        </Layout>
    }

    render() {
        const { loading } = this.state
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
                {this.state.me.uid &&
                    <GiftedChat
                        //   renderFooter={this.renderFooter}
                        isTyping={this.state.isTyping}
                        messages={this.state.messages}
                        onInputTextChanged={this.detectTyping}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.state.me.uid,
                            name: this.state.me.displayName
                        }}
                    // renderBubble={this.renderBubble}
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
