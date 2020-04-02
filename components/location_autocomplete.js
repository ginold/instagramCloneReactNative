/**
 * IMPORTANT: To use Icon component make sure to follow this guide:
 * https://akveo.github.io/react-native-ui-kitten/docs/guides/icon-packages
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Autocomplete,
  Icon,
  Layout,
  List,
} from '@ui-kitten/components';
import PlacesInput from 'react-native-places-input';

const CloseIcon = (style) => (
  <Icon {...style} name='close' />
);


export const LocationAutocomplete = (props) => {
  const [location, setLocation] = React.useState({})
  const [placeholder, setPlaceholder] = React.useState('"Some Place holder"')
  const api = 'AIzaSyAjVnLnOUWwdAyT6tebbdVPemKtYDl7btI'
  var proxy_url = 'https://cors-anywhere.herokuapp.com/';

  const onSelectLocation = (place) => {
    console.log(place)
    setLocation(place)
    props.onSelectLocation(place)
  }

  const [value, setValue] = React.useState(null);

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = (query) => {
    fetch('https://json.geoiplookup.io/api?callback=?')
    // fetch(proxy_url + )
    setValue(query);
    setData(DATA.filter(item => item.title.toLowerCase().includes(query.toLowerCase())));
  };
  return (
    // <Autocomplete
    //   placeholder='Place your Text'
    //   value={value}
    //   data={[]}
    //   icon={CloseIcon}
    //   onChangeText={onChangeText}
    //   onSelect={onSelect}
    // />
    <PlacesInput
      googleApiKey={api}
      placeHolder={placeholder}
      language={"en-US"}
      onSelect={place => onSelectLocation(place)}
      stylesContainer={{
        position: 'relative',
        alignSelf: 'stretch',
        margin: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        shadowOpacity: 0,
        borderColor: '#dedede',
        borderWidth: 1,
        marginBottom: 10
      }}
      stylesList={{
        borderColor: '#dedede',
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
        left: -1,
        right: -1
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 228,
  },
});