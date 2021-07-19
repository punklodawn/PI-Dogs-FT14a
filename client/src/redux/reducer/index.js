import{
    GET_BREEDS,
    GET_BREED_DETAILS,
    GET_BREEDS_SEARCH,
    GET_ADD_BREED,
    GET_BREEDS_ASC,
    GET_BREEDS_DESC,
    FILTER_BY_TEMPERAMENTS,
    GET_HOME,
} from '../actions/TypesActions'

const numPages = 24
const initialState={
    current:[],
    breed:[],
    stateChooseContent:'',
    breedDetails:{},
    breedsSearch:[],
    pages:''
    .repeat(numPages)
    .split('')
    .map((item, i )=>i),
    list: [],
    temperaments: [],
    single: {},
}

export default function rootReducer(state = initialState, action){
    switch(action.type){

        case GET_BREEDS:
            return{
                ...state,
                current: action.payload,
                stateChooseContent:'active',
            }
        case GET_BREED_DETAILS:
            return{
                ...state,
                breedDetails: action.payload,
                stateChooseContent:'active',
            }
        case GET_BREEDS_SEARCH:
            return{
                ...state,
                current: action.payload.json,
                stateChooseContent:'active',
            }
   
        case GET_ADD_BREED:
                return{
                    ...state,
                    // pages:''
                    // .repeat(24)
                    // .split('')
                    // .map((item, i)=>i),
                }

        case FILTER_BY_TEMPERAMENTS: {

                    let array = [];
                    for (let i = 0; i < state.current.length; i++) {
                      const recipe = state.current[i];
                      console.log('receta',recipe);
                      for (let j = 0; j < state.current.diets.length; j++) {
                        const diet = recipe.diets[j];
                        if (diet.name === action.payload) {
                          array.push(recipe);
                        }
                      }
                    }

                    return {
                      ...state,
                      list: [...array],
                    };
                  }

                  case GET_HOME:
                    return {
                      ...state,
                    }
                  
        default:
                return state
    }
}