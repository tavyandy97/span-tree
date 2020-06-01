export const fetchGitlabOptionVal = (key, defaultVal) => {
  let options = JSON.parse(localStorage.getItem("spantree-options")) || {};
  let returnVal = defaultVal;
  if (key in options) {
    returnVal = options[key];
  } else {
    options[key] = defaultVal;
  }
  localStorage.setItem("spantree-themelist", JSON.stringify(themeList));
  return returnVal;
};

export const setGitlabOptionVal = (key, value) => {
  let options = JSON.parse(localStorage.getItem("spantree-options")) || {};
  options[key] = value;
  localStorage.setItem("spantree-themelist", JSON.stringify(themeList));
};
