import React from 'react';
import { ImageBackground, StyleSheet } from 'react-native';
import { Divider, Drawer, DrawerItem, Icon } from '@ui-kitten/components';

const PersonIcon = (props) => (
  <Icon {...props} name='person-outline' />
);

const BellIcon = (props) => (
  <Icon {...props} name='bell-outline' />
);

const ForwardIcon = (props) => (
  <Icon {...props} name='arrow-ios-forward' />
);

const Header = (props) => (
  <React.Fragment>
    <ImageBackground
      style={[styles.header]}
      source={require('../img/avatars/2.png')}
    />
    <Divider />
  </React.Fragment>
);

export const DrawerMenu = () => {

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <Drawer
      header={Header}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <DrawerItem
        title='Users'
        accessoryLeft={PersonIcon}
        accessoryRight={ForwardIcon}
      />
      <DrawerItem
        title='Orders'
        accessoryLeft={BellIcon}
        accessoryRight={ForwardIcon}
      />
    </Drawer>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 128,
    flexDirection: 'row',
    alignItems: 'center',
  },
});