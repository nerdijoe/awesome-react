import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import Starwars from '../reducers'

let middlewares = applyMiddleware(logger, thunk)

let store = createStore( Starwars, middlewares )

export default store
