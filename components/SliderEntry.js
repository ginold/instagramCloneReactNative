import React, { Component } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { ParallaxImage } from 'react-native-snap-carousel';
import styles, { getSliderContainerWidth, getShadowStyle, getTextContainerStyle } from '../styles/sliderEntry.styles';
import { Layout, Text } from '@ui-kitten/components';

export default class SliderEntry extends Component {

  get image() {
    const { data: { illustration }, parallaxProps } = this.props;

    return (
      <ParallaxImage
        source={{ uri: illustration }}
        containerStyle={styles.imageContainer}
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={'rgba(155, 125, 55, 0.8)'}
        {...parallaxProps}
      />
    )
  }

  goToPostPicturesView() {
    this.props.navigation.navigate('PostPictures', { pictures: this.props.pictures, index: this.props.index })
  }

  render() {
    const { data: { title, subtitle }, screen } = this.props;

    const uppercaseTitle = title ? (
      <Text style={styles.title} numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : false;

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={getSliderContainerWidth(screen)}
        onPress={() => this.goToPostPicturesView()}
      >
        <Layout style={getShadowStyle(screen)} >
          <View style={[styles.imageContainer]}>
            {this.image}
            <View style={[styles.radiusMask]} />
          </View>
        </Layout>
      </TouchableOpacity>
    );
  }
}