import React from "react";

import "./styles.css";

function TreeItem({ name, isTree }) {
  return (
    <li>
      <div className="tree-item">
        {isTree ? (isTree.isOpen ? "⯆" : "⯈") : ""}
        {name}
      </div>
    </li>
  );
}

export default TreeItem;
