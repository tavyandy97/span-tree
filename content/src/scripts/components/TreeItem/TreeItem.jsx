import React from "react";

import "./styles.css";

function TreeItem({ name, isTree }) {
  return (
    <li>
      <div className="tree-item">
        {isTree ? "[]" : ""}
        {name}
      </div>
    </li>
  );
}

export default TreeItem;
