import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import './App.css';
import store from './store/manageStore'
import Nav from './components/Nav'
import Home from './components/Home'
import UserData from './components/UserData'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>


          <div>
            <Nav />

            <Route exact path='/' component={Home} />
            <Route path='/data' component={UserData} />
          </div>



        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
