import React from 'react'
import { connect } from 'react-redux'

import Title from './core/Title'
import MyButton from './core/Button'
import ProfilePhoto from '../assets/images/ewoks.jpg'
import { Button, Card, Image, List } from 'semantic-ui-react'

// redux
import { fetchFromAPI, fetchAllFromAPI, addPersonToDb } from '../actions'


class Home extends React.Component {
  componentDidMount() {
    console.log(`Home componentDidMount`)
    // this.props.fetchFromAPI(this.props.index)
    this.props.fetchAllFromAPI()
  }

  render() {
    if(this.props.people.length === 0) {
      return (
        <div>
          <p>Loading data from galaxy far away...</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <Title>Home</Title>
          <ul>
            { this.props.people.map( p => {
              return (
                <li key={p.url}>
                  <Button color='green' onClick={() => { this.props.addPersonToDb(p) }}>Add</Button>
                  {p.name}
                </li>
              )
            })}
          </ul>

          <Card.Group>

            { this.props.people.map( p => {
              return (
                <Card key={p.id}>
                  <Card.Content>
                    <Image floated='right' size='tiny' src={ProfilePhoto} />
                    <Card.Header>
                      {p.name}
                    </Card.Header>
                    <Card.Meta>
                      Stars in {p.films.length} films
                    </Card.Meta>
                    <Card.Description>

                      <List>
                        <List.Item>
                          <List.Icon name='intergender' />
                          <List.Content>{p.gender}</List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='resize vertical' />
                          <List.Content>{p.height} cm</List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='eye' />
                          <List.Content>{p.eye_color}</List.Content>
                        </List.Item>
                        <List.Item>
                          <List.Icon name='calendar' />
                          <List.Content>{p.birth_year}</List.Content>
                        </List.Item>
                      </List>

                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    <div className='ui two buttons'>
                      <Button basic color='green' onClick={() => { this.props.addPersonToDb(p) }} >Add</Button>
                      
                    </div>
                  </Card.Content>
                </Card>
              )
            })}

          </Card.Group>


        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    index: state.StarwarsApi.index,
    people: state.StarwarsApi.people,
    lastid: state.UserApi.lastid
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchFromAPI: (index) => { dispatch(fetchFromAPI(index)) },
    fetchAllFromAPI: () => {dispatch(fetchAllFromAPI())},
    addPersonToDb: (person) => {dispatch(addPersonToDb(person))}
  }
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export default connectedHome
