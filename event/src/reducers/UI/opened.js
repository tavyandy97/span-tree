import { TOGGLE_OPENED } from "../../types/UI";

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_OPENED:
      return !state;
    default:
      return state;
  }
};
