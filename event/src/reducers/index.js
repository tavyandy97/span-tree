import { combineReducers } from "redux";

import count from "./count";
import opened from "./UI/opened";
import pinned from "./UI/pinned";
import tree from "./API/tree";
import width from "./UI/width";
import reload from "./UI/reload";

export default combineReducers({
  count,
  opened,
  pinned,
  tree,
  width,
  reload,
});
