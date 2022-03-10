import axios from "axios";

import { fetchURLDetails } from "../content/src/scripts/utils/url";

const baseUrl = fetchURLDetails().baseURL || window.location.origin;

const options = {
  baseURL: `${baseUrl}api/v4/projects/`,
};

const inst = axios.create(options);

export default inst;
