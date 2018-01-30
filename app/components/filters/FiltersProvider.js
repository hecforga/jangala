import React, { Component } from 'react';

import { getDefaultFilters } from '../../utilities/filters.js';

class FiltersProvider extends Component {
  constructor(props) {
    super(props);
    // We assume whichFilters is passed when copyFiltersFrom is not passed
    if (props.copyFiltersFrom) {
      this.state = { filters: JSON.parse(JSON.stringify(props.copyFiltersFrom)) };
    } else {
      this.state = { filters: getDefaultFilters(props.whichFilters) };
    }
  }

  render() {
    return React.cloneElement(this.props.children, {
      filters: this.state.filters,
      setFilters: this.setFilters,
    });
  }

  setFilters = (newFilters) => {
    this.setState({ filters: newFilters });
  }
}

export default FiltersProvider;