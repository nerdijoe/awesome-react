
const initialState = {
  people: [],
  films: [],
  lastid: 0,
  selectedPerson: {},
  searchResult: []
}

const UserApi = (state = initialState, action) => {
  console.log(`Reducers UserApi--->action=[${action.type}]`)
  console.log(action);
  switch(action.type) {
    case 'REFRESH_PEOPLE_DATA': {
      const updatedPeople = action.people
      // also update lastid
      const updatedLastid = updatedPeople.length
      return {...state, people: updatedPeople, searchResult: updatedPeople, lastid: updatedLastid}
    }
    case 'ADD_PERSON': {
      const person = action.person
      const updatedPeople = [...state.people, person]
      return {...state, people: updatedPeople}
    }
    case 'INCREMENT_LASTID': {
      return {...state, lastid: state.lastid + 1}
    }
    case 'DELETE_PERSON': {
      const updatedPeople = [...state.people]
      let pos = updatedPeople.findIndex( p => p.id === action.id )
      if(pos !== -1) {
        updatedPeople.splice(pos, 1)
      }

      return {...state, people: updatedPeople, searchResult: updatedPeople }
    }
    case 'GET_PERSON_BY_ID': {
      let pos = state.people.findIndex(p => p.id === action.id )
      const person = {...state.people[pos]}
      return {...state, selectedPerson: person}
    }
    case 'EDIT_PERSON': {
      const updatedPeople = [...state.people]
      let pos = updatedPeople.findIndex(p => p.id === action.person.id )
      if( pos !== -1) {
        updatedPeople.splice(pos, 1, action.person)
      }

      return {...state, people: updatedPeople}
    }
    case 'SEARCH_BY_NAME': {
      const result = state.people.filter( p => p.name.toLowerCase().indexOf(action.query.toLowerCase()) > -1 )
      console.log('*** SEARCH_BY_NAME', result)

      return {...state, searchResult: result}
    }
    default: return state
  }

}

export default UserApi
