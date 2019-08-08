import { LOGIN, LOGOUT, ADDITEM } from "../actions/types";



const Initial_state = 
{ USERNAME : "",
  PASSWORD : "",
  ROLE : "",
  CARTLEN : 0 // LENGTH DARI CART 
}

export default(state = Initial_state, action)=>{
    switch(action.type){
        case LOGIN :
            console.log(action.payload)
            localStorage.setItem('username', action.payload.USERNAME)
            localStorage.setItem('password', action.payload.PASSWORD)
            console.log(action.payload.cartlength)

            // return {...state, USERNAME : action.payload.username, PASSWORD : action.payload.password,
            // ROLE : action.payload.userrole, CARTLEN : action.payload.cartlength}
            return {...state, USERNAME : action.payload.USERNAME, PASSWORD : action.payload.PASSWORD, role : action.payload.ROLE}
        case LOGOUT :
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            return Initial_state
        // case ADDITEM :
        //     // console.log("Masuk ADD Reducer")
        //     // console.log(action.payload)
        //     // var newcart = state.CART
        //     // newcart.push(action.payload)
        //     console.log("masuk")
            
        //     return {...state, CART : action.payload, CARTLEN : action.payload.length}
        default : 
                console.log("default")
            return state
    }
}