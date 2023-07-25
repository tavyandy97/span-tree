import axios from "axios";

const siteURL = window.location.origin + (
  document.head.innerHTML.match(/;gon.relative_url_root="(\/\w+?)";/)?.[1]
  ?? ''
);
// console.log('---spantree:', siteURL);

const options = {
  baseURL: `${siteURL}/api/v4/projects/`,
};

const inst = axios.create(options);

export default inst;
