import { Text, StyleSheet, RefreshControl } from 'react-native'
import React from 'react';
import {
    List, Layout,
    ListItem, Icon, Button,
    Card
} from '@ui-kitten/components';
import { CardItem } from './cardItem'
import { useNavigation } from '@react-navigation/native';
import { useSafeArea } from 'react-native-safe-area-context';
// import LinearGradient from 'react-native-linear-gradient';
import { getPosts } from '../api/posts'

const Feed = () => {


    const insets = useSafeArea();
    const navigation = useNavigation()
    const data = new Array(6).fill({
        title: 'Item',
        description: 'Context API udostępnia funkcje React.createContext, która tworzy obiekt z dwoma komponentami: obiekt.Provider oraz obiekt.Consumer. Przykładem niech będzie przypadek, gdy musimy dodać internacjonalizacje do'
    });
    const [refreshing, setRefreshing] = React.useState(false);

    getPosts()
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    }, [refreshing]);

    const renderItem = ({ item, index }) => (

        <Layout style={styles.listItem} key={`key-${index}`}>
            {/* causes an error in the console, it's a known bug in ui-kitten */}
            <CardItem item={item} />
        </Layout>
    );
    return (
        <List
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            style={styles.list} data={data} renderItem={renderItem} />
    );
};

// const gradient = () => {
//     return (
//         <LinearGradient
//             colors={['#B721FF', '#21D4FD']}
//             startPoint={{ x: 1, y: 0 }}
//             endPoint={{ x: 0, y: 1 }}
//             style={{
//                 flex: 1,
//                 paddingLeft: 15,
//                 paddingRight: 15,
//                 borderRadius: 5
//             }}
//         />
//     );
// }
const styles = StyleSheet.create({
    listItem: {
        marginVertical: 15,
        marginHorizontal: 10,
        paddingHorizontal: 20,
        paddingVertical: 20,
        overflow: 'hidden',
        borderWidth: .2,
    },
    list: {
    }
});

export default Feed;