import axios from "axios";

import { applyOpenedPageStyling } from "./styling";
import { fetchURLDetails } from "./url";

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length != b.length) return false;

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

function loadPageContent(path, URLDetails) {
  let ht = document.querySelector("html").outerHTML;
  document.open();
  document.write(ht);
  document.close();
  console.log(chrome);
}

function loadPageContentX(path, URLDetails) {
  const URL = `https://www.gitlab.com/${URLDetails.dirFormatted}/blob/${
    URLDetails.branchName
  }/${path.join("/")}?format=json&viewer=simple`;
  axios
    .get(URL, {
      headers: {
        ["x-requested-with"]: "XMLHttpRequest",
        ["accept"]: "application/json, text/javascript, */*; q=0.01",
      },
    })
    .then((res) => {
      const blobViews = document.querySelectorAll(".blob-viewer");
      blobViews[blobViews.length - 1].innerHTML = res.data.html;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const refreshPage = (path, width, setRendering) => {
  const URLDetails = fetchURLDetails();
  const URL = `https://www.gitlab.com/${URLDetails.dirFormatted}/blob/${
    URLDetails.branchName
  }/${path.join("/")}`;
  history.pushState(
    URL,
    "",
    `/${URLDetails.dirFormatted}/blob/${URLDetails.branchName}/${path.join(
      "/"
    )}`
  );
  setRendering(true);
  axios
    .get(URL)
    .then((res) => {
      let el = document.createElement("html");
      el.innerHTML = res.data;
      document.title = el.getElementsByTagName("title")[0].innerHTML;
      console.log(el);
      console.log(document.body);
      const anchor = document.createElement("div");
      anchor.id = "rcr-anchor";
      anchor.innerHTML = document.getElementById("rcr-anchor").innerHTML;
      el.querySelector(".layout-page").insertBefore(
        anchor,
        el.querySelector(".layout-page").childNodes[0]
      );

      for (let i = 0; i < el.querySelector("body").children.length; i++) {
        for (
          let j = 0;
          j < document.querySelector("body").children.length;
          j++
        ) {
          if (
            el.querySelector("body").children[i].tagName ===
              document.querySelector("body").children[j].tagName &&
            arraysEqual(
              el.querySelector("body").children[i].classList,
              document.querySelector("body").children[j].classList
            )
          ) {
            document.querySelector("body").children[
              j
            ].innerHTML = el.querySelector("body").children[i].innerHTML;
          }
        }
      }
      applyOpenedPageStyling(width);
      loadPageContent(path, URLDetails, width);
    })
    .catch((err) => {
      console.log(err);
    });
};
