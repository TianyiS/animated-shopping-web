// feature 1
import React from 'react';
import store from './store';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/homeScreen";
import AdminScreen from "./screens/adminScreen";

class App extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="grid-container">
          <header>
            <Link to="/">Awesome Shopping Cart</Link>
            <Link to="/admin">Admin</Link>
          </header>
          <main>
            <Route path="/" component={HomeScreen} exact></Route>
            <Route path='/admin' component={AdminScreen}></Route>
          </main>
          <footer>
            All right is reserved.
          </footer>
        </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
