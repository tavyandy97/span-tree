import { SET_CLICKED } from "../../types/UI";

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CLICKED:
      return action.payload;
    default:
      return state;
  }
};
