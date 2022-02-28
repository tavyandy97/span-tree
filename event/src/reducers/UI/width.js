import { SET_WIDTH } from "../../types/UI";

const initialWidth = 300;

export default (state = initialWidth, action) => {
  switch (action.type) {
    case SET_WIDTH:
      return action.payload;
    default:
      return state;
  }
};
