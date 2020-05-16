export const fetchURLDetails = () => {
  const pathName = window.location.pathname;
  const pathNameSplit = pathName
    .split("/")
    .filter((pathSub) => pathSub.length !== 0);
  let dir = [];
  let branchName = document.querySelector(".dropdown-toggle-text")
    ? document.querySelector(".dropdown-toggle-text").innerText
    : "master";
  let branchNameSplit = branchName
    .split("/")
    .filter((pathSub) => pathSub.length !== 0);
  let branchFound = false;
  let treeOrBlobOrHyphenFound = false;
  let baseRemovedURLItems = [];
  for (let i = 0; i < pathNameSplit.length; i++) {
    if (treeOrBlobOrHyphenFound) {
      if (!branchFound) {
        i += branchNameSplit.length;
        branchFound = true;
      }
      baseRemovedURLItems.push(pathNameSplit[i]);
    } else {
      if (pathNameSplit[i] === "-") {
        treeOrBlobOrHyphenFound = true;
        i++;
      } else if (pathNameSplit[i] === "blob" || pathNameSplit[i] === "tree") {
        treeOrBlobOrHyphenFound = true;
      } else {
        dir.push(pathNameSplit[i]);
      }
    }
  }
  const dirFormatted = dir.join("/");
  const baseRemovedURL = baseRemovedURLItems.join("/");

  return {
    dir,
    dirFormatted: dirFormatted,
    dirURLParam: encodeURIComponent(dir.join("/")),
    branchName,
    branchNameURL: encodeURIComponent(branchName),
    baseRemovedURL: baseRemovedURL,
  };
};
