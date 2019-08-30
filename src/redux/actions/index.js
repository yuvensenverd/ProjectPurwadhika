import { LOGIN, LOGOUT, URLAPI, ADDITEM } from './types'
import Axios from 'axios'



export const loginUser = (value) =>{
    return  (dispatch) =>{
        Axios.post(URLAPI+'/user/getuser', {
            name : value.USERNAME,
            pass : value.PASSWORD
        })
        .then((res)=>{
          
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data[1])
            res.data[0].token = res.data[1]
          
            dispatch({
                type : LOGIN,
                payload : res.data
            })

            const token = localStorage.getItem('token')
            const headers = {
                headers: {
                    'Authorization' : `${token}`
                }
            }
            
        
            Axios.get(URLAPI+'/cart/getcart?user='+res.data[0].username, headers)
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
            
            Axios.get(URLAPI + '/transaction/getnotiflen/' + res.data[0].userid)
            .then((result)=>{
                console.log("Masuk SElesai Notif")
                console.log(result.data)
                dispatch({
                    type : "UPDATE_NOTIFICATION",
                    payload : result.data[0].NOTIFLEN
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

export const updateNotification = (val) =>{
    return{
        type : "UPDATE_NOTIFICATION",
        payload : val //this.props.userdata.NOTIFLEN - 1 dsbdbsdbs
    }
}
export const updateShopNotification = (val) =>{
    return{
        type : "UPDATE_SHOP_NOTIFICATION",
        payload : val //this.props.userdata.SHOPNOTIF - 1 dsbdbsdbs
    }
}

export const updateUser = (data) =>{
    return {
        type : "UPDATE_USER",
        payload : data
    }
}

export const loginToken = () =>{
    return  (dispatch) =>{
        console.log("Masuk login Token")
        const token = localStorage.getItem('token')
        const headers = {
            headers: {
                'Authorization' : `${token}`
            }
        }
        Axios.post(URLAPI+'/user/logintoken', {}, headers)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[1])
            localStorage.removeItem('token')
            localStorage.setItem('token', res.data[1])
            res.data[0].token = res.data[1]
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
        
            Axios.get(URLAPI+'/cart/getcart?user='+res.data[0].username, headers)
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

            Axios.get(URLAPI + '/transaction/getnotiflen/' + res.data[0].userid)
            .then((result)=>{
                console.log("Masuk SElesai Notif")
                console.log(result.data)
                dispatch({
                    type : "UPDATE_NOTIFICATION",
                    payload : result.data[0].NOTIFLEN
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
}
