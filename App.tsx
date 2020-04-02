import React, { Component } from 'react';
import { IconRegistry } from '@ui-kitten/components';
import { mapping, light as lightTheme, dark as darkTheme } from '@eva-design/eva';
import { default as appTheme } from './custom-theme.json';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import configureStore from './configureStore'
import { Provider } from 'react-redux';
import AppProvider from './ApplicationProvider'
import { SafeAreaProvider } from 'react-native-safe-area-context';

const theme = { ...lightTheme, ...appTheme };
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
