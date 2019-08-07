import { LOGIN, LOGOUT, URLAPI } from './types'
import Axios from 'axios'


export const loginUser = (value) =>{
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