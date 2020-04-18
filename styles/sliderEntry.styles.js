import { StyleSheet, Dimensions, Platform } from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export const slideHeight = viewportHeight * 0.4;
const itemHorizontalMargin = 5;
const entryBorderRadius = 8;

export const getSliderContainerWidth = (screen) => {
  if (screen === 'feed') {
    return {
      width: viewportWidth - (40 + 20) - 30, // margin + padding,
      height: slideHeight,
      paddingHorizontal: itemHorizontalMargin
    }
  } else if (screen === 'details') {
    return {
      width: viewportWidth,
      height: slideHeight,
      paddingHorizontal: 0
    }
  }
}
export const getShadowStyle = (screen) => {
  let defaultStyles = {
    position: 'absolute',
    top: 0,
    shadowOpacity: 0.25,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15,
    elevation: 13, // for android
    // background color must be set
    backgroundColor: "black",
    borderRadius: entryBorderRadius,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 5
  }
  let screenStyles = {}

  if (screen === 'details') {
    screenStyles = {
      left: 0,
      right: 0,
      bottom: 0,
      shadowOpacity: 0
    }
  }
  return Object.assign(defaultStyles, screenStyles)
}

export default StyleSheet.create({
  imageContainer: {
    flex: 1,
    height: slideHeight * .8,
    marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: IS_IOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  subtitle: {
    marginTop: 6,
    fontSize: 12,
    fontStyle: 'italic'
  },
});