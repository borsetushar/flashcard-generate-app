import { CREATE_NEW } from "../Actions/Constants/createNew";

const INITIAL_STATE = [];

const createNewReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_NEW:
      const card = {
        ...action.payload,
        numberOfInputSets: action.payload.inputSets.length,
      };
      return [...state, card];
    default:
      return state;
  }
};

export default createNewReducer;
