import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Image, Header, Table, Dimmer, Loader, Segment} from 'semantic-ui-react'

import { fetchPeopleFromUserAPI, deletePersonInDb } from '../actions'

// import Button from './core/Button'
import SearchPerson from './SearchPerson'
import ProfilePhoto from '../assets/images/ewoks.jpg'


class UserData extends React.Component {
  componentDidMount() {
    console.log('UserData componentDidMount')
    this.props.fetchPeopleFromUserAPI()
  }

  render() {
    if(this.props.people.length === 0) {
      return (
        <div>
          <Segment>
            <br/>
            <Dimmer active inverted>
              <Loader inverted>Loading data from galaxy far away ...</Loader>
            </Dimmer>

            
            <br/><br/>
          </Segment>
        </div>
      )
    }
    else {
  
      return (
        <div>
          <h2>User Data</h2>

          <SearchPerson />

          <Table basic='very' celled collapsing fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={5} >Name</Table.HeaderCell>
                <Table.HeaderCell width={9}>Notes</Table.HeaderCell>
                <Table.HeaderCell width={4}>Action</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              { this.props.result.map( p => {
                return (
                  <Table.Row key={p.id}>
                    <Table.Cell>
                      <Header as='h4' image>
                        <Image src={ProfilePhoto} shape='rounded' size='mini' />
                        <Header.Content>
                          <Link to={`/person/${p.id}`} > {p.name} </Link>
                          <Header.Subheader></Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      {p.notes}
                    </Table.Cell>
                    <Table.Cell>
                      <Button circular color='red' icon='delete' onClick={() => { this.props.deletePersonInDb(p.id)}} />
                      <Link to={`/personedit/${p.id}`} >
                        
                        <Button circular color= 'yellow' icon='edit' />
                      </Link>
                    </Table.Cell>

                  </Table.Row>            )
              })}

            </Table.Body>
          </Table>

        </div>
      )
    } // end else
  }
}

const mapStateToProps = (state) => {
  return {
    people: state.UserApi.people,
    result: state.UserApi.searchResult
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
