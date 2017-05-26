import React from 'react'
import { connect } from 'react-redux'

import Title from './core/Title'
// import MyButton from './core/Button'
import ProfilePhoto from '../assets/images/ewoks.jpg'
import YoutubePlaceholder from '../assets/images/youtube_jimmy.jpg'
import { Button, Card, Image, List, Dimmer, Loader, Segment, Embed, Grid, Modal } from 'semantic-ui-react'

// redux
import { fetchFromAPI, fetchAllFromAPI, addPersonToDb } from '../actions'


class Home extends React.Component {
  state = { open: false }

  componentDidMount() {
    console.log(`Home componentDidMount, index=${this.props.index}`)
    // this.props.fetchFromAPI(this.props.index)
    this.props.fetchAllFromAPI(this.props.index)
  }

  show = (size) => {
    this.setState({ size, open: true })
    console.log('-----> Modal this.show')
  }
  close = () => this.setState({ open: false })

  handleClick(p) {
    this.show('small')
    this.props.addPersonToDb(p)
    console.log('here')

  }

  handleClickGenerate() {
    this.props.fetchAllFromAPI(this.props.index)
  }

  render() {
    const { open, size } = this.state

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
          <Title>Home</Title>
          <div>
            <Embed
              id='ZTLAx3VDX7g'
              placeholder={YoutubePlaceholder}
              source='youtube'
            />
          </div>

          <Grid>
            <Grid.Row></Grid.Row>
            <Grid.Row></Grid.Row>
          </Grid>

          <Card.Group>

            { this.props.people.map( p => {
              return (
                <Card key={p.url}>
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
                      <Button basic color='green' onClick={() => { this.handleClick(p) }} >Add</Button>

                    </div>
                  </Card.Content>
                </Card>
              )
            })}

          </Card.Group>

          <Grid> <Grid.Row></Grid.Row> <Grid.Row></Grid.Row>  </Grid>

          <Button color='green' onClick={() => {this.handleClickGenerate()}} > Show more </Button>

        <Modal size={size} open={open} onClose={this.close}>
          <Modal.Content>
            <p>This character has been added to User Data</p>
          </Modal.Content>

        </Modal>

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
    fetchAllFromAPI: (index) => {dispatch(fetchAllFromAPI(index))},
    addPersonToDb: (person) => {dispatch(addPersonToDb(person))}
  }
}

const connectedHome = connect(mapStateToProps, mapDispatchToProps)(Home)
export default connectedHome
