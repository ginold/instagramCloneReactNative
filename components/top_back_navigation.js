
import React from 'react';
import { Input, Icon, Layout, Text, TopNavigation, TopNavigationAction } from '@ui-kitten/components';


export const TopBackNavigation = ({ navigation, route, from }) => {
  console.log(route)
  const onBackPress = () => {
    navigation.goBack();
  };
  const BackIcon = (style) => {
    return <Icon {...style} name='arrow-back' />
  }

  const BackAction = (props) => {
    return <TopNavigationAction {...props} icon={BackIcon} />
  }
  const renderLeftControl = () => (
    <BackAction onPress={onBackPress} />
  );
  return (
    <TopNavigation title={`Back ${from ? 'to ' + from : ''}`} leftControl={renderLeftControl()} />
  )
}