const initialState = {
  index: 1,
  people: []
}

const StarwarsApi = (state = initialState, action) => {
  console.log(`Reducers StarwarsApi--->action=[${action.type}]`)

  switch(action.type) {
    case 'ADD_FROM_API': {
      console.log(action)
      const person = action.person
      const updatedPeople = [...state.people, person]
      return { ...state, people: updatedPeople }
    }
    case 'INCREMENT_INDEX': {
      return {...state, index: state.index+1 }
    }
    default: return state
  }
}

export default StarwarsApi
