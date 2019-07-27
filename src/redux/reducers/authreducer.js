import { LOGIN, LOGOUT } from "../actions/types";


const Initial_state = 
{ USERNAME : "",
  PASSWORD : "",
  ROLE : "",
  CART : []
}

export default(state = Initial_state, action)=>{
    switch(action.type){
        case LOGIN :
            return {...state, USERNAME : action.payload.USERNAME, PASSWORD : action.payload.PASSWORD,
            ROLE : action.payload.ROLE, CART : action.payload.CART}
        case LOGOUT :
            return Initial_state
        default : 
            return state
    }
}