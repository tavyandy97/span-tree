import { OPTIONS_CHANGED } from "../../types/UI";

const initialState = JSON.parse(localStorage.getItem("spantree-options")) || {};

export default (state = initialState, action) => {
  switch (action.type) {
    case OPTIONS_CHANGED:
      localStorage.setItem("spantree-options", JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
};
