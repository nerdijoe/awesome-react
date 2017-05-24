import { combineReducers } from 'redux'

import StarwarsApi from './StarwarsApi'
import UserApi from './UserApi'

const Starwars = combineReducers({
  StarwarsApi,
  UserApi
})

export default Starwars
