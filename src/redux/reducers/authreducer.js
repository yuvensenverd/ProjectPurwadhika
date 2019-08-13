import { LOGIN, LOGOUT, ADDITEM } from "../actions/types";
import { isNull } from "util";



const Initial_state = 
{ USERNAME : "",
  PASSWORD : "",
  ROLE : "",
  CART : [], // ANOTHER DISPATCH THAT TAKES CART ITEMS FROM SQL
  CARTLEN : 0, // LENGTH DARI CART
  userid : null  ,
  HAVESHOP : false,
  SALDO : null,
  PHONENUMBER : null,
  RESIDENCE : "",
  EMAIL : "",
  PROFILEIMG : ''
}

export default(state = Initial_state, action)=>{
    switch(action.type){
        case LOGIN :
 
            localStorage.setItem('username', action.payload[0].username)
            localStorage.setItem('password', action.payload[0].password)
    
    
            // return {...state, USERNAME : action.payload.username, PASSWORD : action.payload.password,
            // ROLE : action.payload.userrole, CARTLEN : action.payload.cartlength}
            // HAPUS CARTLENGTH TD
            return {...state, USERNAME : action.payload[0].username, PASSWORD : action.payload[0].password,
                    ROLE : action.payload[0].userrole,
                     userid : action.payload[0].userid, HAVESHOP : !isNull(action.payload[0].shopname),
                    SALDO : parseInt(action.payload[0].saldo), PHONENUMBER : action.payload[0].phonenumber,
                     RESIDENCE : action.payload[0].residence, EMAIL : action.payload[0].email, PROFILEIMG :action.payload[0].profileimg}
        case LOGOUT :
            localStorage.removeItem('username')
            localStorage.removeItem('password')
            return Initial_state
        case ADDITEM :
            // console.log("Masuk ADD Reducer")
            // console.log(action.payload)
            // var newcart = state.CART
            // newcart.push(action.payload)
      
            
            return {...state,CARTLEN : action.payload.length, CART: action.payload}
        case  "UPDATE_USER":
            return {...state, USERNAME : action.payload.username, PASSWORD : action.payload.password,
                ROLE : action.payload.userrole, 
                 userid : action.payload.userid, HAVESHOP : !isNull(action.payload.shopname),
                SALDO : parseInt(action.payload.saldo), PHONENUMBER : action.payload.phonenumber,
                 RESIDENCE : action.payload.residence, EMAIL : action.payload.email, PROFILEIMG :action.payload.profileimg}
            
        default : 
            console.log("default")
            return state
    }
}