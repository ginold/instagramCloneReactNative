import MapView, { Marker, AnimatedRegion } from 'react-native-maps';
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TopBackNavigation } from '../components/top_back_navigation'

export const MapViewer = ({ route, navigation, from }) => {

  const screen = Dimensions.get('window');
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.0922;
  const coordinate = {
    latitude: route.params.location.coordinates.lat,
    longitude: route.params.location.coordinates.lng,
  }
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  console.log(coordinate)
  return (
    <SafeAreaView>
      <TopBackNavigation navigation={navigation} from={'post details'} />
      <MapView style={styles.mapStyle}
        initialRegion={{
          ...coordinate,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}>
        <Marker coordinate={coordinate} />
      </MapView>
    </SafeAreaView>
  )

}
const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

