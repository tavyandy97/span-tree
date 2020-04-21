import React from "react";
import "./styles.css";
import { setWidth } from "../../../../../event/src/actions/UI";
import { connect } from "react-redux";

const Resizer = ({ width, setWidth }) => {
  const mouseDownListener = (event) => {
    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", mouseMoveListener);
    document.addEventListener("mouseup", mouseUpListener);
  };

  const mouseUpListener = () => {
    document.body.style.userSelect = "auto";
    document.removeEventListener("mousemove", mouseMoveListener);
    document.removeEventListener("mouseup", mouseUpListener);
  };

  const mouseMoveListener = (event) => {
    setWidth(event.clientX);
  };

  return (
    <div
      className="resizer"
      unselectable="on"
      style={{ left: width + "px" }}
      onMouseDown={mouseDownListener}
    ></div>
  );
};

const mapStateToProps = (state) => {
  return {
    width: state.width,
  };
};

const mapDispatchToProps = { setWidth };

export default connect(mapStateToProps, mapDispatchToProps)(Resizer);
