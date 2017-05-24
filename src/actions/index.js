import uuid from 'uuid'

import {
  ADD_FROM_API,
  INCREMENT_INDEX,
  ADD_ALL_FROM_API,
  ADD_PERSON,
  INCREMENT_LASTID,
  REFRESH_PEOPLE_DATA,
  DELETE_PERSON,
  GET_PERSON_BY_ID,
  EDIT_PERSON,
  SEARCH_BY_NAME
} from './constants'


export const addFromAPI = (data) => {
  return {
    type: ADD_FROM_API,
    person: data
  }
}

export const incrementIndex = () => {
  return {
    type: INCREMENT_INDEX
  }
}

export const fetchFromAPI = (index) => {
  return (dispatch) => {
    fetch(`http://swapi.co/api/people/${index}/`)
    .then( res=> res.json())
    .then( res=> {
      console.log("fetchFromAPI",res);
      dispatch(addFromAPI(res))
      dispatch(incrementIndex())
    })
  }
}

export const addAllFromAPI = (data) => {
  return {
    type: ADD_ALL_FROM_API,
    people: data
  }
}

export const fetchAllFromAPI = (index) => {
  return (dispatch) => {
    fetch(`http://swapi.co/api/people/`)
    .then( res => res.json() )
    .then( res => {
      console.log('fetchAllFromAPI', res)
      dispatch(addAllFromAPI(res.results))
    })
  }
}

export const incrementLastid = () => {
  return {
    type: INCREMENT_LASTID
  }
}

export const addPersonToUserData = (person) => {
  return {
    type: ADD_PERSON,
    person: person
  }
}

export const addPersonToDb = (person) => {
  return (dispatch) => {
    fetch('http://localhost:5000/people', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "id": uuid(),
        "name": person.name,
        "notes": ""
     })
   })
   .then( res => res.json() )
   .then( res => {
     console.log('addPersonToDb', res)
     dispatch(addPersonToUserData(res))
     dispatch(incrementLastid())

   })
  }
}

export const refreshPeopleData = (people) => {
  return {
    type: REFRESH_PEOPLE_DATA,
    people: people
  }
}

export const fetchPeopleFromUserAPI = () => {
  return (dispatch) => {
    fetch('http://localhost:5000/people')
    .then ( res => res.json())
    .then ( res => {
      console.log('fetchPeopleFromUserAPI', res)
      dispatch(refreshPeopleData(res))
    })
  }
}

export const deletePersonInUserData = (id) => {
  return {
    type: DELETE_PERSON,
    id: id
  }
}

export const deletePersonInDb = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:5000/people/${id}`, {
    method: 'delete'
    })
    .then( res => res.json() )
    .then( res => {
      console.log('deletePersonInDb', res)
      dispatch(deletePersonInUserData(id))
    })
  }
}

export const getPersonById = (id) => {
  return {
    type: GET_PERSON_BY_ID,
    id: id
  }
}

export const editPerson = (person) => {
  return {
    type: EDIT_PERSON,
    person: person
  }
}

export const editPersonInDb = (person) => {
  return (dispatch) => {

    fetch(`http://localhost:5000/people/${person.id}`, {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
           "name": person.name,
           "notes": person.notes
       })
    })
    .then( res => res.json() )
    .then( res => {
      console.log('editPersonInDb: ', res)

      dispatch(editPerson(res))
    })
  }
}

export const searchByName = (query) => {
  return {
    type: SEARCH_BY_NAME,
    query: query
  }
}
