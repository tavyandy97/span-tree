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

export const setWidth = (width) => {
  store.dispatch({
    type: types.SET_WIDTH,
    payload: width,
  });
};

export const reloadPage = (document) => {
  store.dispatch({
    type: types.RELOAD_PAGE,
    payload: document,
  });
};
