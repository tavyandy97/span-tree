import React, { useEffect, cloneElement } from "react";

import "./styles.css";

function TreeItem({ name, isTree, path, close, open }) {
  const handleClick = (path, open, close, isTree) => {
    console.log(isTree);
    if (isTree) {
      if (isTree.isOpen) {
        close(path);
      } else {
        open(path);
      }
    } else {
    }
  };

  return (
    <li onClick={() => handleClick(path, open, close, isTree)}>
      <div className="tree-item">
        {isTree ? (isTree.isOpen ? "⯆" : "⯈") : ""}
        {name}
      </div>
    </li>
  );
}

export default TreeItem;
