import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const scale = size => width / guidelineBaseWidth * size;
export const verticalScale = size => height / guidelineBaseHeight * size;
export const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;

export const computeListItemHeight = (containerHeight, containerTopPadding, desiredItemHeight, itemMargin) => {
  const heightMinusPadding = containerHeight - containerTopPadding;
  const desiredItemHeightPlusMargin = desiredItemHeight + itemMargin;
  let numberOfVisibleItems = heightMinusPadding / desiredItemHeightPlusMargin;
  const integerPart = Math.floor(numberOfVisibleItems);
  const decimalPart = numberOfVisibleItems - integerPart;
  if (decimalPart >= 0.8) {
    numberOfVisibleItems = integerPart + 1.3;
  } else {
    numberOfVisibleItems = integerPart + 0.3;
  }
  return Math.floor(heightMinusPadding / numberOfVisibleItems) - itemMargin;
};