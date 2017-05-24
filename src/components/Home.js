import React from 'react'
import { connect } from 'react-redux'

// redux
import { fetchFromAPI } from '../actions'


class Home extends React.Component {
  componentDidMount() {
    console.log(`Home componentDidMount`)
    this.props.fetchFromAPI(this.props.index)
  }

  render() {
    return (
      <div>
        <h2>Home</h2>
        <ul>
          { this.props.people.map( p => {
            return (
              <li key={p.url}>{p.name}</li>
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
  }
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export default connectedHome
