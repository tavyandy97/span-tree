import React, { useEffect, cloneElement } from "react";

import "./styles.css";

function TreeItem({ name, isTree, path, close, open, children }) {
  const handleClick = (path, open, close, isTree) => {
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
    <li>
      <div
        className="tree-item"
        onClick={() => handleClick(path, open, close, isTree)}
      >
        {isTree ? (isTree.isOpen ? "⯆" : "⯈") : ""}
        {name}
      </div>
      {isTree && isTree.isOpen && (
        <ul className="child-list">
          {Object.keys(children).map((key) => (
            <TreeItem
              key={key}
              name={children[key].name}
              isTree={children[key].isTree}
              path={children[key].path}
              children={children[key].children}
              open={open}
              close={close}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default TreeItem;
