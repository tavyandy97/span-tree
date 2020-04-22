export const fetchURLDetails = () => {
  const pathName = window.location.pathname;
  const pathNameSplit = pathName
    .split("/")
    .filter((pathSub) => pathSub.length !== 0);
  let dir = [];
  let branchName = document.querySelector(".dropdown-toggle-text")
    ? document.querySelector(".dropdown-toggle-text").innerText
    : "master";
  for (let i = 0; i < pathNameSplit.length; i++) {
    if (pathNameSplit[i] === "-") {
      break;
    }
    dir.push(pathNameSplit[i]);
  }
  const dirFormatted = dir.join("/");
  const urlBaseRemoved = () => {
    let baseRemovedUrl = pathName.substring(dirFormatted.length + 2);
    if (baseRemovedUrl.length != 0) {
      baseRemovedUrl = baseRemovedUrl.substring(branchName.length + 8);
    }
    return baseRemovedUrl;
  };

  return {
    dir,
    dirFormatted: dirFormatted,
    dirURLParam: dir.join("%2F"),
    branchName,
    branchNameURL: branchName.split("/").join("%2F"),
    isRepo: !(dir[0] === "dashboard" || dir[0] === "explore"),
    urlBaseRemoved: urlBaseRemoved(),
  };
};
