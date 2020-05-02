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
    // if (Math.abs(lastPosX - event.clientX) >= 20) {
    //   lastPosX = event.clientX;
    setWidth(event.clientX);
    console.log(event.clientX);
    //   console.log(lastPosX);
    // }
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
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  let timeout;

  // Calling debounce returns a new anonymous function
  return function () {
    // reference the context and args for the setTimeout function
    let context = this,
      args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    let callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this
    //   function several times, but it will only execute once
    //   [before or after imposing a delay].
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function () {
      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
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
