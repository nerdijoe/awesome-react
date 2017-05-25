import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, Feed, Icon, Image, Header, Table, Dimmer, Loader, Segment} from 'semantic-ui-react'

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

          <Feed>
            {this.props.people.map( p => {
              return (
                <Feed.Event key={p.id}>
                  <Feed.Label>
                    <Image src={ProfilePhoto} />
                  </Feed.Label>
                  <Feed.Content>
                    <Feed.Summary>
                      <Feed.User>{p.name}</Feed.User>
                      <Feed.Date>{p.notes}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text></Feed.Extra>
                    <Feed.Meta>
                      <Feed.Like>
                        <Icon name='delete' onClick={() => { this.props.deletePersonInDb(p.id)}}/>
                      </Feed.Like>
                      <Feed.Like>
                        <Link to={`/personedit/${p.id}`} >
                          <Icon name='edit' />
                        </Link>

                      </Feed.Like>
                    </Feed.Meta>
                  </Feed.Content>
                </Feed.Event>
              )
            })}


          </Feed>


    <Table basic='very' celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Notes</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>

        { this.props.people.map( p => {
          return (
            <Table.Row>
              <Table.Cell>
                <Header as='h4' image>
                  <Image src={ProfilePhoto} shape='rounded' size='mini' />
                  <Header.Content>
                    <Link to={`/person/${p.id}`} > {p.name} </Link>
                    <Header.Subheader>sub header</Header.Subheader>
                  </Header.Content>
                </Header>
              </Table.Cell>
              <Table.Cell>
                {p.notes}
              </Table.Cell>
              <Table.Cell>
                <a><Icon name='delete' onClick={() => { this.props.deletePersonInDb(p.id)}}/></a>
                <Link to={`/personedit/${p.id}`} >
                  <Icon name='edit' />
                </Link>
              </Table.Cell>

            </Table.Row>            )
        })}

      </Table.Body>
    </Table>



          <SearchPerson />
        </div>
      )
    } // end else
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
