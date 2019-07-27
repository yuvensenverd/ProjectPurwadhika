import { LOGIN, LOGOUT } from './types'

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