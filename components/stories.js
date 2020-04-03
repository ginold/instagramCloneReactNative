
import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, Image } from 'react-native';
import { Button, Divider, Layout, ListItem, List, Avatar } from '@ui-kitten/components';
import Story from './story'


export default class Stories extends Component {
  state = { text: 'yeah bitch!', stories: [1, 2, 3, 1, 2, 3, 1, 2, 3] }
  data = new Array(8).fill({
    title: 'Item',
    description: 'Context API udostępnia funkcje React.createContext, która tworzy obiekt z dwoma komponentami: obiekt.Provider oraz obiekt.Consumer. Przykładem niech będzie przypadek, gdy musimy dodać internacjonalizacje do'
  });
  renderItem = ({ item, index }) => (
    <ListItem key={`story-${index}`} >
      <Story />
    </ListItem>
  );
  render() {
    return (
      <Layout>
        <List contentContainerStyle={styles.container} horizontal={true} data={this.data} renderItem={this.renderItem}></List >
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    padding: 10, flexGrow: 1
  },
  story: {
    flex: 1
  }
});