import React, { Component } from 'react';

import { getFiltersInitialState } from '../../utilities/filters.js';

class FiltersProvider extends Component {
  constructor(props) {
    super(props);
    this.state = { appliedFilters: getFiltersInitialState(props.whichFilters) };
  }

  render() {
    return React.cloneElement(this.props.children, {
      appliedFilters: this.state.appliedFilters,
      setAppliedFilters: this.setAppliedFilters,
    });
  }

  setAppliedFilters = (newFilters) => {
    this.setState({ appliedFilters: newFilters });
  }
}

export default FiltersProvider;