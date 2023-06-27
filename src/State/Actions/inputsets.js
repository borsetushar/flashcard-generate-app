import { SET_NUMBER_OF_INPUT_SETS } from "./Constants/createNew";


const setNumberOfInputSets = (count) => ({
    type: SET_NUMBER_OF_INPUT_SETS,
    payload: count,
  });

  export {setNumberOfInputSets}