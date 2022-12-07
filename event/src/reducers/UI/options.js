import { OPTIONS_CHANGED } from "../../types/UI";

export default (
  state = {
    data: {},
    version: 0,
  },
  action
) => {
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
