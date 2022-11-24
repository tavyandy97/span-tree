import { OPTIONS_CHANGED } from "../../types/UI";

export default (state = {}, action) => {
  switch (action.type) {
    case OPTIONS_CHANGED:
      return action.payload;
    default:
      return state;
  }
};
