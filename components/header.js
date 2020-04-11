import React, { Component } from 'react';
import { Layout, Icon, Button, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import Logo from './logo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import SettingsService from '../services/settingsService'
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
  const size = 32
  const navigation = useNavigation()
  const _changeTheme = () => {
    SettingsService.changeTheme(!props.settings.darkTheme)
  }

  let darkTheme = !props.settings.darkTheme
  const user = props.user
  console.log(props)
  return (
    <Layout style={styles.header}>
      <Logo />
      <Layout style={{ flexDirection: 'row' }}>
        {!user && <Button onPress={() => navigation.navigate('SignIn')} size='small'>Sign in</Button>}
        {user && <Text>Welcome {user.displayName}</Text>}
        <TouchableOpacity style={{ marginLeft: 11 }} onPress={_changeTheme}>
          <Icon name={darkTheme ? 'moon-outline' : 'moon'} width={size} height={size} fill='gray' />
        </TouchableOpacity>
      </Layout>
    </Layout>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingRight: 10,
    paddingLeft: 10
  }
})

const mapStateToProps = state => {
  return {
    settings: state.settings,
    user: state.user
  }
}
export default connect(mapStateToProps)(Header);