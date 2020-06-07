import { browserKey } from "./browser";

export const switchTheme = () => {
  const domain = location.origin;
  let themeList = JSON.parse(localStorage.getItem("spantree-themelist")) || {};

  if (domain in themeList) {
    const alteredValue = !themeList[domain];
    themeList[domain] = alteredValue;
    if (document.getElementById("spantree-theme") === null) {
      insertCSS(!alteredValue);
    } else {
      document.getElementById("spantree-theme").disabled = !alteredValue;
    }
  } else {
    themeList[domain] = true;
    if (document.getElementById("spantree-theme") === null) {
      insertCSS(false);
    } else {
      document.getElementById("spantree-theme").disabled = false;
    }
  }

  localStorage.setItem("spantree-themelist", JSON.stringify(themeList));
};

const insertCSS = (isDisabled) => {
  // Insert CSS into Head
  const darkGitlab = document.createElement("link");
  darkGitlab.id = "spantree-theme";
  darkGitlab.disabled = isDisabled;
  darkGitlab.rel = "stylesheet";
  darkGitlab.type = "text/css";
  darkGitlab.href = `${browserKey()}-extension://${chrome.i18n.getMessage(
    "@@extension_id"
  )}/libs/gitlab-dark.css`;
  document.querySelector("head").appendChild(darkGitlab);
};
