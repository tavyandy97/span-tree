import React from "react";

import "./styles.css";

function CompatibilityMode() {
  return (
    <div
      className="option"
      title="For compatibility with Gitlab versions < 13 which do not support '-' (hyphen) separated URLs "
    >
      <div className="option-text">Compatibility Mode</div>
      <div className="checkbox un-ticked">
        <div className="check"></div>
      </div>
    </div>
  );
}

export default CompatibilityMode;
