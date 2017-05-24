import React from 'react'
import { connect } from 'react-redux'

import { searchByName } from '../actions'

class SearchPerson extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ''
    }

  }

  handleChange(e) {
    this.setState({query: e.target.value})
    this.props.searchByName(this.state.query)
  }

  handleClick() {
    console.log(`search [${this.state.query}]`)

    this.props.searchByName(this.state.query)

  }

  render() {
    return (
      <div>
        <h2>Search</h2>
        <input type="text" value={this.state.query} onChange={(e) => {this.handleChange(e)}}/>
        <button onClick={() => { this.handleClick() }}>Search</button>

        <h3>Result:</h3>

        <ul>
          { this.props.result.map( r => {
            return (
              <li key={r.id}>{r.name} - {r.notes}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    result: state.UserApi.searchResult
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchByName: (query) => {dispatch(searchByName(query)) }
  }
}

const connectedSearchPerson = connect(mapStateToProps,mapDispatchToProps)(SearchPerson)
export default connectedSearchPerson
