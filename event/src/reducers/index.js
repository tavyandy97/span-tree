import { combineReducers } from "redux";

import count from "./count";
import opened from "./UI/opened";
import pinned from "./UI/pinned";

export default combineReducers({
  count,
  opened,
  pinned
});
