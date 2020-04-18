import React from 'react';
import { Layout, Icon, Button, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import Logo from './logo'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';

const Header = (props) => {
  const size = 32
  const navigation = useNavigation()
  const user = props.user

  const openCamera = () => {
    navigation.navigate('CameraView')
  }

  return (
    <Layout style={styles.header}>
      <TouchableOpacity onPress={openCamera}>
        <Icon width={size} height={size} name='camera-outline' fill='gray' />
      </TouchableOpacity>
      <Logo />
      <Layout style={{ flexDirection: 'row' }}>
        {!user && <Button onPress={() => navigation.navigate('SignIn')} size='small'>Sign in</Button>}

        <TouchableOpacity style={{ alignItems: 'center', flexDirection: 'row' }} onPress={() => navigation.navigate('DrawerMenu')}>
          <Text style={{ marginRight: 10 }}>{user.displayName}</Text>
          <Icon name={'menu-outline'} width={size} height={size} fill='gray' />
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