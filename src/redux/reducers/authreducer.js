import { LOGIN, LOGOUT, ADDITEM } from "../actions/types";


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
        case ADDITEM :
            console.log("Masuk ADD Reducer")
            var newcart = state.CART
            newcart.push(action.payload)
            return {...state, CART : newcart}
        default : 
            return state
    }
}