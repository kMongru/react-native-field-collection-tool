import { ADD_INFORMATION, RESET_CONTENTS } from '../actions/survey';

const initialState = {
  formCompleted: false,
  user: {
    username: '',
  },
  barcode: '',
  crop: '',
  cultivar: 'test',
  controlMethods: 'test',
  hotspotDescription: '',
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
    //will reset everything except the inputformscreen information for usePrevious implementation
    case RESET_CONTENTS:
      const retainedInfo = {
        crop: state.crop,
        cultivar: state.cultivar,
        controlMethods: state.controlMethods,
        hotspotDecription: state.hotspotDecription,
        otherNotes: state.otherNotes,
      };

      return {
        ...initialState,
        ...retainedInfo,
      };

    default:
      return state;
  }
};

export default surveyReducer;
