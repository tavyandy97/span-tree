import React from "react";

import "./styles.css";

function Backdrop({ showSearchbar, setShowSearchbar }) {
  return showSearchbar ? (
    <div
      className="spantree-backdrop"
      onClick={() => setShowSearchbar(false)}
    ></div>
  ) : null;
}

export default Backdrop;
