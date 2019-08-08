import { LOGIN, LOGOUT, URLAPI } from './types'
import Axios from 'axios'



export const loginUser = (value) =>{
    // return  (dispatch) =>{
    //     Axios.get(URLAPI+'/users?name=' + value.USERNAME + "&pass=" + value.PASSWORD)
    //     .then((res)=>{
    //         console.log(res.data)
    //         // var asd = res.data
    //         // console.log(asd)
    //         // var objuser = {
    //         //     USERNAME : res.data.username,
    //         //     PASSWORD : res.data.password,
    //         //     CARTLENGTH : res.data.CartLength,
    //         //     ROLE : res.data.userrole
    //         // }
    //         // console.log(objuser)
    //         console.log(res.data)
    //         dispatch({
    //             type : LOGIN,
    //             payload : res.data
    //         })
    //     })
    //     .catch((err)=>{
    //         console.log(err.response.data)
    //     })
    // }

    return{
        type : LOGIN,
        payload : value
    }
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
            console.log(res.data.name)
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

    return {
        type : "ADD_TO_CART",
        payload : item
    }
}