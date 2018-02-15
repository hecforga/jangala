export const getPriceLabel = (price) => price.toFixed(2) + ' €';

export const hasUniqueSize = (product) => {
  // We assume all products have a "size" option with at least 1 value
  const sizeOption = product.options.find((option) => option.name === 'size');
  return sizeOption.values.length === 1;
};

export const getDefaultSize = (product) => {
  // We assume all products have a "size" option with at least 1 value
  const sizeOption = product.options.find((option) => option.name === 'size');
  return sizeOption.values.length > 1 ? undefined : sizeOption.values.length[0];
};

export const generateDataForSizeModalPicker = (productVariants) => {
  const data = [];
  productVariants.forEach((variant) => {
    // We assume all products have a "size" option with at least 1 value
    const sizeOption = variant.selectedOptions.find((option) => option.name === 'size');
    const variantData = { value: sizeOption.value, label: getSizeLabel(sizeOption.value) };
    if (!variant.availableForSale) {
      variantData['label'] += ' - No disponible';
      variantData['disabled'] = true;
    }
    data.push(variantData);
  });
  return data;
};

export const computeCompatibleVariants = (product, selectedOptions, omittedOptions) => {
  const selectedOptionsWithoutOmitted = selectedOptions.filter((option) => omittedOptions.indexOf(option.name) < 0);
  const productVariants = product.variants;
  const compatibleVariants = [];
  productVariants.forEach((variant) => {
    const variantSelectedOptions = variant.selectedOptions;
    const isVariantCompatible = selectedOptionsWithoutOmitted.every((selectedOption) => {
      if (!selectedOption.value) {
        return true;
      }
      const variantSelectedOption = variantSelectedOptions.find((option) => option.name === selectedOption.name);
      return selectedOption.value === variantSelectedOption.value;
    });
    if (isVariantCompatible) {
      compatibleVariants.push(variant);
    }
  });
  return compatibleVariants;
};

export const getSizeLabel = (selectedSize) => selectedSize ? selectedSize.toUpperCase() : 'TALLA';