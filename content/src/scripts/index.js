import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store } from "webext-redux";

import App from "./containers/app/App";

const proxyStore = new Store();

const anchor = document.createElement("div");
anchor.id = "rcr-anchor";

if (document.querySelector(".layout-page") !== null) {
  document
    .querySelector(".layout-page")
    .insertBefore(anchor, document.querySelector(".layout-page").childNodes[0]);
  proxyStore.ready().then(() => {
    render(
      <Provider store={proxyStore}>
        <App />
      </Provider>,
      document.getElementById("rcr-anchor")
    );
  });
}

export default proxyStore;
