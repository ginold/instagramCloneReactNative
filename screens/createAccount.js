import React from 'react';
import { Text, Layout, Input, Button, Avatar } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, ScrollView, Animated, KeyboardAvoidingView, View } from 'react-native';
import User from '../api/user_api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingIndicator } from '../components/loading_indicator';
import { avatars } from '../img/avatarRequire'
import { BackHandler } from 'react-native';


export const CreateAccountScreen = ({ navigation, route }) => {
  const initAnimations = () => {
    let anims = []
    for (let i = 0; i <= avatars.length - 1; i++) {
      anims.push(new Animated.Value(0))
    }
    return anims
  }

  const activeAvatar = { borderWidth: 2, borderColor: 'gold' }
  const inactiveAvatar = { borderWidth: 0 }
  const [scaleAnim] = React.useState(initAnimations())
  const [error, setError] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [selectedAvatar, setSelectedAvatar] = React.useState(null)
  const [values, setValues] = React.useState({
    password: '', name: '', email: '', selectedAvatar: null
  });

  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    }

  }, [])
  const handleBackButtonClick = () => {
    navigation.goBack()
  }
  const scaleAvatar = (i) => {
    for (let j = 0; j <= avatars.length - 1; j++) {
      Animated.timing(
        scaleAnim[j],
        { toValue: j === i ? 1 : 0, duration: 200 }
      ).start();
    }
  }
  const getAvatars = () => {
    let avatarsEls = []
    for (let i = 0; i <= avatars.length - 1; i++) {
      avatarsEls.push(
        <Animated.View key={`${i}-avatar`} style={[styles.avatar,
        {
          transform: [
            {
              scaleX: scaleAnim[i].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            },
            {
              scaleY: scaleAnim[i].interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.1]
              })
            }
          ]
        }
        ]}>
          <TouchableOpacity onPress={() => { setSelectedAvatar(i + 1); scaleAvatar(i) }}  >
            <Avatar size='giant' style={(i + 1) === selectedAvatar ? activeAvatar : inactiveAvatar} source={avatars[i].require} />
          </TouchableOpacity>
        </Animated.View>
      )
    }
    return avatarsEls
  }
  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const createAccount = () => {
    setLoading(true)
    setError(false)
    User.createUser({ ...values, avatar: selectedAvatar }).then(() => {
      navigation.navigate('Feed')
      setLoading(false)
    }).catch(err => {
      setLoading(false)
      setError(true)
    })
  }
  return (
    <SafeAreaView style={{
      flex
        : 1
    }}>
      <Layout style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollViewStyle}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : null}>
            <Button style={[styles.button, { marginBottom: 20 }]} onPress={() => navigation.navigate('SignIn')}>Back to sign in</Button>

            <Text style={{ marginBottom: 20 }} category='h3'>Create an account</Text>
            <Layout style={styles.header}>
              <Text style={styles.label}>Choose your avatar</Text>
              <Layout style={[styles.content, styles.avatars]}>
                {getAvatars()}
              </Layout>
            </Layout>
            <Input
              style={styles.input}
              label='Name'
              placeholder='you visible name'
              value={values.name}
              onChangeText={(val) => handleChange('name', val)}
            />
            <Input
              style={styles.input}

              label='Email'
              placeholder='john.doe@example.com'
              value={values.email}
              onChangeText={(val) => handleChange('email', val)}
            />
            <Input
              style={styles.input}

              label='Password'
              placeholder='***'
              autoCompleteType={'password'}
              textContentType={'password'}
              value={values.password}
              onChangeText={(val) => handleChange('password', val)}
            />
            <Layout style={{ alignItems: 'center' }}>
              <Button style={[styles.createButton, styles.button]} onPress={createAccount}>Create!</Button>
            </Layout>
            {(!loading && error) && <Text category='h6' style={{ textAlign: 'center' }}>There was an error.</Text>}
          </KeyboardAvoidingView>
          {loading && <View style={styles.loading} ><LoadingIndicator /></View>}
        </ScrollView>
      </Layout>
    </SafeAreaView >
  );
};
let styles = StyleSheet.create({
  createButton: {
    marginTop: 20
  },
  input: {
    marginBottom: 10
  },
  button: {
    width: '50%'
  },
  scrollViewStyle: {
    justifyContent: 'center',
    marginHorizontal: 40, marginVertical: 20
  },
  avatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  avatar: {
    alignItems: 'center',
    width: '30%',
    marginBottom: 10,
  },
  loading: {
    position: 'absolute',
    flex: 1, width: '100%', height: '100%'
  },
  label: {
    marginBottom: 10
  },
})