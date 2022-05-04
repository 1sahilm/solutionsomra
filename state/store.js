import {createStore, combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { globalReducer } from "./reducer";

const rootReducers =combineReducers({
    whatsapp: globalReducer
})

const middleware = [thunk]

export const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware)),
)



