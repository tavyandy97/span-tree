import { FETCH_SEARCH_TERMS } from "../../types/API";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_TERMS:
      return {
        ...state,
        [action.reducerDetails.repoName]: {
          ...state[action.reducerDetails.repoName],
          [action.reducerDetails.branchName]: action.payload,
        },
      };
    default:
      return state;
  }
};
