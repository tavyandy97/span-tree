import React, { useState, useEffect, useRef } from "react";
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
  clicked,
  setClicked,
  close,
  open,
  rendering,
  setRendering,
  scrolling,
  setScrolling
) => {
  const URLDetails = fetchURLDetails();

  return (
    <div className="tree-list">
      <ul className="parent-list">
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
  tree,
  width,
  clicked,
  setClicked,
  getInitialTree,
  closeDir,
}) {
  const [loading, setLoading] = useState(true);
  const [rendering, setRendering] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const initialMount = useRef(true);

  useEffect(() => {
    const URLDetails = fetchURLDetails();
    if (URLDetails.baseRemovedURL.length === 0) {
      setRendering(false);
      setScrolling(false);
    } else {
      setRendering(true);
      setScrolling(true);
    }
    if (shouldGetTree()) {
      getInitialTree(
        URLDetails.dirURLParam,
        {
          ref: URLDetails.branchNameURL,
        },
        {
          repoName: URLDetails.dirFormatted,
          branchName: URLDetails.branchName,
        }
      );
    }
    setFirstPageLoad(false);
  }, []);

  useEffect(() => {
    if (initialMount.current && shouldGetTree()) {
      initialMount.current = false;
    } else {
      setLoading(false);
    }
  }, [tree]);

  const shouldGetTree = () => {
    const URLDetails = fetchURLDetails();
    if (
      !tree ||
      !tree[URLDetails.dirFormatted] ||
      !tree[URLDetails.dirFormatted][URLDetails.branchName]
    ) {
      return true;
    }
    if (clicked) {
      return false;
    }
    return firstPageLoad;
  };

  if (loading)
    return (
      <div className="loader-wrapper">
        <Loader size="64px" />
      </div>
    );

  const URLDetails = fetchURLDetails();

  const closeDirectory = (path) => {
    closeDir(path, {
      repoName: URLDetails.dirFormatted,
      branchName: URLDetails.branchName,
    });
  };

  const openDirectory = (path) => {
    openDir(
      URLDetails.dirURLParam,
      path,
      {
        ref: URLDetails.branchNameURL,
        path: path.join("%2F"),
      },
      {
        repoName: URLDetails.dirFormatted,
        branchName: URLDetails.branchName,
        path: path,
      }
    );
  };

  return renderTreeItems(
    tree[URLDetails.dirFormatted][URLDetails.branchName],
    width,
    clicked,
    setClicked,
    closeDirectory,
    openDirectory,
    rendering,
    setRendering,
    scrolling,
    setScrolling
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
