import * as types from "../../types/UI";
import store from "../../../../content/src/scripts";

export const togglePinned = () => {
  store.dispatch({
    type: types.TOGGLE_PINNED
  });
};

export const toggleOpened = () => {
  store.dispatch({
    type: types.TOGGLE_OPENED
  });
};
