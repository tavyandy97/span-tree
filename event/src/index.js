import thunk from "redux-thunk";
import { createStore } from "redux";
import rootReducer from "./reducers";

import { wrapStore, applyMiddleware } from "webext-redux";

const store = createStore(rootReducer, {});

wrapStore(applyMiddleware(store, thunk));
