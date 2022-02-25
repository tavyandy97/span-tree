import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";

import Loader from "../../components/Loader";
import TreeItem from "../../components/TreeItem";
import { fetchURLDetails } from "../../utils/url";
import {
  getInitialTree,
  openDir,
  closeDir,
} from "../../../../../event/src/actions/API";
import { setClicked } from "../../../../../event/src/actions/UI";

import "./styles.css";

const renderTreeItems = (
  tree,
  width,
  setClicked,
  close,
  open,
  rendering,
  setRendering,
  scrolling,
  setScrolling,
) => {
  const URLDetails = fetchURLDetails();

  return (
    <div className="spantree-tree-list">
      <ul className="spantree-parent-list">
        {Object.keys(tree).map((key) => (
          <TreeItem
            width={width}
            key={key}
            name={tree[key].name}
            isTree={tree[key].isTree}
            path={tree[key].path}
            children={tree[key].children}
            open={open}
            close={close}
            remainingURL={URLDetails.baseRemovedURL}
            rendering={rendering}
            setRendering={setRendering}
            setClicked={setClicked}
            scrolling={scrolling}
            setScrolling={setScrolling}
          />
        ))}
      </ul>
    </div>
  );
};

function TreeList({
  firstPageLoad,
  setFirstPageLoad,
  tabId,
  tree,
  width,
  clicked,
  setClicked,
  getInitialTree,
  closeDir,
  toggleFilterTests,
  toggleFilterRemoved,
  toggleFilterRenamed,
  toggleFilterImports
}) {
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const initialMount = useRef(true);

  const URLDetails = fetchURLDetails();

  const shouldGetTree = () => {
    if (!(tree && tree[tabId])) {
      return true;
    }
    if (clicked) {
      return false;
    }
    return firstPageLoad;
  };

  useEffect(() => {
    if (URLDetails.baseRemovedURL.length === 0) {
      setRendering(false);
      setScrolling(false);
    } else {
      setRendering(true);
      setScrolling(true);
    }
    if (shouldGetTree()) {
      getInitialTree(
        URLDetails.projectId ? URLDetails.projectId : URLDetails.dirURLParam,
        {
          ref: URLDetails.branchNameURL,
        },
        {
          repoName: URLDetails.dirFormatted,
          branchName: URLDetails.branchName,
          tabId,
        },
        {
          tests: toggleFilterTests,
          removed: toggleFilterRemoved,
          renamed: toggleFilterRenamed,
          imports: toggleFilterImports,
        },
      );
    }
    setFirstPageLoad(false);
  }, []);

  useEffect(() => {
    if (initialMount.current && shouldGetTree()) {
      initialMount.current = false;
    } else if (loading && tree && tree[tabId]) {
      setLoading(false);
    }
  }, [tree[tabId]]);

  if (loading)
    return (
      <div className="spantree-loader-wrapper">
        <Loader size="64px" />
      </div>
    );

  const closeDirectory = (path) => {
    closeDir(path, {
      repoName: URLDetails.dirFormatted,
      branchName: URLDetails.branchName,
      tabId,
    });
  };

  const openDirectory = (path) => {
    openDir(
      URLDetails.projectId ? URLDetails.projectId : URLDetails.dirURLParam,
      path,
      {
        ref: URLDetails.branchNameURL,
        path: encodeURIComponent(path.join("/")),
      },
      {
        repoName: URLDetails.dirFormatted,
        branchName: URLDetails.branchName,
        path: path,
        tabId,
      },
    );
  };

  return renderTreeItems(
    tree[tabId],
    width,
    setClicked,
    closeDirectory,
    openDirectory,
    rendering,
    setRendering,
    scrolling,
    setScrolling,
  );
}

const mapStateToProps = (state) => {
  return {
    tree: state.tree,
    width: state.width,
    clicked: state.clicked,
  };
};

const mapDispatchToProps = { getInitialTree, closeDir, setClicked };

export default connect(mapStateToProps, mapDispatchToProps)(TreeList);
