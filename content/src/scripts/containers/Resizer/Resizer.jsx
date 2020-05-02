import React, { useState } from "react";
import { connect } from "react-redux";

import { setWidth } from "../../../../../event/src/actions/UI";

import "./styles.css";

const Resizer = ({ width, setWidth }) => {
  let transitionProps = "";
  // let lastPosX = 0;

  const mouseDownListener = (event) => {
    document.body.style.userSelect = "none";
    // lastPosX = event.clientX;
    transitionProps = document.querySelector(".nav-sidebar").style.transition;
    document.querySelector(".nav-sidebar").style.transition = "none";
    document.addEventListener("mousemove", debouncedMouseMoveListener);
    document.addEventListener("mouseup", mouseUpListener);
  };

  const mouseUpListener = (event) => {
    setWidth(event.clientX);
    document.body.style.userSelect = "auto";
    document.querySelector(".nav-sidebar").style.transition = transitionProps;
    document.removeEventListener("mousemove", debouncedMouseMoveListener);
    document.removeEventListener("mouseup", mouseUpListener);
  };

  const mouseMoveListener = (event) => {
    setWidth(event.clientX);
    console.log(event.clientX);
  };

  const debouncedMouseMoveListener = debounce(mouseMoveListener, 2);

  return (
    <div
      className="resizer"
      unselectable="on"
      style={{ left: width + "px" }}
      onMouseDown={mouseDownListener}
    ></div>
  );
};

function debounce(func, wait, immediate) {
  let timeout;

  return function () {
    let context = this,
      args = arguments;

    let callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;

      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);

    if (callNow) func.apply(context, args);
  };
}

const mapStateToProps = (state) => {
  return {
    width: state.width,
  };
};

const mapDispatchToProps = { setWidth };

export default connect(mapStateToProps, mapDispatchToProps)(Resizer);
