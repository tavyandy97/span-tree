import React from "react";
import "./styles.css";
import { paneWidth } from "../../utils/styling";

const Resizer = () => (
  <div
    className="resizer"
    unselectable="on"
    style={{ left: paneWidth() }}
    onMouseDown={(event) => mouseDownListener(event)}
  ></div>
);

const mouseDownListener = (event) => {
  console.log(event.clientX);
  document.body.style.userSelect = "none";
  document.addEventListener("mousemove", mouseMoveListener);
  document.addEventListener("mouseup", mouseUpListener);
};

const mouseUpListener = (event) => {
  console.log("Mouse Up");
  document.body.style.userSelect = "auto";
  document.removeEventListener("mousemove", mouseMoveListener);
  document.removeEventListener("mouseup", mouseUpListener);
};

const mouseMoveListener = (event) => {
  console.log(event.clientX);
};

export default Resizer;
