import React from 'react'
import { connect } from 'react-redux'
import { Form, Grid } from 'semantic-ui-react'

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

  handleSubmit(e) {
    e.preventDefault()
    console.log(`search [${this.state.query}]`)

    this.props.searchByName(this.state.query)

  }

  render() {
    return (
      <div>


              <Form onSubmit={(e) => { this.handleSubmit(e) }} >
                <Form.Group> 

                    <Form.Input placeholder='Enter name' width={8} name='name' value={this.state.query} onChange={(e) => {this.handleChange(e)}} />
                     <Form.Button basic color='green' type='submit' content='Search' />

                </Form.Group>
              </Form>
          

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
