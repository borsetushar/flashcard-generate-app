import { SET_NUMBER_OF_INPUT_SETS } from "../Actions/Constants/createNew";


// Initial state for the flashcards
const initialState = {
    createNewData: [],
  };
  
  // Reducer function
  const inputSetReducer = (state = initialState, action) => {
    switch (action.type) {
      case SET_NUMBER_OF_INPUT_SETS:
        const newFlashcard = {
          ...action.payload,
          numberOfInputSets: action.payload.inputSets.length,
        };
        return {
          ...state,
          createNewData: [...state.createNewData, newFlashcard],
        };
      default:
        return state;
    }
  };
  export default inputSetReducer;