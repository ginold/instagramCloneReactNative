import React, { Component } from 'react';
import { Layout, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import Logo from './logo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import SettingsService from '../services/settingsService'
import { useNavigation } from '@react-navigation/native';

export const Header = (props) => {
  const navigation = useNavigation()

  const _navigateChat = () => {
    navigation.navigate('Chat');
  };

  const _changeTheme = () => {
    SettingsService.changeTheme(!props.settings.darkTheme)
  }
  const size = 32

  let darkTheme = !props.settings.darkTheme
  return (
    <Layout style={styles.header}>
      <Logo />
      <Layout style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={_navigateChat}>
          <Icon name={'message-square-outline'} width={size} height={size} fill='gray' />
        </TouchableOpacity>
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
  return { settings: state.settings }
}
export default connect(mapStateToProps)(Header);