
const initialState = {
  people: [],
  films: [],
  lastid: 0
}

const UserApi = (state = initialState, action) => {
  console.log(`Reducers UserApi--->action=[${action.type}]`)
  console.log(action);
  switch(action.type) {
    case 'REFRESH_PEOPLE_DATA': {
      const updatedPeople = action.people
      // also update lastid
      const updatedLastid = updatedPeople.length
      return {...state, people: updatedPeople, lastid: updatedLastid}
    }
    case 'ADD_PERSON_TO_USER_DATA': {
      const person = action.person
      const updatedPeople = [...state.people, person]
      return {...state, people: updatedPeople}
    }
    case 'INCREMENT_LASTID': {
      return {...state, lastid: state.lastid + 1}
    }
    default: return state
  }

}

export default UserApi
