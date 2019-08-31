import { combineReducers} from 'redux'
import Reducer from './authreducer'
import CategoryReducer from './categoryreducer'
import textReducer from './textreducer'

export default combineReducers({
   
    userdata : Reducer,
    categorylist : CategoryReducer,
    filtertext : textReducer

});