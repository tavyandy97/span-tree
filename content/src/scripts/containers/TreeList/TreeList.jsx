import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import Loader from "../../components/Loader";
import TreeItem from "../../components/TreeItem";
import { fetchURLDetails } from "../../utils/url";
import { getInitialTree } from "../../../../../event/src/actions/API";

import "./styles.css";

const renderTreeItems = (tree) => {
  return (
    <div className="tree-list">
      <ul className="parent-list">
        {tree.map((node) => (
          <TreeItem name={node.name} isTree={node.isTree} />
        ))}
      </ul>
    </div>
  );
};

function TreeList({ tree, getInitialTree }) {
  const [loading, setLoading] = useState(true);
  const initialMount = useRef(true);

  useEffect(() => {
    const URLDetails = fetchURLDetails();
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
  }, []);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
    } else {
      setLoading(false);
    }
  }, [tree]);

  if (loading)
    return (
      <div className="loader-wrapper">
        <Loader size="64px" />
      </div>
    );

  const URLDetails = fetchURLDetails();

  console.log(tree);
  return renderTreeItems(tree[URLDetails.dirFormatted][URLDetails.branchName]);
}

const mapStateToProps = (state) => {
  return {
    tree: state.tree,
  };
};

const mapDispatchToProps = { getInitialTree };

export default connect(mapStateToProps, mapDispatchToProps)(TreeList);
