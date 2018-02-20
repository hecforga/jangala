const filtersInitialState = {
  price: {
    min: null,
    max: null,
  },
  shops: [],
  categories: [],
};

export const getDefaultFilters = (whichFilters) => {
  // like lodash _.pick
  return Object.assign({}, ...whichFilters.map(filterName => ({
    [filterName]: filtersInitialState[filterName]
  })));
};

export const areFiltersCleared = (filters) => {
  if (filters.price && filters.price.min !== null) {
    return false;
  }
  if (filters.price && filters.price.max !== null) {
    return false;
  }
  if (filters.shops && filters.shops.length > 0) {
    return false;
  }
  if (filters.categories && filters.categories.length > 0) {
    return false;
  }

  return true;
};

export const computeProductsWhere = (filters) => {
  let productsWhere = {
    variants_some: {
      availableForSale: true,
    },
  };

  if (filters.price && filters.price.min) {
    productsWhere['price_gte'] = parseFloat(filters.price.min);
  }
  if (filters.price && filters.price.max) {
    productsWhere['price_lte'] = parseFloat(filters.price.max);
  }
  if (filters.shops && filters.shops.length) {
    productsWhere['shop'] = { name_in: filters.shops };
  }
  if (filters.categories && filters.categories.length) {
    productsWhere['category'] = { name_in: filters.categories };
  }

  return productsWhere;
};