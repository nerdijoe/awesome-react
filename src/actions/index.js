import { ADD_FROM_API, INCREMENT_INDEX } from './constants'


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
