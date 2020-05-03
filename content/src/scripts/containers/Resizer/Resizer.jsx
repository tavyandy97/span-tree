import React, { useState } from "react";
import { connect } from "react-redux";

import { setWidth } from "../../../../../event/src/actions/UI";

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

function throttle(func, wait, options) {
  let context, args, result;
  let timeout = null;
  let previous = 0;
  if (!options) options = {};
  let later = function () {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function () {
    let now = Date.now();
    if (!previous && options.leading === false) previous = now;
    let remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}

const mapStateToProps = (state) => {
  return {
    width: state.width,
  };
};

const mapDispatchToProps = { setWidth };

export default connect(mapStateToProps, mapDispatchToProps)(Resizer);
