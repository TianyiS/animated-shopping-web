// feature 1
import React from 'react';
import Products from './components/products';
import Filter from './components/filter';
import Cart from './components/cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
    }
  }

  addToCart = (product) => {
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach(item => {
      if (item._id === product._id) {
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart) {
      cartItems.push({...product, count: 1})
    }
    this.setState({cartItems: cartItems});
    // use local storage to make cartItems persistent.
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

    removeFromCart = (product) => {
      const cartItems = this.state.cartItems.slice();
      this.setState({cartItems: cartItems.filter((item) => item._id !== product._id)})
      // use local storage to update cartItems for checkout
      localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((item) => item._id !== product._id)));
    }

    createOrder = (order) => {
      alert("Need to save order for " + order.name)
    }

  render () {
    return (
      <Provider store={store}>
      <div className="grid-container">
        <header>
          <a href='/'>Awesome Shopping Web</a>
        </header>
        <main>
          <div className='content'>
            <div className='main'>
              <Filter />
              <Products addToCart={this.addToCart}>  </Products>
            </div>
            <div className='sidebar'> 
              <Cart 
                cartItems={this.state.cartItems} 
                removeFromCart={this.removeFromCart} 
                createOrder={this.createOrder}>
              </Cart> 
            </div>
          </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
      </Provider>
    );
  }
}

export default App;
