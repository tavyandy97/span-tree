export const fetchURLDetails = () => {
  const pathName = window.location.pathname;
  const pathNameSplit = pathName
    .split("/")
    .filter((pathSub) => pathSub.length !== 0);
  let dir = [];
  let branchName = "master";
  if (document.querySelector(".dropdown-toggle-text"))
    branchName = document.querySelector(".dropdown-toggle-text").innerText;
  if (document.querySelector(".ref-selector"))
    branchName = document.querySelector(".ref-selector").innerText;
  let branchNameSplit = branchName
    .split("/")
    .filter((pathSub) => pathSub.length !== 0);
  let branchFound = false;
  let findingBranch = false;
  let baseRemovedURLItems = [];
  for (let i = 0; i < pathNameSplit.length; i++) {
    if (findingBranch) {
      if (!branchFound) {
        i += branchNameSplit.length;
        branchFound = true;
      }
      baseRemovedURLItems.push(pathNameSplit[i]);
    } else {
      if (pathNameSplit[i] === "-") {
        i++;
        findingBranch = true;
      } else if (
        pathNameSplit[i] === "blob" ||
        pathNameSplit[i] === "tree" ||
        pathNameSplit[i] === "blame" ||
        pathNameSplit[i] === "commits" ||
        pathNameSplit[i] === "find_file"
      ) {
        findingBranch = true;
      } else {
        dir.push(pathNameSplit[i]);
      }
    }
  }
  const dirFormatted = dir.join("/");
  const baseRemovedURL = baseRemovedURLItems.join("/");

  const projectId = document.body.getAttribute("data-project-id");

  return {
    dir,
    dirFormatted: dirFormatted,
    dirURLParam: encodeURIComponent(dir.join("/")),
    branchName,
    branchNameURL: encodeURIComponent(branchName),
    baseRemovedURL: baseRemovedURL,
    projectId,
  };
};
