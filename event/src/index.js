import thunk from "redux-thunk";
import { createStore } from "redux";
import { TabIdentifier } from "chrome-tab-identifier";
import rootReducer from "./reducers";

const tabIdentifier = new TabIdentifier();

import { wrapStore, applyMiddleware } from "webext-redux";

const store = createStore(rootReducer, {});

wrapStore(applyMiddleware(store, thunk));
