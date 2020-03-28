import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, StatusBar, SafeAreaView } from 'react-native';
import SliderEntry from './SliderEntry'
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux'

const photos = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg'
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg'
  },
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration: 'https://i.imgur.com/UYiroysl.jpg'
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration: 'https://i.imgur.com/MABUbpDl.jpg'
  }
]
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const sliderWidth = viewportWidth - (40 + 20) - 30
const itemWidth = sliderWidth

class MyCarousel extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 1
    };
  }

  _renderItemWithParallax({ item, index }, parallaxProps) {
    return (
      <SliderEntry
        screen='feed'
        data={item}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  _getSliderContentContainer() {
    return {
      paddingLeft: this.props.screen === 'details' ? slideWidth * .05 : 0
    }
  }
  render() {
    const { sliderActiveSlide } = this.state;

    return (
      <Layout style={styles.exampleContainer}>
        <Carousel
          ref={component => this._sliderRef = component}
          data={photos}
          firstItem={1}
          renderItem={this._renderItemWithParallax}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          hasParallaxImages={true}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.9}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={this._getSliderContentContainer()}
          onSnapToItem={(index) => this.setState({ sliderActiveSlide: index })}
        />
        <Pagination
          dotsLength={photos.length}
          activeDotIndex={sliderActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={this.props.settings.darkTheme ? 'white' : 'black'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.black}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          carouselRef={this._sliderRef}
          tappableDots={!!this._sliderRef}
        />
      </Layout>
    );
  }
}
const mapStateToProps = state => ({
  settings: state.settings
})

export default connect(mapStateToProps)(MyCarousel)

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const styles = StyleSheet.create({
  slider: {
    flex: 1,
    overflow: 'visible' // for custom animations
  },
  sliderContentContainer: {

  },
  paginationContainer: {
    paddingVertical: 0,
    marginVertical: 10,
    zIndex: 2
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10
  },
  subtitle: {
    marginTop: 5,
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 13,
    fontStyle: 'italic',
    textAlign: 'center'
  },
});