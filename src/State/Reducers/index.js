import { combineReducers } from 'redux'
import createNewReducer from "./createNewReducer";
import inputSetReducer from './noOfInputSetsReducer';

const rootReducer = combineReducers({
   createNew : createNewReducer,
   inputSets : inputSetReducer,
})

export default rootReducer;