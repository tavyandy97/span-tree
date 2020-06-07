// contentDark.js
// As the main content.js is loaded on "document_idle", the dark theme needs to be loaded at the very beginning of
// tab load to prevent a common phenomenon found in Chrome themes known as white flash. So this contentDark.js is
// loaded on "document_start" and adds the darkGitlab.css to the <html> before the page starts loading.
// Note: This file is not processed by webpack but is copied by gulp to the build/libs folder as is.

// themeList.js
const isPresentInThemeList = () => {
  const domain = location.origin;
  let themeList = JSON.parse(localStorage.getItem("spantree-themelist")) || {};

  return domain in themeList && themeList[domain];
};

// browser.js
const isWindowObject = (value) => {
  return value != null && typeof value === "object" && "setInterval" in value;
};
const freeSelf = isWindowObject(typeof self == "object" && self) && self;
const navigator = freeSelf && freeSelf.navigator;
const userAgent = ((navigator && navigator.userAgent) || "").toLowerCase();
const vendor = ((navigator && navigator.vendor) || "").toLowerCase();
const browserKey = () => {
  if (isChrome()) return "chrome";
  if (isFirefox()) return "moz";
  return "chrome";
};
const isChrome = () => {
  const match = /google inc/.test(vendor)
    ? userAgent.match(/(?:chrome|crios)\/(\d+)/)
    : null;
  return match !== null && !isOpera();
};
const isFirefox = () => {
  const match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
  return match !== null;
};
const isOpera = () => {
  const match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
  return match !== null;
};

function fireContentLoadedEvent() {
  // Remove event listener
  document.removeEventListener("DOMContentLoaded", fireContentLoadedEvent);

  // Insert CSS into Head
  const darkGitlab = document.createElement("link");
  darkGitlab.id = "spantree-theme";
  darkGitlab.disabled = !isPresentInThemeList();
  darkGitlab.rel = "stylesheet";
  darkGitlab.type = "text/css";
  darkGitlab.href = `${browserKey()}-extension://${chrome.i18n.getMessage(
    "@@extension_id"
  )}/libs/gitlab-dark.css`;
  document.querySelector("head").appendChild(darkGitlab);

  // Remove CSS from HTML
  document.body.onload = () => {
    document.querySelector("#spantree-theme-temp").remove();
  };
}

// Insert CSS into HTML
if (isPresentInThemeList()) {
  const darkGitlabTemp = document.createElement("link");
  darkGitlabTemp.id = "spantree-theme-temp";
  darkGitlabTemp.disabled = !isPresentInThemeList();
  darkGitlabTemp.rel = "stylesheet";
  darkGitlabTemp.type = "text/css";
  darkGitlabTemp.href = `${browserKey()}-extension://${chrome.i18n.getMessage(
    "@@extension_id"
  )}/libs/gitlab-dark.css`;
  document
    .querySelector("html")
    .insertBefore(darkGitlabTemp, document.querySelector("html").childNodes[0]);
  document.addEventListener("DOMContentLoaded", fireContentLoadedEvent, false);
}
