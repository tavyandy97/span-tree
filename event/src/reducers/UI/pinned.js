import { TOGGLE_PINNED } from "../../types/UI";

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_PINNED:
      return !state;
    default:
      return state;
  }
};
