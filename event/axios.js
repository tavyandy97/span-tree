import axios from "axios";

const options = {
  baseURL: `${window.location.origin}/api/v4/projects/`,
};

const inst = axios.create(options);

export default inst;
