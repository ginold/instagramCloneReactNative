import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  Dimensions
} from 'react-native';
import Logo from '../components/logo'
import Auth from '../api/auth_api'
import { Button, Input, Layout, Icon, Avatar } from '@ui-kitten/components';
import { LoadingIndicator } from '../components/loading_indicator';

export class SignInScreen extends Component {

  constructor(props) {
    super(props)
    this._width = Dimensions.get('window').width;
    this.state = {
      email: '', password: '', error: false, loading: false
    }
    this.scrollViewRef = null
    this.handleChange = this.handleChange.bind(this)
    this.signIn = this.signIn.bind(this)
    this.navigateCreateAccount = this.navigateCreateAccount.bind(this)
    this.slide = this.slide.bind(this)
  }
  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  signIn() {
    this.setState({ error: false, loading: true })
    Auth.signIn(this.state.email.trim(), this.state.password).then(() => {
      this.props.navigation.navigate('MainApp')
    }).catch(err => {
      this.slide(this._width)
      this.setState({ error: true })
    })
  }
  navigateCreateAccount() {
    this.props.navigation.navigate('CreateAccount')
  }
  getStepStyle() {
    return { width: this._width, justifyContent: 'center', flexGrow: 1, paddingHorizontal: 20 }
  }
  BackIcon = (style) => (
    <Icon {...style} name='arrow-back-outline' />
  );
  slide(position) {
    this.scrollViewRef.scrollTo({ x: position, y: 0, animated: true })
  }

  render() {
    return (
      <ScrollView
        ref={component => this.scrollViewRef = component}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        horizontal
        keyboardShouldPersistTaps='handled'
        scrollEnabled={false}>

        <Layout style={this.getStepStyle()}>
          <Layout style={styles.logo}><Logo /></Layout>
          <Layout style={styles.container}>
            <Layout style={styles.header}>
              <Text style={styles.label}>Sign in into your account</Text>
            </Layout>
            <Layout style={styles.content}>
              <Input
                label={'Enter your email'}
                secureTextEntry={false}
                value={this.state.email}
                onChangeText={(val) => this.handleChange('email', val)}
                labelStyle={styles.inputLabel}
                containerStyle={styles.inputContainer}
                style={styles.input}
                placeholderTextColor={'gray'} />
            </Layout>
            <Layout style={styles.footer}>
              <Button style={styles.nextBtn} onPress={() => this.slide(this._width)}>NEXT</Button>
              <Button onPress={this.navigateCreateAccount} style={styles.signUpText}>or create new account</Button>
            </Layout>
          </Layout>
        </Layout>

        <Layout style={this.getStepStyle()}>
          <Layout style={styles.container}>
            <Layout style={styles.header}>
              <Text style={styles.label}>Welcome</Text>
            </Layout>
            <Layout style={styles.content}>
              <Input
                label={'Enter your password'}
                secureTextEntry={true}
                value={this.state.password}
                onChangeText={(val) => this.handleChange('password', val)}
                labelStyle={styles.inputLabel}
                containerStyle={styles.inputContainer}
                style={styles.input}
                placeholderTextColor={'gray'} />
            </Layout>
            <Layout style={styles.footer}>
              <Layout style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  icon={this.BackIcon}
                  onPress={() => this.slide(0)}
                  innerStyle={{ color: 'white', fontSize: 26 }}>
                </Button>
                <Button onPress={() => { this.signIn() }}>Log in</Button>
              </Layout>
            </Layout>
            {(this.state.loading && !this.state.error) && <LoadingIndicator />}
            {this.state.error && <Text style={{ textAlign: 'center' }}>Login error</Text>}

          </Layout>
        </Layout>

      </ScrollView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  nextBtn: {
    width: '50%',
  },

  logo: {
    width: '100%',
    alignItems: 'center'
  },
  header: {
    alignItems: 'flex-start',
    paddingRight: 15,
    paddingTop: 5,
    paddingLeft: 0,
  },
  content: {
    paddingTop: 15
  },
  footer: {
    marginTop: 20,
    alignItems: 'flex-end'
  },
  label: {
    alignSelf: 'flex-start',
    color: 'gray',
    fontSize: 20,
  },
  signUpText: {
    marginTop: 100,
    color: 'gray',
    width: '100%',
    textAlign: 'center'
  },
  inputContainer: {
    borderBottomColor: 'red',
    borderBottomWidth: 1.5
  },
  inputLabel: {
    paddingBottom: 25
  },
  input: {
    fontSize: 20
  },
});