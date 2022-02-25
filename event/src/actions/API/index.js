import axiosOriginal from "axios";

import * as types from "../../types/API";
import store from "../../../../content/src/scripts";
import axios from "../../../axios";

export const isRepositoryShown = () => {
  return document.querySelector(".qa-branches-select") !== null;
};
export const isMergeRequestShown = () => {
  return document.querySelector(".diffs-tab") !== null;
};

export const grabMergeRequestIdFromCurrentUrl = () => {
  const pathName = window.location.pathname;
  const mergeRequest = '/merge_requests/';
  let start = pathName.indexOf(mergeRequest);
  if (start == -1) {
    return null;
  }
  let path = pathName.substring(start + mergeRequest.length);
  if (path.includes('/')) {
    return path.substring(0, path.indexOf('/'));
  }
  return path;
};

export const getUrl = (id) => {
  if (isRepositoryShown()) {
    return `${id}/repository/tree?per_page=10000`;
  } else if (isMergeRequestShown()) {
    let mergeRequestId = grabMergeRequestIdFromCurrentUrl();
    return `${id}/merge_requests/${mergeRequestId}/changes?access_raw_diffs=false`;
  }
};

export const getInitialTree = (id, params, reducerDetails, filters) => {
  let url = getUrl(id);
  for (let param in params) {
    url += `&${param}=${params[param]}`;
  }
  axios
    .get(url)
    .then((res) => {
      store.dispatch({
        type: types.FETCH_TREE,
        dataUrl: res.request.responseURL,
        payload: res.data,
        reducerDetails,
        filters: filters
      });
    })
    .catch((_err) => { });
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
    .catch((_err) => { });
};

export const closeDir = (path, reducerDetails) => {
  store.dispatch({
    type: types.CLOSE_DIR,
    payload: path,
    reducerDetails,
  });
};

export const getSearchTerms = (reducerDetails) => {
  let url = `${window.location.origin}/${reducerDetails.repoName}/`;
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
    .catch((_err) => { });
};
