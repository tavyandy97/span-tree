import * as types from "../../types/API";
import store from "../../../../content/src/scripts";
import axios from "../../../axios";

export const getInitialTree = (id, params, reducerDetails) => {
  // TODO ref - get branch
  let url = `${id}/repository/tree`;
  url += "?per_page=10000";
  for (let param in params) {
    url += `&${param}=${params[param]}`;
  }
  axios
    .get(url)
    .then((res) => {
      store.dispatch({
        type: types.FETCH_TREE,
        payload: res.data,
        reducerDetails,
      });
    })
    .catch((err) => {});
};
