import { ISICATEGORYLIST } from "../actions/types"

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ISICATEGORYLIST:
            return action.payload
        default : 
            return state
    }
}