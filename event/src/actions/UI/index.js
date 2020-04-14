import * as types from "../../types/UI";
import store from "../../../../content/src/scripts";

export const togglePinned = () => {
  store.dispatch({
    type: types.TOGGLE_PINNED,
  });
};

export const toggleOpened = () => {
  store.dispatch({
    type: types.TOGGLE_OPENED,
  });
};

export const closeDir = (path, reducerDetails) => {
  store.dispatch({
    type: types.CLOSE_DIR,
    payload: path,
    reducerDetails,
  });
};
