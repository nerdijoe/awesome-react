import React from 'react'
import { connect } from 'react-redux'

import Title from './core/Title'
import Button from './core/Button'
// redux
import { fetchFromAPI, fetchAllFromAPI } from '../actions'


class Home extends React.Component {
  componentDidMount() {
    console.log(`Home componentDidMount`)
    // this.props.fetchFromAPI(this.props.index)
    this.props.fetchAllFromAPI()
  }

  render() {
    return (
      <div>
        <Title>Home</Title>
        <ul>
          { this.props.people.map( p => {
            return (
              <li key={p.url}><Button handleClick={() => {alert(`add ${p.name}`)}}>Add</Button>{p.name}</li>
            )
          })}
        </ul>

      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.StarwarsApi.index,
    people: state.StarwarsApi.people
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFromAPI: (index) => { dispatch(fetchFromAPI(index)) },
    fetchAllFromAPI: () => {dispatch(fetchAllFromAPI())}
  }
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export default connectedHome
