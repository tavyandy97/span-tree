import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import createIdbStorage from "@piotr-cz/redux-persist-idb-storage";

import opened from "./UI/opened";
import pinned from "./UI/pinned";
import width from "./UI/width";
import clicked from "./UI/clicked";
import options from "./UI/options";
import tree from "./API/tree";
import searchTerms from "./API/searchTerms";

export default combineReducers({
  opened,
  pinned,
  width,
  clicked,
  options: persistReducer(
    {
      key: "root",
      storage: createIdbStorage({
        name: "spantree-options",
        storeName: "spantree-options",
      }),
    },
    options
  ),
  tree,
  searchTerms,
});
