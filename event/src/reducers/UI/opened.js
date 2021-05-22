import { TOGGLE_OPENED } from "../../types/UI";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OPENED:
      return {
        ...state,
        [action.reducerDetails.tabId]:
          action.reducerDetails.tabId in state
            ? !state[action.reducerDetails.tabId]
            : false,
      };
    default:
      return state;
  }
};
