import  { createStore, applyMiddleware } from "redux";
import { composeWithDeveTools} from "redux-devtools-extension";

import thunk from 'redux-thunk';
import rootReducer from './reducers'


const initialState = {};

const middleware = [thunk];

const sotr = createStore( 
    rootReducer,
     initialState,
      composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;

