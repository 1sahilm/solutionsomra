import * as actionTypes from "./constants"

export const sendArray = (array) =>  async (dispatch) =>{
    console.log({array})
    dispatch({type:actionTypes.SEND_DOC_ARRAY, payload:array})
}

