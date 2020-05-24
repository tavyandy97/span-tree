export const addDomainToThemeList = () => {
  const domain = location.origin;
  let themeList = localStorage.getItem("spantree-themelist");
  if(themeList == null){
    themeList = [];
  }else{
    themeList = themeList.split(",");
  }
  themeList.push(domain);
  localStorage.setItem("spantree-themelist", themeList.toString());
};

export const isPresentInThemeList = () => {
  const domain = location.origin;
  let themeList = localStorage.getItem("spantree-themelist");
  if(themeList == null){
    themeList = [];
  }else{
    themeList = themeList.split(",");
  }
  return themeList.includes(domain);
};

export const switchTheme = () => {
  const domain = location.origin;
  let themeList = localStorage.getItem("spantree-themelist");
  if(themeList == null){
    themeList = [];
  }else{
    themeList = themeList.split(",");
  }
  const indexOfDomain = themeList.indexOf(domain);
  let themeCSS = document.querySelector("#spantree-theme");
  if (indexOfDomain > -1) {
    themeList.splice(indexOfDomain, 1);
    document.querySelector("#spantree-theme").disabled = true;
  }else{
    themeList.push(domain);
    document.querySelector("#spantree-theme").disabled = false;
  }
  localStorage.setItem("spantree-themelist", themeList.toString());
};