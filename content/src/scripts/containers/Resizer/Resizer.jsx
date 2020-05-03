import React, { useState } from "react";
import { connect } from "react-redux";

import { setWidth } from "../../../../../event/src/actions/UI";
import { throttle } from "../../utils/throttle";

import "./styles.css";

const Resizer = ({ width, setWidth }) => {
  const [transitionProps, setTransitionProps] = useState("");

  const mouseDownListener = () => {
    document.body.style.userSelect = "none";
    setTransitionProps(document.querySelector(".nav-sidebar").style.transition);
    document.querySelector(".nav-sidebar").style.transition = "none";
    document.addEventListener("mousemove", throttledMouseMoveListener);
    document.addEventListener("mouseup", mouseUpListener);
  };

  const mouseUpListener = () => {
    document.body.style.userSelect = "auto";
    document.querySelector(".nav-sidebar").style.transition = transitionProps;
    document.removeEventListener("mousemove", throttledMouseMoveListener);
    document.removeEventListener("mouseup", mouseUpListener);
  };

  const mouseMoveListener = (event) => {
    setWidth(event.clientX);
  };

  const throttledMouseMoveListener = throttle(mouseMoveListener, 16);

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
