import { LOGIN, LOGOUT, ADDITEM } from "../actions/types";



const Initial_state = 
{ USERNAME : "",
  PASSWORD : "",
  ROLE : "",
  CART : [],
  CARTLEN : 0 // LENGTH DARI CART 
}

export default(state = Initial_state, action)=>{
    switch(action.type){
        case LOGIN :
            localStorage.setItem('username', action.payload.USERNAME)
            localStorage.setItem('password', action.payload.PASSWORD)
            return {...state, USERNAME : action.payload.USERNAME, PASSWORD : action.payload.PASSWORD,
            ROLE : action.payload.ROLE, CART : action.payload.CART}
        case LOGOUT :
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            return Initial_state
        case ADDITEM :
            // console.log("Masuk ADD Reducer")
            // console.log(action.payload)
            // var newcart = state.CART
            // newcart.push(action.payload)
            console.log("masuk")
            
            return {...state, CART : action.payload, CARTLEN : action.payload.length}
        default : 
                console.log("default")
            return state
    }
}