import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Store, applyMiddleware } from "webext-redux";
import { browserKey } from "./utils/browser";
import thunkMiddleware from "redux-thunk";
import App from "./containers/app/App";
import { isPresentInThemeList, switchTheme } from "./utils/themeList";

const proxyStore = new Store();
const middleware = [thunkMiddleware];
const storeWithMiddleware = applyMiddleware(proxyStore, ...middleware);

const darkGitlab = document.createElement("link");
darkGitlab.id = "spantree-theme";
darkGitlab.disabled = !isPresentInThemeList();
darkGitlab.rel = "stylesheet";
darkGitlab.type = "text/css";
darkGitlab.href = `${browserKey()}-extension://${chrome.i18n.getMessage(
  "@@extension_id"
)}/libs/gitlab-dark.css`;
document
  .querySelector("body")
  .insertBefore(darkGitlab, document.querySelector("body").childNodes[0]);
setTimeout(function () {
  switchTheme();
}, 10000);

const anchor = document.createElement("div");
anchor.id = "rcr-anchor";

if (document.querySelector(".layout-page") !== null) {
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
}

export default storeWithMiddleware;
