import { combineReducers } from "redux";

import count from "./count";
import opened from "./opened";
import opened from "./pinned";

export default combineReducers({
  count,
  opened,
  pinned
});
