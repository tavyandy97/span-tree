import React from "react";

import "./styles.css";

function CheckBox({ name: name, key: key }) {
  return (
    <div
      className="option"
      title="For compatibility with Gitlab versions < 13 which do not support '-' (hyphen) separated URLs "
    >
      <div className="option-text">{name}</div>
      <div className="checkbox ticked">
        <div className="check"></div>
      </div>
    </div>
  );
}

export default CheckBox;
