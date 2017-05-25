import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Form, Input, TextArea, Button, Grid } from 'semantic-ui-react'

import { getPersonById, editPersonInDb } from '../actions'

import Title from './core/Title'


class PersonEdit extends React.Component {
  constructor(props) {
    super(props)
    this.id = this.props.match.params.id
    console.log("Person constructor", this.id)
    this.state = {
      id: '',
      name: '',
      notes: '',
      is_submitted: false
    }
    this.is_submitted = false

  }
  componentDidMount() {
    this.props.getPersonById(this.id)
  }

  componentWillReceiveProps(nextProps) {
    // ini bakal jalan setiap kali ada perubahan props
    this.setState({
      id: nextProps.person.id,
      name: nextProps.person.name,
      notes: nextProps.person.notes,
    })
  }

  handleChangeName(e) {
    this.setState({name: e.target.value})
  }

  handleChangeNotes(e) {
    this.setState({notes: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('submit')

    // alert(JSON.stringify(this.state))
    this.props.editPersonInDb(this.state)

    this.is_submitted = true;
    this.setState({is_submitted: true})

  }

  render() {
    console.log("render", this.props.person)
    if( !this.state.is_submitted ) {
      return (
        <div>
          <Title>Edit</Title>

          <Grid columns={3}>
            <Grid.Row>


              <Grid.Column>
                <Form onSubmit={(e) => { this.handleSubmit(e)}}>
                  <Form.Group widths='equal'>
                    <Form.Field id='form-input-control-first-name' control={Input} label='Name' placeholder='First name' onChange={(e) => {this.handleChangeName(e)}} value={this.state.name}/>
                  </Form.Group>
                  <Form.Field id='form-textarea-control-opinion' control={TextArea} label='Notes' placeholder='Notes' onChange={(e) => {this.handleChangeNotes(e)}} value={this.state.notes} />

                   <Button basic color='green' type='submit'>Save</Button>
                </Form>                
              </Grid.Column>
              <Grid.Column></Grid.Column>
              <Grid.Column></Grid.Column>


            </Grid.Row>
          </Grid>

        </div>
      )
    }
    else {
      console.log("elseeeee", this.props)
      return (
        <Redirect to={{
          pathname: '/data',
          state: { from: this.props.location }
        }} />
      )
    }


  }

}

const mapStateToProps = (state) => {
  return {
    person: state.UserApi.selectedPerson
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonById: (id) => { dispatch(getPersonById(id))},
    editPersonInDb: (person) => { dispatch(editPersonInDb(person))}
  }
}

const connectedPersonEdit = connect(mapStateToProps,mapDispatchToProps)(PersonEdit)
export default connectedPersonEdit
