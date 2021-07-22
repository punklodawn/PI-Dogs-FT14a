import{
    GET_BREEDS,
    GET_BREED_DETAILS,
    GET_BREEDS_SEARCH,
    GET_TEMPERAMENT,
    GET_ADD_BREED,
    FILTER_BY_TEMPERAMENTS,
    GET_BREEDS_ASC,
    GET_BREEDS_DESC,
    GET_HOME,
    FILTER_BY_BDAPI,


} from '../actions/TypesActions'

export function getBreeds(){
    return async function (dispatch){
        const response = await fetch(`http://localhost:3001/dogs`)
        const json = await response.json()
        dispatch({type: GET_BREEDS, payload: json})
    }
}

export function getBreedsSearch(name){
    return async function (dispatch){
        const response = await fetch(`http://localhost:3001/dogs?name=${name}`)
        const json = await response.json()
        dispatch({type: GET_BREEDS_SEARCH, payload: {json, name}})
    }
}

export function getBreedDetails(id){
    return async function (dispatch){
        const response = await fetch(`http://localhost:3001/dogs/${id}`)
        const json = await response.json()
        dispatch({type: GET_BREED_DETAILS, payload: json})
    }
}
export function getTemperaments(){
    return async function (dispatch){
        const response = await fetch(`http://localhost:3001/temperament`)
        const json = await response.json()
        dispatch({type: GET_TEMPERAMENT, payload: json})
    }
}
export function getAddBreed(){
    return{
        type: GET_ADD_BREED,
    }
}


export function filterByTemperaments(payload) {
    return {
      type: FILTER_BY_TEMPERAMENTS,
      payload: payload,
    }
    };
  

export function filterByBDAPI(payload) {
        return {
          type: FILTER_BY_BDAPI,
          payload: payload,
        }
    }

  export function getHome() {
    return {
      type: GET_HOME,
    }
  }


  export function ordering(order, category) {

    return { 
        type: order === 'asc' ? GET_BREEDS_ASC : GET_BREEDS_DESC,
        payload: category 
    }
  }
  