export const MULTIPLE_CHOICE_SELECTION = 'MULTIPLE_CHOICE_SELECTION';

export const selectOption = (identifier, validity) => {
  return {
    type: MULTIPLE_CHOICE_SELECTION,
    input: identifier,
    isValid: validity,
  };
};
