import Carousel, { Pagination } from 'react-native-snap-carousel';
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Text, StatusBar, SafeAreaView } from 'react-native';
import SliderEntry from './SliderEntry'
import { Layout } from '@ui-kitten/components';
import { connect } from 'react-redux'
import { slideWidth } from '../styles/sliderEntry.styles'

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
const viewportWidth = Dimensions.get('window').width;
const feedSliderWidth = viewportWidth - (40 + 20) - 30 // padding + margin

class SliderPostPhotos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderActiveSlide: 1, sliderWidth: 100, itemWidth: 100
    };
  }

  _renderItemWithParallax({ item, index, screen }, parallaxProps) {
    return (
      <SliderEntry
        screen={this.props.screen}
        data={item}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }
  _getSliderWidth() {
    const viewportWidth = Dimensions.get('window').width;
    if (this.props.screen === 'feed') {
      return feedSliderWidth
    } else {
      return viewportWidth
    }
  }
  _getSliderContentContainer() {
    return {
      paddingLeft: this.props.screen === 'feed' ? feedSliderWidth * .05 : 0
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
          renderItem={this._renderItemWithParallax.bind(this)}
          sliderWidth={this._getSliderWidth()}
          itemWidth={this._getSliderWidth()}
          hasParallaxImages={true}
          inactiveSlideScale={0.94}
          useScrollView={true}
          inactiveSlideOpacity={0.9}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={this._getSliderContentContainer(this.state.screen)}
          onSnapToItem={(index) => this.setState({ sliderActiveSlide: index })}
        />
        <Pagination
          dotsLength={photos.length}
          activeDotIndex={sliderActiveSlide}
          containerStyle={styles.paginationContainer}
          dotColor={this.props.settings.darkTheme ? 'white' : 'black'}
          dotStyle={styles.paginationDot}
          inactiveDotColor={'#1a1917'}
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

export default connect(mapStateToProps)(SliderPostPhotos)

const styles = StyleSheet.create({
  slider: {
    overflow: 'visible' // for custom animations
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
});