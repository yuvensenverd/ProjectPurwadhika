import { LOGIN, LOGOUT, ADDITEM } from "../actions/types";
import { isNull } from "util";



const Initial_state = 
{ USERNAME : "",
  PASSWORD : "",
  ROLE : "",
  CART : [], // ANOTHER DISPATCH THAT TAKES CART ITEMS FROM SQL
  CARTLEN : 0, // LENGTH DARI CART
  userid : null  ,
  HAVESHOP : false
}

export default(state = Initial_state, action)=>{
    switch(action.type){
        case LOGIN :
 
            localStorage.setItem('username', action.payload[0].username)
            localStorage.setItem('password', action.payload[0].password)
    
            console.log(action.payload[0])
            console.log(!isNull(action.payload[0].shopname))
            // return {...state, USERNAME : action.payload.username, PASSWORD : action.payload.password,
            // ROLE : action.payload.userrole, CARTLEN : action.payload.cartlength}
            return {...state, USERNAME : action.payload[0].username, PASSWORD : action.payload[0].password,
                    ROLE : action.payload[0].userrole, CARTLEN : action.payload[0].cartlength ,
                     userid : action.payload[0].userid, HAVESHOP : !isNull(action.payload[0].shopname)}
        case LOGOUT :
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            return Initial_state
        case ADDITEM :
            // console.log("Masuk ADD Reducer")
            // console.log(action.payload)
            // var newcart = state.CART
            // newcart.push(action.payload)
            console.log(action.payload)
            console.log(action.payload.length)
            
            return {...state,CARTLEN : action.payload.length, CART: action.payload}
        default : 
                console.log("default")
            return state
    }
}