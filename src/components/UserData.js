import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPeopleFromUserAPI, deletePersonInDb } from '../actions'

import Button from './core/Button'
import SearchPerson from './SearchPerson'

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
              <li key={p.id}>
                <Button handleClick={() => { this.props.deletePersonInDb(p.id)}}>x</Button>
                {p.name} - {p.notes}
                <Link to={`/person/${p.id}`} > detail </Link>
                <Link to={`/personedit/${p.id}`} > edit </Link>
              </li>
            )
          })}
        </ul>

        <SearchPerson />
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
    fetchPeopleFromUserAPI: () => {dispatch(fetchPeopleFromUserAPI())},
    deletePersonInDb: (id) => {dispatch(deletePersonInDb(id))}
  }
}

const connectedUserData = connect(mapStateToProps,mapDispatchToProps)(UserData)
export default connectedUserData
