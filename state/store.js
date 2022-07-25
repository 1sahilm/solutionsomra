import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { globalReducer } from './reducer';

const rootReducers =combineReducers({
    whatsapp: globalReducer
})

const middleware = [thunk]

export const store = createStore(
    rootReducers,
    composeWithDevTools(applyMiddleware(...middleware)),
)



