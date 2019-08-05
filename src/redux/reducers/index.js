import { combineReducers} from 'redux'
import Reducer from './authreducer'
import CategoryReducer from './categoryreducer'

export default combineReducers({
   
    userdata : Reducer,
    categorylist : CategoryReducer
});