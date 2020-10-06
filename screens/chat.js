import React from 'react';
import {
    StyleSheet, TouchableOpacity
} from 'react-native';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GiftedChat } from 'react-native-gifted-chat'
import { db, auth } from '../api/init_firebase'
import MessagesApi from '../api/messages_api'
import User from '../api/user_api'
import LastMessages from '../components/last_messages';
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
                <Text style={{ paddingHorizontal: 20, marginVertical: 10 }} category="h4">Messages</Text>
                <LastMessages navigation={navigation} />
            </Layout>
        </SafeAreaView>
    )
}

class ChatDetailsView extends React.Component {
    constructor(props) {
        super(props)
        this.withUser = {
            avatar: this.props.route.params.avatar,
            uid: this.props.route.params.withUserId,
            displayName: this.props.route.params.displayName
        }
        this.darkTheme = this.props.route.params.darkTheme
        console.log(this.darkTheme)
        this.chatId = this.getChatId(this.withUser.uid, auth.currentUser.uid)

        this.state = {
            createChatOnMessage: false,
            loading: true, displayName: null,
            me: User.getUser(),
            messages: [],
            initialized: false,
            isTyping: false
        }
        this.messagesRef = db.collection('messages').doc(this.chatId).collection('messages');
        this.renderFooter = this.renderFooter.bind(this)
        this.goToLastMessages = this.goToLastMessages.bind(this)
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
            to: { uid: this.withUser.uid, displayName: this.withUser.displayName }
        }
        if (this.state.createChatOnMessage) {
            console.log('creating chat')
            MessagesApi.createChat(this.withUser.uid, message).then(() => {
                this.setState({ initialized: true, loading: false, createChatOnMessage: false })
                MessagesApi.sendMessage(message, this.chatId)
            })
        } else {
            console.log('just sending')
            MessagesApi.sendMessage(message, this.chatId)
            MessagesApi.updateLastMessage(message, this.state.me.uid, this.withUser.uid, this.chatId)
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
    renderBubble() {
        const m = a.currentMessage
        return <Layout>
            <Text>{m.text}</Text>
            <Text style={styles.date}>{moment(m.createdAt).format('HH:mm')}</Text>
        </Layout>
    }

    render() {
        const { loading } = this.state
        return (
            <SafeAreaView style={{ flex: 1, borderBottomColor: 'lightgray', borderBottomWidth: .5, backgroundColor: this.darkTheme ? '#383838' : '#fff' }}>
                <Layout style={styles.header}>
                    <TouchableOpacity style={{ marginRight: 10 }} onPress={this.goToLastMessages} >
                        <Icon name='arrow-back' height={42} width={42} />
                    </TouchableOpacity>
                    <Story avatar={this.withUser.avatar} />
                    <Text style={{ marginLeft: 10, color: 'white' }} category='h5'>{this.withUser.displayName}</Text>
                </Layout>
                {loading && <LoadingIndicator />}
                {this.state.me.uid &&
                    <GiftedChat
                        //   renderFooter={this.renderFooter}
                        // renderBubble={this.renderBubble}
                        isTyping={this.state.isTyping}
                        messages={this.state.messages}
                        onSend={messages => this.onSend(messages)}
                        user={{
                            _id: this.state.me.uid,
                            name: this.state.me.displayName
                        }}
                        listViewProps={{
                            style: {
                                backgroundColor: this.darkTheme ? '#383838' : '#fff',
                            },
                        }}
                    />}
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'purple',
        paddingVertical: 7,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
})
