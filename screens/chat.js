import React from 'react';
import { StyleSheet, } from 'react-native';
import { Layout, Text } from '@ui-kitten/components';
import { Fab } from '../components/fab-details'
import { SafeAreaView, useSafeArea, SafeAreaProvider } from 'react-native-safe-area-context';
import { TopBackNavigation } from '../components/top_back_navigation'
import { GiftedChat } from 'react-native-gifted-chat'
import { db, auth } from '../api/init_firebase'
import { connect } from 'react-redux'
import MessagesApi from '../api/messages_api'
import Auth from '../api/auth_api'
import { UsersAutocomplete } from '../components/users_autocomplete';

export class ChatScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = { messages: [], initialized: false, isTyping: false, }
        this.messagesRef = db.collection('messages');
        this.user = { displayName: '', uid: '' }
        this.setUserData = this.setUserData.bind(this)
        this.detectTyping = this.detectTyping.bind(this);
        this.renderFooter = this.renderFooter.bind(this)
        Auth.authStateChanged(this.setUserData)
    }
    setUserData(data) {
        console.log(data)
        this.user = {
            displayName: data.displayName,
            uid: data.uid
        }
    }
    detectTyping(text) {
        console.log(text)
        if (text) this.setState({ isTyping: true })
        //  this.stopTyping();
    }
    parseSnapshot(snapshot) {
        if (this.state.initialized) {
            snapshot.docChanges().forEach(messageSnapshot => {
                //  console.log(' new message')
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
        //console.log(this.state.messages)
    }
    componentDidMount() {
        this.messagesRef.onSnapshot(querySnapshot => this.parseSnapshot(querySnapshot))
        MessagesApi.getMessages().then(messages => {
            this.setState({ messages, initialized: true })
        })
    }

    onSend(messages = []) {
        MessagesApi.sendMessage(messages[0])
        // this.setState(previousState => ({
        //     messages: GiftedChat.append(previousState.messages, messages),
        // }))
    }
    renderFooter() {
        if (this.state.isTyping)
            return <Text>You are typing</Text>
        else
            return null
    }
    render() {
        //   console.log(this.state.messages)
        const { navigation } = this.props;
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <TopBackNavigation navigation={navigation} />
                <Text>Messages with x</Text>
                <UsersAutocomplete />
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
            </SafeAreaView >
        )
    }
}
const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(ChatScreen)

const styles = StyleSheet.create({
})
