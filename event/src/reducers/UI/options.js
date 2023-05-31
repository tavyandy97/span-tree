import { OPTIONS_CHANGED } from "../../types/UI";

export const intitialState = {
  data: {},
  version: 0,
};

export default (state = intitialState, action) => {
  switch (action.type) {
    case OPTIONS_CHANGED: {
      const newData = {
        data: action.payload,
        version: !isNaN(state.version) ? state.version + 1 : 0,
      };
      return newData;
    }
    default:
      return state;
  }
};
