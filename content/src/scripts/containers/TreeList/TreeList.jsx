import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";

import Loader from "../../components/Loader";
import TreeItem from "../../components/TreeItem";
import { getInitialTree } from "../../../../../event/src/actions/API";

import "./styles.css";

const renderTreeItems = (tree) => {
  return (
    <ul className="parent-list">
      {tree
        .filter((node) => node.name === node.path)
        .map((node) => (
          <TreeItem name={node.name} isTree={node.type === "tree"} />
        ))}
    </ul>
  );
};

function TreeList({ tree, getInitialTree }) {
  const [loading, setLoading] = useState(true);
  const initialMount = useRef(true);

  useEffect(() => {
    const pathLiterals = window.location.pathname
      .split("/")
      .filter((pathSub) => pathSub.length !== 0);
    getInitialTree(`${pathLiterals[0]}%2F${pathLiterals[1]}`);
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

  return renderTreeItems(tree);
}

const mapStateToProps = (state) => {
  return {
    tree: state.tree,
  };
};

const mapDispatchToProps = { getInitialTree };

export default connect(mapStateToProps, mapDispatchToProps)(TreeList);
