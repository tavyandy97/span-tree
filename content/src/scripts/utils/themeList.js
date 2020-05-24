export const isPresentInThemeList = () => {
  const domain = location.origin;
  let themeList = JSON.parse(localStorage.getItem("spantree-themelist")) || {};

  return domain in themeList && themeList[domain];
};

export const switchTheme = () => {
  const domain = location.origin;
  let themeList = JSON.parse(localStorage.getItem("spantree-themelist")) || {};

  if (domain in themeList) {
    const alteredValue = !themeList[domain];
    themeList[domain] = alteredValue;
    document.querySelector("#spantree-theme").disabled = !alteredValue;
  } else {
    themeList[domain] = true;
    document.querySelector("#spantree-theme").disabled = false;
  }

  localStorage.setItem("spantree-themelist", JSON.stringify(themeList));
};
