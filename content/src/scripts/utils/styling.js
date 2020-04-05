export const applyOpenedPageStyling = () => {
  document.querySelector("header").style.left = paneWidth();
  document.querySelector(".nav-sidebar").style.left = paneWidth();
  document.querySelector("body").style.marginLeft = paneWidth();
};

export const applyClosedPageStyling = () => {
  document.querySelector("header").style.left = "0";
  document.querySelector(".nav-sidebar").style.left = "0";
  document.querySelector("body").style.marginLeft = "0";
};

export const paneWidth = () => {
  return "180px";
};
