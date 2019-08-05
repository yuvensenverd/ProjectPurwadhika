const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'ISI_CATEGORY_LIST':
            return action.payload
        default : 
            return state
    }
}