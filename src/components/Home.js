import React from 'react'
import { connect } from 'react-redux'

import Title from './core/Title'
import MyButton from './core/Button'

import { Button } from 'semantic-ui-react'

// redux
import { fetchFromAPI, fetchAllFromAPI, addPersonToDb } from '../actions'


class Home extends React.Component {
  componentDidMount() {
    console.log(`Home componentDidMount`)
    // this.props.fetchFromAPI(this.props.index)
    this.props.fetchAllFromAPI()
  }

  render() {
    if(this.props.people.length === 0) {
      return (
        <div>
          <p>Loading data from galaxy far away...</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <Title>Home</Title>
          <ul>
            { this.props.people.map( p => {
              return (
                <li key={p.url}>
                  <Button color='green' onClick={() => { this.props.addPersonToDb(p) }}>Add</Button>
                  {p.name}
                </li>
              )
            })}
          </ul>

        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.StarwarsApi.index,
    people: state.StarwarsApi.people,
    lastid: state.UserApi.lastid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFromAPI: (index) => { dispatch(fetchFromAPI(index)) },
    fetchAllFromAPI: () => {dispatch(fetchAllFromAPI())},
    addPersonToDb: (person) => {dispatch(addPersonToDb(person))}
  }
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export default connectedHome
