import axiosOriginal from "axios";

import { fetchURLDetails } from "../../../../content/src/scripts/utils/url";
import * as types from "../../types/API";
import store from "../../../../content/src/scripts";
import axios from "../../../axios";

const baseUrl = fetchURLDetails().baseURL || window.location.origin;

export const getInitialTree = (id, params, reducerDetails) => {
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
    .catch((_err) => {});
};

export const openDir = (id, path, params, reducerDetails) => {
  store.dispatch({
    type: types.OPEN_DIR,
    payload: path,
    reducerDetails,
  });
  let url = `${id}/repository/tree`;
  url += "?per_page=10000";
  for (let param in params) {
    url += `&${param}=${params[param]}`;
  }
  axios
    .get(url)
    .then((res) => {
      store.dispatch({
        type: types.UPDATE_TREE,
        payload: res.data,
        reducerDetails,
      });
    })
    .catch((_err) => {});
};

export const closeDir = (path, reducerDetails) => {
  store.dispatch({
    type: types.CLOSE_DIR,
    payload: path,
    reducerDetails,
  });
};

export const getSearchTerms = (reducerDetails) => {
  let url = `${baseUrl}${reducerDetails.repoName}/`;
  if (!reducerDetails.compatibilityMode) {
    url += "-/";
  }
  url += `files/${reducerDetails.branchName}?format=json`;

  axiosOriginal
    .get(url)
    .then((res) => {
      store.dispatch({
        type: types.FETCH_SEARCH_TERMS,
        payload: res.data,
        reducerDetails,
      });
    })
    .catch((_err) => {});
};
