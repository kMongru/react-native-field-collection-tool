import { ADD_INFORMATION, RESET_CONTENTS } from '../actions/survey';

const initialState = {
  formCompleted: false,
  user: {
    username: '',
  },
  barcode: '',
  crop: '',
  cultivar: '',
  controlMethods: '',
  hotspotDecription: '',
  otherNotes: '',
  images: [],
  latitude: '',
  longitude: '',
  dateAndTime: '',
};

const surveyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INFORMATION:
      const contents = action.information;

      return {
        ...state,
        ...contents,
      };
    case RESET_CONTENTS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default surveyReducer;
