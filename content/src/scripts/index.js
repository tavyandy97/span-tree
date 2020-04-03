import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";
import thunkMiddleware from "redux-thunk";

import App from "./containers/app/App";

const proxyStore = new Store();
const middleware = [thunkMiddleware];
const storeWithMiddleware = applyMiddleware(proxyStore, ...middleware);

const anchor = document.createElement("div");
anchor.style.zIndex = "600";
anchor.style.top = "40px";
anchor.style.position = "fixed";
anchor.style.left = "0px";
anchor.style.display = "block";
anchor.style.minWidth = "240px";

anchor.id = "rcr-anchor";

document
  .querySelector(".layout-page")
  .insertBefore(anchor, document.querySelector(".layout-page").childNodes[0]);

storeWithMiddleware.ready().then(() => {
  render(
    <Provider store={storeWithMiddleware}>
      <App />
    </Provider>,
    document.getElementById("rcr-anchor")
  );
});

export default storeWithMiddleware;
