import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";

import { wrapStore } from "webext-redux";

const store = createStore(rootReducer, applyMiddleware(thunk));

wrapStore(store);
