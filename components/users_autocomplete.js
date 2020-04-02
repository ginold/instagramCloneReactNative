
import {
  Button, Text, Layout, Icon, Autocomplete
} from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Story from './story'
import Auth from '../api/auth_api'

const CloseIcon = (style) => (
  <Icon {...style} name='close' />
);

export const UsersAutocomplete = (props) => {


  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState([]);
  const [dataCopy, setDataCopy] = React.useState([]);


  React.useEffect(() => {
    Auth.getUsers().then(users => {
      setData(users)
      setDataCopy(users)
      console.log(users)
    })
  }, [])

  const onSelect = ({ title }) => {
    setValue(title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(data.filter(item => item.displayName.toLowerCase().includes(query.toLowerCase())));
  };

  const clearInput = () => {
    setValue('');
    setData(dataCopy);
  };

  return (
    <Layout style={styles.container}>
      <Autocomplete
        placeholder='Place your Text'
        value={value}
        data={data}
        icon={CloseIcon}
        onIconPress={clearInput}
        onChangeText={onChangeText}
        onSelect={onSelect}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 228,
  },
});