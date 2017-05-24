import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


export default class MenuExampleSecondary extends Component {
  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu secondary>
        <Link to="/"><Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} >Home</Menu.Item></Link>
        <Link to='/data'><Menu.Item name='data' active={activeItem === 'data'} onClick={this.handleItemClick} > Data </Menu.Item></Link>

      </Menu>
    )
  }
}
