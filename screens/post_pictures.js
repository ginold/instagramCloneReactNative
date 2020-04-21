
import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { ViewPager, Text, Layout } from '@ui-kitten/components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBackNavigation } from '../components/top_back_navigation';

export const PostPictures = (props) => {
  const indexClicked = props.route.params.index
  const [selectedIndex, setSelectedIndex] = React.useState(indexClicked);
  const pictures = props.route.params.pictures

  console.log(selectedIndex)
  return (
    <SafeAreaView style={{ height: '100%', backgroundColor: 'black' }}>
      <TopBackNavigation navigation={props.navigation} />

      <ViewPager
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        {pictures.map(pic => {
          return <Image
            key={pic}
            source={{ uri: pic, height: '100%', width: '100%' }}
            resizeMode="contain"
          />
        })
        }
      </ViewPager>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
});


