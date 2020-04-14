import React from "react";

import "./styles.css";

function TreeItem({ name, isTree, path, close }) {
  return (
    <li onClick={() => close(path)}>
      <div className="tree-item">
        {isTree ? (isTree.isOpen ? "⯆" : "⯈") : ""}
        {name}
      </div>
    </li>
  );
}

export default TreeItem;
