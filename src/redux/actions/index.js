import { LOGIN, LOGOUT, URLAPI, ADDITEM, LOADING, LOADINGFALSE, CHECKTRUE, ISICATEGORYLIST, UPDATENOTIFICATION, UPDATEUSER, VERIFY } from './types'
import Axios from 'axios'



export const loginUser = (value) =>{
    return  (dispatch) =>{
        dispatch({
            type : LOADING
        })
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
                dispatch({
                    type : LOADINGFALSE
                })
            })
            
            Axios.get(URLAPI + '/transaction/getnotiflen/' + res.data[0].userid)
            .then((result)=>{
                console.log("Masuk SElesai Notif")
                console.log(result.data)
                dispatch({
                    type : UPDATENOTIFICATION,
                    payload : result.data[0].NOTIFLEN
                })
                
                
            })
            .catch((err)=>{
                console.log(err)
                dispatch({
                    type : LOADINGFALSE
                })
            })

            
            
        })
        .catch((err)=>{
          
            dispatch({
                type : LOADINGFALSE
            })
            window.alert(err.response.data.err)
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
                type : ISICATEGORYLIST,
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
        type : UPDATENOTIFICATION,
        payload : val //this.props.userdata.NOTIFLEN - 1 dsbdbsdbs
    }
}


export const updateUser = (data) =>{
    return {
        type : UPDATEUSER,
        payload : data
    }
}

export const loginToken = () =>{
    return  (dispatch) =>{
        console.log("Masuk login Token")
        dispatch({
            type : LOADING
        })
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
                dispatch({
                    type : LOADINGFALSE
                })
            })

            Axios.get(URLAPI + '/transaction/getnotiflen/' + res.data[0].userid)
            .then((result)=>{
                console.log("Masuk SElesai Notif")
                console.log(result.data)
                dispatch({
                    type : UPDATENOTIFICATION,
                    payload : result.data[0].NOTIFLEN
                })
                
            })
            .catch((err)=>{
                dispatch({
                    type : LOADINGFALSE
                })
            })

         
        })
        .catch((err)=>{
            
            dispatch({
                type : LOADINGFALSE // LOADING TO FALSE
            })
            dispatch({
                type : CHECKTRUE 
            })
            window.alert("User Token Not Authorized, Please Login via login page")
         
        })
    }
}

export const loading = () =>{
    return {
        type : LOADING
    }
}
export const loadingFalse = () =>{
    return {
        type : LOADINGFALSE
    }
}

export const checkTrue = () =>{
    return {
        type : CHECKTRUE
    }
}
export const verify = () =>{
    return {
        type : VERIFY
    }
}
