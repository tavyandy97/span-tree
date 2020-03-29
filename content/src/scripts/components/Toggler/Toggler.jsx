import React from "react";

import "./styles.css";

function Toggle({ pinned, handleClick }) {
  return (
    <div className="spantree-toggler" onClick={handleClick}>
      SpanTree ▼
    </div>
  );
}

export default Toggle;
