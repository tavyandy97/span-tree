import { FETCH_TREE } from "../../types/API";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TREE:
      return [state, ...action.payload];
    default:
      return state;
  }
};
