import React from "react";

import { fetchURLDetails } from "../../utils/url";

import fileIcons from "../../utils/file-icons";
import axios from "../../../../../event/axios";

import "./styles.css";

const importFileIconCSS = `chrome-extension://${chrome.runtime.id}/libs/file-icon.css`;

function TreeItem({ name, isTree, path, close, open, children }) {
  const URLDetails = fetchURLDetails();

  const handleClick = (path, open, close, isTree) => {
    if (isTree) {
      if (isTree.isOpen) {
        close(path);
      } else {
        open(path);
      }
    } else {
      // window.location.href
      const URL = `https://www.gitlab.com/${URLDetails.dirFormatted}/blob/${
        URLDetails.branchName
      }/${path.join("/")}`;
      axios
        .get(URL, {
          headers: {
            accept: " application/json, text/javascript, */*; q=0.01",
            ["x-requested-with"]: " XMLHttpRequest",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {});
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
