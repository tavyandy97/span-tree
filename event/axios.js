import axios from "axios";

const base_url = window.location.origin + (
  document.head.innerHTML.match(/;gon.relative_url_root="(\/\w+?)";/)?.[1]
  ?? ''
);
// console.log('---spantree:', base_url);

const options = {
  baseURL: `${base_url}/api/v4/projects/`,
};

const inst = axios.create(options);

export default inst;
