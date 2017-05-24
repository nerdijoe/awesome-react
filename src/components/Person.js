import React from 'react'
import { connect } from 'react-redux'

import { getPersonById } from '../actions'

class Person extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.match.params.id
    console.log("Person constructor", this.id)
  }
  componentDidMount() {
    this.props.getPersonById(this.id)
  }

  render() {

    return (
      <div>
        <h2>Detail</h2>
        {this.props.person.name}
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    person: state.UserApi.selectedPerson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonById: (id) => { dispatch(getPersonById(id))}
  }
}

const connectedPerson = connect(mapStateToProps,mapDispatchToProps)(Person)
export default connectedPerson
