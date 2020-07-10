import thunk from "redux-thunk";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { TabIdentifier } from "chrome-tab-identifier";

const tabIdentifier = new TabIdentifier();

import { wrapStore, applyMiddleware } from "webext-redux";

const store = createStore(rootReducer, {});

wrapStore(applyMiddleware(store, thunk));
