// import {
//   Button, Text, Layout, Icon
// } from '@ui-kitten/components';
// import { useNavigation } from '@react-navigation/native';
// import React from 'react';
// import { StyleSheet } from 'react-native';
// import PostActions from './post_actions';
// import SliderPostPhotos from './slider_post_photos'
// import Story from './story'
// import moment from "moment";

// export const CardItem = (props) => {
//   const { pictures, description, author, createdAt } = props.item
//   const navigation = useNavigation()

//   const navigateDetails = () => {
//     navigation.navigate('Details', { post: props.item });
//   };
//   return (
//     <Layout style={styles.card}>
//       <Layout style={styles.header}>
//         <Story onPress={() => console.log('qwe')} />
//         <Text style={styles.author}>{author.displayName}</Text>
//         <Text style={styles.date}>{moment(createdAt).fromNow()}</Text>
//       </Layout>
//       {/* <Carousel screen='feed' /> */}
//       <SliderPostPhotos screen='feed' pictures={pictures} />

//       <Text>{description}</Text>
//       <PostActions post={props.item} />
//       <Button onPress={navigateDetails}>View more</Button>
//     </Layout>
//   )
// }

// const styles = StyleSheet.create({
//   date: {
//     position: 'absolute',
//     right: 0
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     marginBottom: 10
//   },
//   author: {
//     marginLeft: 10,
//     fontWeight: 'bold'
//   },
//   card: {
//     flex: 1,
//   }
// });

import {
  Button, Text, Layout, Icon
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import PostActions from './post_actions';
import SliderPostPhotos from './slider_post_photos'
import Story from './story'
import moment from "moment";

export const CardItem = (props) => {

  const [post, setPost] = React.useState(props.item)
  const navigation = useNavigation()
  const navigateDetails = () => {
    navigation.navigate('Details', { post });
  };
  React.useEffect(() => {
    setPost(props.item)
  }, [props.item])

  return (
    <Layout style={styles.card}>
      <Layout style={styles.header}>
        <Story onPress={() => console.log('qwe')} />
        <Text style={styles.author}>{post.author.displayName}</Text>
        <Text style={styles.date}>{moment(post.createdAt).fromNow()}</Text>
      </Layout>
      <SliderPostPhotos screen='feed' pictures={post.pictures} />
      <Text>{post.description}</Text>
      {/* NEEED TO ADD A KEY IN ORDER TO RERENDER!@!!!! */}
      <PostActions key={post.id} post={post} />
      <Button onPress={navigateDetails}>View more</Button>
    </Layout>
  )
}

const styles = StyleSheet.create({
  date: {
    position: 'absolute',
    right: 0
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  author: {
    marginLeft: 10,
    fontWeight: 'bold'
  },
  card: {
    flex: 1,
  }
});
