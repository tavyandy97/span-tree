import * as types from "../../types/UI";

export const togglePinned = () => {
  return dispatch => {
    dispatch({
      type: types.TOGGLE_PINNED
    });
  };
};

export const toggleOpened = () => {
  return {
    type: types.TOGGLE_OPENED
  };
  // return dispatch => {
  //   console.log("reached dispatch");
  //   return dispatch({
  //     type: types.TOGGLE_OPENED
  //   });
  // };
};
