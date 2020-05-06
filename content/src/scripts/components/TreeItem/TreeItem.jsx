import React, { useEffect, useState } from "react";

import fileIcons from "../../utils/file-icons";

import "./styles.css";
import { fetchURLDetails } from "../../utils/url";

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
  scrolling,
  setScrolling,
}) {
  const [opening, setOpening] = useState(false);
  const [childListClass, setChildListClass] = useState("child-list");

  const handleClick = () => {
    if (isTree) {
      if (isTree.isOpen) {
        setChildListClass("child-list");
        close(path);
      } else {
        open(path);
        let expandingClass = "ec-" + Math.floor(Math.random() * 1000) + 1;
        setChildListClass("child-list expanding " + expandingClass);
      }
    } else {
      setClicked(true);
      let URLDetails = fetchURLDetails();
      window.location.href = `https://www.gitlab.com/${
        URLDetails.dirFormatted
      }/blob/${URLDetails.branchName}/${path.join("/")}`;
    }
  };

  const tryTreeItemActiveBeforeReload = () => {
    let isItemActive = false;
    if (remainingURL.length != 0) {
      let activeIconName = remainingURL.split("/")[0];
      let urlRemaining = remainingURL.substring(activeIconName.length + 1);
      if (activeIconName.replace(/%20/gi, " ") === name) {
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
      if (activeIconName.replace(/%20/gi, " ") === name) {
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

  useEffect(() => {
    if (
      childListClass !== "child-list" &&
      !(
        Object.keys(children).length === 0 && children.constructor === Object
      ) &&
      isTree
    ) {
      let childListClassSplit = childListClass.split(" ");
      let currProcess = childListClassSplit[1];
      if (currProcess === "expanding") {
        // console.log("EXPANDING");
        let expandingClass =
          childListClassSplit[childListClassSplit.length - 1];
        let expandedHeight = document.querySelector("." + expandingClass)
          .scrollHeight;
        document.querySelector("." + expandingClass).style.height =
          expandedHeight + "px";
        setTimeout(function () {
          document.querySelector("." + expandingClass).style.height = "auto";
          setChildListClass("child-list");
        }, 300);
      }
      // if (currProcess === "collapsing") {
      //   console.log("COLLAPSING");
      //   setChildListClass("child-list");
      // }
    }
  }, [children]);

  return (
    <li>
      <link rel="stylesheet" type="text/css" href={importFileIconCSS} />
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
        <ul className={childListClass}>
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
