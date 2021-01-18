// feature 1
import React from 'react';
import Products from './components/products';
import Filter from './components/filter';
import Cart from './components/cart';
import store from './store';
import { Provider } from 'react-redux';

class App extends React.Component {

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
              <Products />
            </div>
            <div className='sidebar'> 
              <Cart />
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
