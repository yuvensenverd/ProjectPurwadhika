import { LOGIN, LOGOUT, URLAPI, ADDITEM } from './types'
import Axios from 'axios'



export const loginUser = (value) =>{
    return  (dispatch) =>{
        Axios.get(URLAPI+'/users?name=' + value.USERNAME + "&pass=" + value.PASSWORD)
        .then((res)=>{
            console.log(res.data)
            // var asd = res.data
            // console.log(asd)
            // var objuser = {
            //     USERNAME : res.data.username,
            //     PASSWORD : res.data.password,
            //     CARTLENGTH : res.data.CartLength,
            //     ROLE : res.data.userrole
            // }
            // console.log(objuser)
          
            dispatch({
                type : LOGIN,
                payload : res.data
            })
        
            Axios.get(URLAPI+'/getcart?user='+res.data[0].username)
            .then((res2)=>{
                console.log(res2.data)
                dispatch({
                    type : ADDITEM,
                    payload : res2.data
                })
            })
            .catch((err)=>{

            })
        })
        .catch((err)=>{
            console.log(err.response.data)
        })
    }

    // return{
    //     type : LOGIN,
    //     payload : value
    // }
}

export const logoutUser = () =>{
    return{
        type : LOGOUT
    }
}

export const getListCategory = () => {
    return (dispatch) =>{
   
        Axios.get(URLAPI + "/categories")
        .then((res)=>{
        
            dispatch({
                type : 'ISI_CATEGORY_LIST',
                payload : res.data
            })
        })
        .catch((err)=>{
          console.log(err)
        })
        
      
      }
}

export const addItemCart = (item) =>{
    console.log(item)
    return {
        type : "ADD_TO_CART",
        payload : item
    }
}