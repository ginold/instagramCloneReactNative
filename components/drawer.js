
import React from 'react';
import {
  Drawer,
  Icon, Text,
  Layout
} from '@ui-kitten/components';
import { StyleSheet } from 'react-native'
import AuthApi from '../api/auth_api';
import { useNavigation } from '@react-navigation/native';
import SettingsService from '../services/settingsService'
import { connect } from 'react-redux'
import Story from './story'
import { SafeAreaView } from 'react-native-safe-area-context';

const DrawerMenu = (props) => {
  const navigation = useNavigation()
  const darkThemeOff = !props.settings.darkTheme
  const user = props.user

  const PersonIcon = (style) => (
    <Icon {...style} name='person-outline' />
  );
  const LogoutIcon = (style) => (
    <Icon {...style} name='log-out-outline' />
  );
  const MoonIcon = (style) => (
    <Icon {...style} name={darkThemeOff ? 'moon-outline' : 'moon'} />
  );
  const CloseIcon = (style) => (
    <Icon {...style} name={'close-circle-outline'} />
  );

  const drawerData = [
    {
      title: 'My account',
      icon: PersonIcon,
    },
    {
      title: 'Log out',
      icon: LogoutIcon,
    },
    {
      title: darkThemeOff ? 'Dark mode on' : 'Dark mode off',
      icon: MoonIcon,
    },
    {
      title: 'Close',
      icon: CloseIcon,
    },
  ];

  const _changeTheme = () => {
    SettingsService.changeTheme(!props.settings.darkTheme)
  }

  const onRouteSelect = (index, e) => {
    const route = drawerData[index];
    switch (index) {
      case 0:
        break
      case 1:
        AuthApi.signOut()
        navigation.goBack()
        navigation.navigate('SignIn')
        break
      case 2:
        _changeTheme()
        break
      case 3:
        navigation.goBack()
        break
      default:
        break
    }
  };
  console.log(user.photoURL)
  return (
    <SafeAreaView style={{
      height: '100%'
    }}>
      <Layout style={styles.header}>
        <Story avatar={user.photoURL} uid={user.uid} />
        <Text style={{ marginLeft: 20, fontWeight: 'bold' }}>{user.displayName}</Text>
      </Layout>
      <Drawer
        data={drawerData}
        onSelect={onRouteSelect} />
    </SafeAreaView>
  );
};
const mapStateToProps = state => {
  return {
    settings: state.settings,
    user: state.user
  }
}
export default connect(mapStateToProps)(DrawerMenu);

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    paddingHorizontal: 12, flexDirection: 'row',
    borderBottomColor: '#c5c5c5',
    borderBottomWidth: 1,
    alignItems: 'center'
  },
})

