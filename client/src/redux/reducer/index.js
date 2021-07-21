import {
  GET_BREEDS,
  GET_BREED_DETAILS,
  GET_BREEDS_SEARCH,
  GET_TEMPERAMENT,
  GET_ADD_BREED,
  GET_BREEDS_ASC,
  GET_BREEDS_DESC,
  FILTER_BY_TEMPERAMENTS,
  GET_HOME,
} from '../actions/TypesActions';

const initialState = {
  current: [],
  breed: [],
  breedDetails: {},
  breedsSearch: [],
  temperaments: [],
  single: {},
  filteredBreeds: [],

};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_BREEDS:
      return {
        ...state,
        current: action.payload,
      };
    case GET_BREED_DETAILS:
      return {
        ...state,
        breedDetails: action.payload,
      };
    case GET_BREEDS_SEARCH:
      return {
        ...state,
        current: action.payload.json,
      };
      case GET_TEMPERAMENT: {
        let filter = action.payload.map((temp) => {
          return temp.name;
        });
        return {
          ...state,
          temperaments: filter,
        };
      }

    case GET_ADD_BREED:
      return {
        ...state,
      };

    case FILTER_BY_TEMPERAMENTS: { 
      
      let filtapi = state.current.filter(e => e.temperament?.includes(action.payload))
      let filtdb = state.current.filter(e => e.temperaments?.map((temp) => temp.name)?.includes(action.payload))

      let newArrayFil = filtapi.concat(filtdb)
      // console.log(newArrayFil);

      if (!newArrayFil) {
        return {
          ...state,
      }
      }else{
        return {
          ...state,
          current: newArrayFil,
        };
      }
    }

    case GET_BREEDS_ASC:
      {
        if (action.payload === 'name') {
          return {
            ...state,
            filteredBreeds: [...state.filteredBreeds].sort((a, b) =>
              a[action.payload].toLowerCase() > b[action.payload].toLowerCase()
                ? 1
                : -1
            ),
            current: [...state.current].sort((a, b) =>
              a[action.payload].toLowerCase() > b[action.payload].toLowerCase()
                ? 1
                : -1
            ),
          };
        } else {
          return {
            ...state,
            filteredBreeds: [...state.filteredBreeds].sort((a, b) => {
              const arrayA = a[action.payload].split(' - '); // ["2", "4"]
              const arrayB = b[action.payload].split(' - '); // ["2", "4"]

              const promA = (+arrayA[0] + +arrayA[1] ? +arrayA[1] : 0) / 2; // 5
              const promB = (+arrayB[0] + +arrayB[1] ? +arrayB[1] : 0) / 2; // 10

              return promA > promB ? 1 : -1;
            }),
            current: [...state.current].sort((a, b) => {
              const arrayA = a[action.payload].split(' - '); // ["2", "4"]
              const arrayB = b[action.payload].split(' - '); // ["2", "4"]

              const promA = (+arrayA[0] + +arrayA[1] ? +arrayA[1] : 0) / 2; // 5
              const promB = (+arrayB[0] + +arrayB[1] ? +arrayB[1] : 0) / 2; // 10

              return promA > promB ? 1 : -1;
            }),
          };
        }
      }

      case GET_BREEDS_DESC:{
     
        if (action.payload === 'name') {
          return {
            ...state,
            filteredBreeds: [...state.filteredBreeds].sort((a, b) =>
              a[action.payload].toLowerCase() < b[action.payload].toLowerCase()
                ? 1
                : -1
            ),
            current: [...state.current].sort((a, b) =>
              a[action.payload].toLowerCase() < b[action.payload].toLowerCase()
                ? 1
                : -1
            ),
          };
        } else {
          return {
            ...state,
            filteredBreeds: [...state.filteredBreeds].sort((a, b) => {
              const arrayA = a[action.payload].split(' - '); // ["2", "4"]
              const arrayB = b[action.payload].split(' - '); // ["2", "4"]

              const promA = (+arrayA[0] + +arrayA[1] ? +arrayA[1] : 0) / 2; // 5
              const promB = (+arrayB[0] + +arrayB[1] ? +arrayB[1] : 0) / 2; // 10

              return promA > promB ? -1 : 1;
            }),
            current: [...state.current].sort((a, b) => {
              const arrayA = a[action.payload].split(' - '); // ["2", "4"]
              const arrayB = b[action.payload].split(' - '); // ["2", "4"]

              const promA = (+arrayA[0] + +arrayA[1] ? +arrayA[1] : 0) / 2; // 5
              const promB = (+arrayB[0] + +arrayB[1] ? +arrayB[1] : 0) / 2; // 10

              return promA > promB ? -1 : 1;
            }),
          };
        }
      }

    case GET_HOME:
      return {
        ...state,
      };

    default:
      return state;
  }
}
