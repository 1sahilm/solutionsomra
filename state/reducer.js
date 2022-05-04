import {SEND_DOC_ARRAY} from "./constants"

const initialState = {
    array:[],
}

export const globalReducer = (state = initialState , action) => {

    switch(action.type){

        case SEND_DOC_ARRAY:
            return{
                ...state,
                array: action.payload,
            }

        default:
            return state
    }

}