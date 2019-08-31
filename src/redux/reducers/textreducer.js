import { ON_CHANGE_FILTER } from "../actions/types";


const INITIAL_STATE = {
    text : ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ON_CHANGE_FILTER:
           
            return {...state , text : action.payload}
        default : 
            return state
    }
}