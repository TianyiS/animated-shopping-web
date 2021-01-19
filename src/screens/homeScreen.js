import React from 'react';
import Products from '../components/products';
import Filter from '../components/filter';
import Cart from '../components/cart';

export default class HomeScreen extends React.Component {
    render() {
      return (
        <div>
          <div className="content">
            <div className="main">
              <Filter></Filter>
              <Products></Products>
            </div>
            <div className="sidebar">
              <Cart></Cart>
            </div>
          </div>
        </div>
      );
    }
  }