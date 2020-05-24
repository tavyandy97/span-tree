import React from "react";

function Half({ height, style }) {
  let heightSVG = height ? height : "16";
  let widthSVG = height ? height : "16";
  return (
    <svg height={heightSVG} width={widthSVG} viewBox="0 0 16 16" style={style}>
      <path
        d="M289.203,0C129.736,0,0,129.736,0,289.203C0,448.67,129.736,578.405,289.203,578.405
			c159.467,0,289.202-129.735,289.202-289.202C578.405,129.736,448.67,0,289.203,0z M28.56,289.202
			C28.56,145.48,145.481,28.56,289.203,28.56l0,0v521.286l0,0C145.485,549.846,28.56,432.925,28.56,289.202z"
      />
    </svg>
  );
}

export default Half;
