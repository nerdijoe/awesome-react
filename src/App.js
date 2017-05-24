import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import './App.css';
import store from './store/manageStore'
import Nav from './components/Nav'
import Home from './components/Home'
import UserData from './components/UserData'
import Person from './components/Person'
import PersonEdit from './components/PersonEdit'


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>


          <Container>
            <Nav />

            <Route exact path='/' component={Home} />
            <Route path='/data' component={UserData} />
            <Route path='/person/:id' component={(props) => <Person match={props.match} />} />
            <Route path='/personedit/:id' component={(props) => <PersonEdit match={props.match} />} />

          </Container>



        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
