import { ADD_FROM_API, ADD_ALL_FROM_API, INCREMENT_INDEX } from '../actions/constants'

const initialState = {
  index: 1,
  people: []
}

const StarwarsApi = (state = initialState, action) => {
  console.log(`Reducers StarwarsApi--->action=[${action.type}]`)
  console.log(action)

  switch(action.type) {
    case ADD_FROM_API: {
      const person = action.person
      const updatedPeople = [...state.people, person]
      return { ...state, people: updatedPeople }
    }
    case INCREMENT_INDEX: {
      return {...state, index: state.index+1 }
    }
    case ADD_ALL_FROM_API: {
      const people = action.people
      return {...state, people: people}
    }
    default: return state
  }
}

export default StarwarsApi
