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

  return (
    <Layout style={styles.header}>
      <Logo />
      <Layout style={{ flexDirection: 'row' }}>
        {!user && <Button onPress={() => navigation.navigate('SignIn')} size='small'>Sign in</Button>}
        {user && <Text>{user.displayName}</Text>}

        <TouchableOpacity onPress={() => navigation.navigate('DrawerMenu')}>
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