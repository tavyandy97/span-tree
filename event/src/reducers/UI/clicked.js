import { SET_CLICKED } from "../../types/UI";

const initialClicked = false;

export default (state = initialClicked, action) => {
  switch (action.type) {
    case SET_CLICKED:
      return action.payload;
    default:
      return state;
  }
};
