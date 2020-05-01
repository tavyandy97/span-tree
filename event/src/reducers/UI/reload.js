import { RELOAD_PAGE } from "../../types/UI";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case RELOAD_PAGE:
      const document = action.payload;
      document.querySelector("html").outerHTML;
      document.open();
      document.write(ht);
      document.close();

      chrome.runtime.reload();
      chrome.tabs.query({ url: "https://gitlab.com/*/*" }, (tabs) => {
        for (let i = 0; i < tabs.length; i++) {
          chrome.tabs.executeScript(
            tabs[i].id,
            { file: "content.js" },
            () => {}
          );
        }
      });
      return state;
    default:
      return state;
  }
};
