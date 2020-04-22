import React from 'react';
import { StyleSheet } from 'react-native';
import PlacesInput from 'react-native-places-input';

export const LocationAutocomplete = (props) => {
  const api = 'AIzaSyAjVnLnOUWwdAyT6tebbdVPemKtYDl7btI'

  const onSelectLocation = (place) => {
    props.onSelectLocation(place)
  }
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
      placeHolder={'Look for a place'}
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