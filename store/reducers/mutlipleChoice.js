import { MULTIPLE_CHOICE_SELECTION } from '../actions/multipleChoice';

//inital state of multiple choice redux store
const initalState = {
  selectedChoice: null,
  validities: {
    soybeans: false,
    dryBeans: false,
    tomato: false,
    other: false,
  },
  formIsValid: false,
};

const multipleChoiceReducer = (state = initalState, action) => {
  switch (action.type) {
    case MULTIPLE_CHOICE_SELECTION:
      //declaring varibles
      let currentSelection = state.selectedChoice;
      let updatedValidities = {
        ...state,
        [action.input]: action.isValid,
      };

      //checking if the action is selecting or deselecting a choice
      if (action.isValid === true) {
        //selecting a new option
        currentSelection = action.input;
        //changing all other states to false
        for (const key in updatedValidities) {
          if (key !== action.input) {
            updatedValidities = {
              ...state,
              [key]: false,
            };
          }
        }
      } else {
        //deselecting an option
        currentSelection = null;
      }

      let updatedFormIsValid = false;

      //valid if one valitity is true
      for (const key in updatedValidities) {
        updatedFormIsValid = updatedFormIsValid || updatedValidities[key];
      }

      return {
        selectedChoice: currentSelection,
        validities: updatedValidities,
        formIsValid: updatedFormIsValid,
      };

    default:
      return state;
  }
};

export default multipleChoiceReducer;
