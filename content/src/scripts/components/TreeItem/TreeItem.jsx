import React from "react";

import { fetchURLDetails } from "../../utils/url";

import "./styles.css";

const importFileIconCSS = `chrome-extension://${chrome.runtime.id}/libs/file-icon.css`;
import fileIcons from "../../utils/file-icons";

function TreeItem({ name, isTree, path, close, open, children, remainingURL }) {
  const URLDetails = fetchURLDetails();

  let treeItemActive = tryTreeItemActive(
    path,
    remainingURL,
    isTree,
    name,
    open
  );

  return (
    <li>
      <link rel="stylesheet" type="text/css" href={importFileIconCSS} />
      <div
        className="tree-element"
        onClick={() => handleClick(path, open, close, isTree, URLDetails)}
      >
        <div
          className={
            treeItemActive.isItemActive
              ? "full-width-row active-row"
              : "full-width-row"
          }
        ></div>
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
              remainingURL={treeItemActive.urlRemaining}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

const handleClick = (path, open, close, isTree, URLDetails) => {
  if (isTree) {
    if (isTree.isOpen) {
      close(path);
    } else {
      open(path);
    }
  } else {
    window.location.href = `https://www.gitlab.com/${
      URLDetails.dirFormatted
    }/-/blob/${URLDetails.branchName}/${path.join("/")}/`;
  }
};

const tryTreeItemActive = (path, remainingURL, isTree, name, open) => {
  let isItemActive = false;
  if (remainingURL.length != 0) {
    const activeIconName = remainingURL.split("/")[0];
    const urlRemaining = remainingURL.substring(activeIconName.length + 1);
    if (activeIconName === name) {
      if (isTree && isTree.isOpen != true) {
        isTree.isOpen = true;
        open(path);
      }
      if (urlRemaining.length === 0) {
        isItemActive = true;
      }
    }
    return { urlRemaining, isItemActive };
  } else {
    return { urlRemaining: "", isItemActive };
  }
};

export default TreeItem;
