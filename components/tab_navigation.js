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
  return <Icon style={{ ...style, padding: 0 }} name={name} />
}
export const TabNavigation = ({ navigation, state }) => {
  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={onSelect}>

      {state.routes.map((route, i) => {
        return <BottomNavigationTab
          style={styles.tab}
          icon={getIcon(state.routeNames[i])}
        />
      })}

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
// return (
//   <BottomNavigation
//     onSelect={onSelect}
//     selectedIndex={topSelectedIndex}
//     style={{ flexDirection: 'row' }}>

//  { state.routes.map((route, index) => {
//     const { options } = descriptors[route.key];
//     const label =
//       options.tabBarLabel !== undefined
//         ? options.tabBarLabel
//         : options.title !== undefined
//           ? options.title
//           : route.name;

//     const isFocused = state.index === index;

//     const onPress = () => {
//       const event = navigation.emit({
//         type: 'tabPress',
//         target: route.key,
//         canPreventDefault: true,
//       });

//       if (!isFocused && !event.defaultPrevented) {
//         navigation.navigate(route.name);
//       }
//     };

//     const onLongPress = () => {
//       navigation.emit({
//         type: 'tabLongPress',
//         target: route.key,
//       });
//     };

//     return (
//       )

//       </BottomNavigation>


//const [topSelectedIndex, setTopSelectedIndex] = React.useState(0);


// return <Icon style={{ ...style, padding: 0 }} name={name} />


// <BottomNavigationTab
//   style={styles.tab}
//   icon={getIcon('home')}
// />
// <BottomNavigationTab
//   style={styles.tab}
//   icon={getIcon('add')}
// />
// <BottomNavigationTab
//   style={styles.tab}
//   icon={getIcon('chat')}
// />

//       );
// }

