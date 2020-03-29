import axios from "axios";
import store from "../content/src/scripts";

const options = {
  baseURL: "https://gitlab.com/api/v4/projects/"
};

// if (store.state.authToken) {
//   options.headers = {
//     "PRIVATE-TOKEN": store.state.authToken
//   };
// }

const inst = axios.create(options);

export default inst;
