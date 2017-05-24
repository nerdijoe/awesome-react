import { ADD_FROM_API, INCREMENT_INDEX, ADD_ALL_FROM_API } from './constants'


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
