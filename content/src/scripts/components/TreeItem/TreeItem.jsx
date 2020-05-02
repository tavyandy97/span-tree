import React from "react";

import fileIcons from "../../utils/file-icons";

import "./styles.css";
import { fetchURLDetails } from "../../utils/url";
import { setClicked } from "../../../../../event/src/actions/UI";

const importFileIconCSS = `chrome-extension://${chrome.runtime.id}/libs/file-icon.css`;

function TreeItem({
  width,
  name,
  isTree,
  path,
  close,
  open,
  children,
  remainingURL,
  rendering,
  setRendering,
  setClicked,
}) {
  const handleClick = (path, open, close, isTree, setClicked) => {
    if (isTree) {
      if (isTree.isOpen) {
        close(path);
      } else {
        open(path);
      }
    } else {
      setClicked(true);
      let URLDetails = fetchURLDetails();
      window.location.href = `https://www.gitlab.com/${
        URLDetails.dirFormatted
      }/blob/${URLDetails.branchName}/${path.join("/")}`;
    }
  };

  const tryTreeItemActiveBeforeReload = (
    path,
    remainingURL,
    isTree,
    name,
    open,
    setRendering,
    setClicked
  ) => {
    let isItemActive = false;
    if (remainingURL.length != 0) {
      let activeIconName = remainingURL.split("/")[0];
      let urlRemaining = remainingURL.substring(activeIconName.length + 1);
      if (activeIconName === name) {
        if (isTree && isTree.isOpen != true) {
          isTree.isOpen = true;
          open(path);
        }
        if (urlRemaining.length === 0) {
          isItemActive = true;
          setRendering(false);
          setClicked(false);
        }
      } else {
        urlRemaining = "";
      }
      return { urlRemaining, isItemActive };
    } else {
      return { urlRemaining: "", isItemActive };
    }
  };

  const tryTreeItemActiveAfterReload = (remainingURL, name) => {
    let isItemActive = false;
    if (remainingURL.length != 0) {
      let activeIconName = remainingURL.split("/")[0];
      let urlRemaining = remainingURL.substring(activeIconName.length + 1);
      if (activeIconName === name) {
        if (urlRemaining.length === 0) {
          isItemActive = true;
        }
      } else {
        urlRemaining = "";
      }
      return { urlRemaining, isItemActive };
    } else {
      return { urlRemaining: "", isItemActive };
    }
  };

  let treeItemActive = null;
  if (rendering) {
    treeItemActive = tryTreeItemActiveBeforeReload(
      path,
      remainingURL,
      isTree,
      name,
      open,
      setRendering,
      setClicked
    );
  } else {
    treeItemActive = tryTreeItemActiveAfterReload(remainingURL, name);
  }

  return (
    <li>
      <link rel="stylesheet" type="text/css" href={importFileIconCSS} />
      <div
        className="tree-element"
        onClick={() => handleClick(path, open, close, isTree, setClicked)}
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
              width={width}
              name={children[key].name}
              isTree={children[key].isTree}
              path={children[key].path}
              children={children[key].children}
              open={open}
              close={close}
              remainingURL={treeItemActive.urlRemaining}
              rendering={rendering}
              setRendering={setRendering}
              setClicked={setClicked}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default TreeItem;
