import React, { useRef } from 'react';
import { Text, Layout, Input, Button, Avatar } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import Auth from '../api/auth_api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LoadingIndicator } from '../components/loading_indicator';
import { avatars } from '../img/avatarRequire'


export const CreateAccountScreen = ({ navigation }) => {
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
        <Animated.View style={[styles.avatar,
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
    Auth.createUser({ ...values, avatar: selectedAvatar }).then(() => {
      navigation.navigate('Feed')
    }).catch(err => {
      setLoading(false)
      setError(true)
    })
  }
  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}>
        <Button style={[styles.button, { marginBottom: 20 }]} onPress={() => navigation.navigate('SignIn')}>Back to sign in</Button>

        <Text style={{ marginBottom: 20 }} category='h3'>Create an account</Text>
        <Layout style={styles.header}>
          <Text style={styles.label}>Choose your avatar</Text>
          <Layout style={[styles.content, styles.avatars]}>
            {getAvatars()}
          </Layout>
        </Layout>
        <Input
          label='Name'
          placeholder='you visible name'
          value={values.name}
          onChangeText={(val) => handleChange('name', val)}
        />
        <Input
          label='Email'
          placeholder='john.doe@example.com'
          value={values.email}
          onChangeText={(val) => handleChange('email', val)}
        />
        <Input
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
      </ScrollView>
      {loading && <LoadingIndicator style={styles.loading} />}
    </SafeAreaView >
  );
};
let styles = StyleSheet.create({
  createButton: {
    marginTop: 20
  },
  button: {
    width: '50%'
  },
  scrollViewStyle: {
    flex: 1, justifyContent: 'center',
    marginHorizontal: 40, marginVertical: 20
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
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
    height: '100%',
    width: '100%',
    top: 0,
    left: 0
  },
  label: {
    marginBottom: 10
  },
})