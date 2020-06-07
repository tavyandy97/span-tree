import { combineReducers } from "redux";

import opened from "./UI/opened";
import pinned from "./UI/pinned";
import tree from "./API/tree";
import width from "./UI/width";
import clicked from "./UI/clicked";
import options from "./UI/options";

export default combineReducers({
  opened,
  pinned,
  tree,
  width,
  clicked,
  options,
});
