import * as types from "../../types/API";
import store from "../../../../content/src/scripts";
import axios from "../../../axios";

export const getInitialTree = id => {
  // TODO ref - get branch
  let url = `${id}/repository/tree`;
  url += "?per_page=10000";
  axios
    .get(url)
    .then(res => {
      store.dispatch({
        type: types.FETCH_TREE,
        payload: res.data
      });
    })
    .catch(err => {});
};
