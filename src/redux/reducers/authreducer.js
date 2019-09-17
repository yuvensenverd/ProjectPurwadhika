import { LOGIN, LOGOUT, ADDITEM, LOADING, LOADINGFALSE, CHECKTRUE, UPDATENOTIFICATION, UPDATEUSER, VERIFY } from "../actions/types";
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
  PHONENUMBER : '',
  RESIDENCE : "",
  EMAIL : "",
  PROFILEIMG : '',
  STATUS : '',
  TOKEN : '',
  NOTIFLEN : 0, 
  LOADING : false,
  CHECK : false
}

export default(state = Initial_state, action)=>{
    switch(action.type){
        case LOGIN :
 
            return {...state,
                 USERNAME : action.payload[0].username, PASSWORD : action.payload[0].password,
                 ROLE : action.payload[0].userrole, userid : action.payload[0].userid,
                 HAVESHOP : !isNull(action.payload[0].shopname),
                 SALDO : parseInt(action.payload[0].saldo), PHONENUMBER : action.payload[0].phonenumber,
                 RESIDENCE : action.payload[0].residence, EMAIL : action.payload[0].email,
                 PROFILEIMG :action.payload[0].profileimg, STATUS : action.payload[0].status,
                 TOKEN : action.payload[0].token, LOADING : false, CHECK : true
                }

        case LOGOUT :
            localStorage.removeItem('token')
            return {...Initial_state, CHECK : true}

        case ADDITEM :
            return {...state,CARTLEN : action.payload.length, CART: action.payload}

        case  UPDATEUSER:
            return {...state, USERNAME : action.payload.username,
                PASSWORD : action.payload.password, ROLE : action.payload.userrole, 
                userid : action.payload.userid, HAVESHOP : !isNull(action.payload.shopname),
                SALDO : parseInt(action.payload.saldo), PHONENUMBER : action.payload.phonenumber,
                RESIDENCE : action.payload.residence, EMAIL : action.payload.email,
                PROFILEIMG :action.payload.profileimg}

        case UPDATENOTIFICATION :
            return {
                ...state, NOTIFLEN : action.payload
            }

        case LOADING :
            return {
                ...state, LOADING : true
            }

        case LOADINGFALSE:
            return{
                ...state, LOADING : false
            }

        case CHECKTRUE:
            return{
                ...state, CHECK : true
            }
        case VERIFY:
            console.log('verifysuccess')
            return{
                ...state, STATUS : 'Verified'
            }
            
        default : 
            return state
    }
}