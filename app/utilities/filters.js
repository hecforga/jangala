const filtersInitialState = {
  shops: [],
  categories: [],
};

export const getFiltersInitialState = (whichFilters) => {
  return Object.assign({}, ...whichFilters.map(filterName => ({[filterName]: filtersInitialState[filterName]}))); // like lodash _.pick
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