export const fetchURLDetails = () => {
  const pathName = window.location.pathname;
  const pathNameSplit = pathName
    .split("/")
    .filter((pathSub) => pathSub.length !== 0);
  let dir = [];
  let branchName = document.querySelector(".dropdown-toggle-text")
    ? document.querySelector(".dropdown-toggle-text").innerText
    : "master";
  let isTreeVisible = true;
  for (let i = 0; i < pathNameSplit.length; i++) {
    if (pathNameSplit[i] === "-") {
      if (
        !(pathNameSplit[i + 1] === "tree" || pathNameSplit[i + 1] === "blob")
      ) {
        isTreeVisible = false;
      }
      break;
    }
    if (pathNameSplit[i] === "blob" || pathNameSplit[i] === "tree") {
      break;
    }
    dir.push(pathNameSplit[i]);
  }

  return {
    dir,
    dirFormatted: dir.join("/"),
    dirURLParam: dir.join("%2F"),
    branchName,
    branchNameURL: branchName.split("/").join("%2F"),
    isRepo: !(dir[0] === "dashboard" || dir[0] === "explore"),
    isTreeVisible,
  };
};
