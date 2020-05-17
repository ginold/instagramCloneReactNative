import React from 'react';
import PostList from '../components/post_list'
import Header from '../components/header'
import Stories from '../components/stories'
import { SafeAreaView, } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { connect } from 'react-redux'
import User from '../api/user_api'
import { LoadingIndicator } from '../components/loading_indicator';
import NotificationService from '../components/notifications';

const FeedScreen = (props) => {
    const [isAuth, setIsAuth] = React.useState(false)

    React.useEffect(() => {
        if (!props.user.uid) {
            User.authStateChanged().then((user) => {
                setIsAuth(true)
            }).catch(() => {
                setIsAuth(false)
                props.navigation.navigate('SignIn')
            })
        } else {
            setIsAuth(true)
        }
    }, [props.user])

    return (
        <SafeAreaView style={{ flex: 1 }} >
            {isAuth && <>
                <NotificationService />
                <Header />
                <Stories />
                <PostList />
            </>}
            {!isAuth && <LoadingIndicator />}
        </SafeAreaView >
    );
};
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(FeedScreen);

const gradient = () => {
    return (
        <LinearGradient
            colors={['#4c669f', '#3b5998', '#192f6a']}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
        </LinearGradient >
    )
}


