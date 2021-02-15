import React, { Component } from "react";
import { connect } from "react-redux";
import { searchProduct } from "../actions/productActions";
// import _ from "lodash";

class SearchBar extends Component {
  handleChange = (e) => {
    this.props.searchProduct(this.props.products, e.target.value);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.props.searchTerm}
          onChange={this.handleChange}
        ></input>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    searchTerm: state.products.searchTerm,
    products: state.products.items,
  }),
  { searchProduct }
)(SearchBar);
