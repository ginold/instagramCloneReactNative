import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';


export const TabNavigation = ({ state, descriptors, navigation }) => {
  const [topSelectedIndex, setTopSelectedIndex] = React.useState(0);

  const routes = ['Home', 'Add', 'Chat']
  const onSelect = (index) => {
    navigation.navigate(routes[index]);
    setTopSelectedIndex(index)
  };
  const getIcon = (route) => (style) => {
    let name = ''
    switch (route) {
      case 'chat':
        name = 'message-square-outline'
        break;
      case 'home':
        name = 'home-outline'
        break;
      case 'add':
        name = 'plus-outline'
        break;
      default:
        name = 'home-outline'
    }
    return <Icon style={{ ...style, padding: 0 }} name={name} />
  }

  return (
    <BottomNavigation
      onSelect={onSelect}
      selectedIndex={topSelectedIndex}
      style={{ flexDirection: 'row' }}>
      <BottomNavigationTab
        style={styles.tab}
        icon={getIcon('home')}
      />
      <BottomNavigationTab
        style={styles.tab}
        icon={getIcon('add')}
      />
      <BottomNavigationTab
        style={styles.tab}
        icon={getIcon('chat')}
      />
    </BottomNavigation>
  );
}
const styles = StyleSheet.create({
  bottomNavigation: {
    flex: 1,
    height: 20,
    marginVertical: 8,
    borderTopWidth: 1
  },
  tab: {
    flex: 1, padding: 0
  }
});

