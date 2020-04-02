import React, { useRef } from 'react';
import { Text, Layout, Input, Button } from '@ui-kitten/components';
import { StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import Auth from '../api/auth_api';
import { SafeAreaView } from 'react-native-safe-area-context';

export const CreateAccountScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false)
  const scrollRef = useRef(null)
  const [values, setValues] = React.useState({
    password: '', name: '', email: '', avatar: 'avatar'
  });

  React.useEffect(() => {
    console.log(scrollRef);
  }, [scrollRef]);

  const handleChange = (name, value) => {
    setValues({ ...values, [name]: value });
  };
  const createAccount = () => {
    setLoading(true)
    console.log(scrollRef)
    //  scrollRef.scrollTo({ x: Dimensions.get('window').width, y: 0, animated: true })
    Auth.createUser(values).then(() => {
      navigation.navigate('Home')
    })
  }
  return (
    <SafeAreaView
      ref={el => scrollRef = el}
      style={{
        flex: 1, justifyContent: 'center', alignItems: 'center'
      }}>
      <Layout style={{ width: '80%' }}>
        <Text style={{ marginBottom: 20 }} category='h1'>Create an account</Text>
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
        <Button style={styles.createButton} onPress={createAccount}>Create!</Button>
      </Layout>
      <ActivityIndicator style={styles.loading} size="large" color="#0000ff" />
    </SafeAreaView >
  );
};
let styles = StyleSheet.create({
  createButton: {
    marginTop: 20
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})