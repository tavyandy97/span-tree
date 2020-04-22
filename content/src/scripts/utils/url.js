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
  const baseRemovedURL = () => {
    let remainingUrl = pathName.substring(dirFormatted.length + 2);
    if (remainingUrl.length != 0) {
      remainingUrl = remainingUrl.substring(branchName.length + 8);
    }
    return remainingUrl;
  };

  return {
    dir,
    dirFormatted: dirFormatted,
    dirURLParam: dir.join("%2F"),
    branchName,
    branchNameURL: branchName.split("/").join("%2F"),
    isRepo: !(dir[0] === "dashboard" || dir[0] === "explore"),
    baseRemovedURL: baseRemovedURL(),
  };
};
