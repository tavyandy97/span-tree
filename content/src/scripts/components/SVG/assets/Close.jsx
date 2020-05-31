import React from "react";

function Close({ height, style }) {
  let heightSVG = height ? height : "16";
  let widthSVG = height ? `${(3 * height) / 4}` : "12";
  return (
    <svg width={widthSVG} height={heightSVG} viewBox="0 0 12 12" style={style}>
      <path d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z" />
    </svg>
  );
}

export default Close;
