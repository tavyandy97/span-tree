import React, { useEffect, useState } from "react";

import fileIcons from "../../utils/file-icons";

import "./styles.css";
import { fetchURLDetails } from "../../utils/url";

function TreeItem({
  width,
  name,
  isTree,
  path,
  close,
  open,
  options,
  children,
  remainingURL,
  rendering,
  setRendering,
  setClicked,
  scrolling,
  setScrolling,
}) {
  const [opening, setOpening] = useState(false);

  const handleClick = () => {
    if (isTree) {
      if (isTree.isOpen) {
        close(path);
      } else {
        open(path);
      }
    } else {
      setClicked(true);
      let URLDetails = fetchURLDetails();
      if ("compatibility-mode" in options && options["compatibility-mode"]) {
        window.location.href = `${window.location.origin}/${
          URLDetails.dirFormatted
        }/blob/${URLDetails.branchName}/${path.join("/")}`;
      } else {
        window.location.href = `${window.location.origin}/${
          URLDetails.dirFormatted
        }/-/blob/${URLDetails.branchName}/${path.join("/")}`;
      }
    }
  };

  const tryTreeItemActiveBeforeReload = () => {
    let isItemActive = false;
    if (remainingURL.length != 0) {
      let activeIconName = remainingURL.split("/")[0];
      let urlRemaining = remainingURL.substring(activeIconName.length + 1);
      if (decodeURIComponent(activeIconName) === name) {
        if (isTree && !isTree.isOpen) {
          isTree.isOpen = true;
          open(path);
          setOpening(true);
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

  const tryTreeItemActiveAfterReload = () => {
    let isItemActive = false;
    if (remainingURL.length != 0) {
      let activeIconName = remainingURL.split("/")[0];
      let urlRemaining = remainingURL.substring(activeIconName.length + 1);
      if (decodeURIComponent(activeIconName) === name) {
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
    treeItemActive = tryTreeItemActiveBeforeReload();
  } else {
    treeItemActive = tryTreeItemActiveAfterReload();
  }

  useEffect(() => {
    if (treeItemActive.isItemActive) {
      setOpening(true);
    }
  }, []);

  useEffect(() => {
    if (opening && scrolling) {
      const treeList = document.querySelector(".tree-list");
      const openingItem = document.querySelector(".opening");
      document
        .querySelector(".tree-list")
        .scrollTo(
          openingItem.offsetLeft - 25,
          openingItem.offsetTop - treeList.clientHeight / 2
        );
      setOpening(false);
      if (treeItemActive.isItemActive) {
        setScrolling(false);
      }
    }
  }, [opening]);

  return (
    <li>
      <div
        className={opening ? "tree-element opening" : "tree-element"}
        onClick={handleClick}
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
              <i className="fa fa-chevron-right arrow arrow-down"></i>
            ) : (
              <i className="fa fa-chevron-right arrow"></i>
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
              options={options}
              remainingURL={treeItemActive.urlRemaining}
              rendering={rendering}
              setRendering={setRendering}
              setClicked={setClicked}
              scrolling={scrolling}
              setScrolling={setScrolling}
            />
          ))}
        </ul>
      )}
    </li>
  );
}

export default TreeItem;
