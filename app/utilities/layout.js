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