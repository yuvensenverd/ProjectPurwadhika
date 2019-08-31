import { ON_CHANGE_FILTER } from "./types";


export const onChangeFilter = (text) =>{
  
    return{
        type : ON_CHANGE_FILTER,
        payload : text
    }
}