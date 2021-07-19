export const ADD_INFORMATION = 'ADD_INFORMATION';
export const RESET_CONTENTS = 'RESET_CONTENTS';

export const addInformation = (information) => {
  return { type: ADD_INFORMATION, information: information };
};

export const resetContents = () => {
  return { type: RESET_CONTENTS };
};
