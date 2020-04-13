import React from 'react';
import { StyleSheet } from 'react-native';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const getIcon = (route) => (style) => {
  let name = ''
  switch (route) {
    case 'Chat':
      name = 'message-square-outline'
      break;
    case 'Main':
      name = 'home-outline'
      break;
    case 'Add':
      name = 'plus-outline'
      break;
    default:
      name = 'home-outline'
  }
  return <Icon {...style} name={name} />
}

export const TabNavigation = (props) => {
  const { navigation, state } = props
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={onSelect}>
      {state.routes.map((route, i) => {
        return <BottomNavigationTab
          key={`navigation${i}`}
          style={styles.tab}
          icon={getIcon(state.routeNames[i])}
        />
      })}
    </BottomNavigation>
  );
}


const styles = StyleSheet.create({
});
