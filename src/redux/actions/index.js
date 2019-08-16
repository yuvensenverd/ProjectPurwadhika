import { LOGIN, LOGOUT, URLAPI, ADDITEM } from './types'
import Axios from 'axios'



export const loginUser = (value) =>{
    return  (dispatch) =>{
        Axios.post(URLAPI+'/user/getuser', {
            name : value.USERNAME,
            pass : value.PASSWORD
        })
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
        
            Axios.get(URLAPI+'/cart/getcart?user='+res.data[0].username)
            .then((res2)=>{
                console.log(res2.data)
                dispatch({
                    type : ADDITEM,
                    payload : res2.data
                })
            })
            .catch((err)=>{
                console.log(err)
            })
        })
        .catch((err)=>{
            console.log(err)
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
   
        Axios.get(URLAPI + "/category/getcategory")
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

export const updateUser = (data) =>{
    return {
        type : "UPDATE_USER",
        payload : data
    }
}