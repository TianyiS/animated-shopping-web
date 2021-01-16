// feature 1
import React from 'react';
import data from './data.json';
import Products from './components/products';
import Filter from './components/filter';
import Cart from './components/cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: data.products,
      size: '',
      sort: '',
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
    
  filterProducts = (e) => {
    if (e.target.value === 'ALL') {
      this.setState({
        size: e.target.value,
        products: data.products,
      })
    } else {
      this.setState({
        size: e.target.value,
        products: data.products.filter((product) => product.availableSizes.indexOf(e.target.value) >= 0)
      })
    }
  }

  sortProducts = (e) => {
    if (e.target.value === 'lowest') {
      this.setState({
        sort: e.target.value,
        products: this.state.products.slice().sort((a, b) => a.price - b.price)
      })
    } else if (e.target.value === 'highest') {
      this.setState({
        sort: e.target.value,
        products: this.state.products.slice().sort((a, b) => b.price - a.price)
      })
    } else if (e.target.value === 'latest'){
      this.setState({
        sort: e.target.value,
        products: data.products, 
      })
    }
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
              <Filter count={this.state.products.length} 
                      size={this.state.size}
                      sort={this.state.sort}
                      filterProducts={this.filterProducts}
                      sortProducts={this.sortProducts}
              >
              </Filter>
              <Products products={this.state.products} addToCart={this.addToCart}>  </Products>
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
