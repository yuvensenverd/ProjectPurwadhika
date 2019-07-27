import { combineReducers} from 'redux'
import Reducer from './authreducer'

export default combineReducers({
   
    userdata : Reducer
});