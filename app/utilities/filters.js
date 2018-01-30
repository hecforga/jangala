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
  let cleared = true;

  if (filters.shops) {
    cleared = filters.shops.length === 0;
  }
  if (filters.categories) {
    cleared = filters.categories.length === 0;
  }

  return cleared;
};

export const computeProductsWhere = (filters) => {
  let productsWhere = {};

  if (filters.price && filters.price.min) {
    productsWhere['price_gte'] = parseFloat(filters.price.min);
  }
  if (filters.price && filters.price.max) {
    productsWhere['price_lte'] = parseFloat(filters.price.max);
  }
  if (filters.shops.length) {
    productsWhere['shop'] = { name_in: filters.shops };
  }

  return productsWhere;
};