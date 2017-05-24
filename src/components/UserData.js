import React from 'react'
import { connect } from 'react-redux'

import { fetchPeopleFromUserAPI } from '../actions'

class UserData extends React.Component {
  componentDidMount() {
    console.log('UserData componentDidMount')
    this.props.fetchPeopleFromUserAPI()
  }

  render() {
    return (
      <div>
        <h2>User Data</h2>
        <ul>
          {this.props.people.map( p => {
            return (
              <li key={p.id}>{p.id}-{p.name}</li>
            )
          })}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    people: state.UserApi.people
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPeopleFromUserAPI: () => {dispatch(fetchPeopleFromUserAPI())}
  }
}

const connectedUserData = connect(mapStateToProps,mapDispatchToProps)(UserData)
export default connectedUserData
