import React, { useEffect, useState, useContext } from "react";

import { OptionsContext } from "../../contexts/OptionsContext";
import { fetchURLDetails } from "../../utils/url";
import fileIcons from "../../utils/file-icons";

import "./styles.css";
import { isMergeRequestShown, isRepositoryShown, grabMergeRequestIdFromCurrentUrl } from "../../../../../event/src/actions/API";
import { sha1 } from ".";

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
  const { options } = useContext(OptionsContext);

  const handleClick = () => {
    if (isTree) {
      if (isTree.isOpen) {
        close(path);
      } else {
        open(path);
      }
    } else {
      setClicked(true);
      const URLDetails = fetchURLDetails();
      if (isRepositoryShown()) {
        if ("compatibility-mode" in options && options["compatibility-mode"]) {
          window.location.href = `${window.location.origin}/${URLDetails.dirFormatted
            }/blob/${URLDetails.branchName}/${path.join("/")}`;
        } else {
          window.location.href = `${window.location.origin}/${URLDetails.dirFormatted
            }/-/blob/${URLDetails.branchName}/${path.join("/")}`;
        }
      } else if (isMergeRequestShown()) {
        let hash = sha1(path);
        let mergeRequestId = grabMergeRequestIdFromCurrentUrl();
        if (!window.location.href.includes('diffs')) {
          window.location.href = (window.location.origin + "/" + URLDetails.dirFormatted + "/-/merge_requests/" + mergeRequestId + "/diffs#" + hash);
        } else {
          window.location.hash = hash;
          window.location.reload();
        }
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
      const treeList = document.querySelector(".spantree-tree-list");
      const openingItem = document.querySelector(".opening");
      document
        .querySelector(".spantree-tree-list")
        .scrollTo(
          openingItem.offsetLeft - 25,
          openingItem.offsetTop - treeList.clientHeight / 2,
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
        className={
          opening ? "spantree-tree-element opening" : "spantree-tree-element"
        }
        onClick={handleClick}
      >
        <div
          className={
            treeItemActive.isItemActive
              ? "spantree-full-width-row spantree-active-row"
              : "spantree-full-width-row"
          }
        ></div>
        <div className="spantree-tree-icon">
          {isTree ? (
            isTree.isOpen ? (
              <i className="tree-arrow-down-icon spantree-arrow"></i>
            ) : (
              <i className="tree-arrow-right-icon spantree-arrow"></i>
            )
          ) : (
            " "
          )}
        </div>
        <div className="spantree-file-icon">
          <i className={fileIcons.getClassWithColor(name, isTree)}></i>
        </div>
        <div className="spantree-item-name">{name}</div>
      </div>
      {isTree && isTree.isOpen && (
        <ul className="spantree-child-list">
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
