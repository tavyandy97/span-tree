import React, { useEffect, cloneElement } from "react";

import "./styles.css";

const importFileIconCSS = `chrome-extension://${chrome.runtime.id}/libs/file-icon.css`;
import fileIcons from "../../utils/file-icons";

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
      <link rel="stylesheet" type="text/css" href={importFileIconCSS} />
      <div
        className="tree-element"
        onClick={() => handleClick(path, open, close, isTree)}
      >
        <div className="full-width-row"></div>
        <div className="tree-icon">
          {isTree ? (
            isTree.isOpen ? (
              <i className="arrow arrow-down" />
            ) : (
              <i className="arrow arrow-right" />
            )
          ) : (
            " "
          )}
        </div>
        <div className="file-icon">
          <i className={fileIcons.getClassWithColor(name, isTree)}></i>
        </div>
        <div className="item-name">{name}</div>
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
