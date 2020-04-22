import React from 'react';
import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import configureStore from './configureStore'
import { Provider } from 'react-redux';
import AppProvider from './ApplicationProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { YellowBox } from "react-native";

console.ignoredYellowBox = ['Setting a timer:'];
YellowBox.ignoreWarnings(["Setting a timer"]);
// console.warn = message => {
//   if (message.indexOf('Setting a timer') <= -1) {
//     console.warn(message);
//   }
// };

export const myStore = configureStore()

const App = () => (
  <React.Fragment>
    <IconRegistry icons={EvaIconsPack} />
    <SafeAreaProvider>
      <Provider store={myStore}>
        <AppProvider />
      </Provider>
    </SafeAreaProvider>
  </React.Fragment>
);

export default App;
