import React from "react";

function Half({ height, style }) {
  let heightSVG = height ? height : "9";
  let widthSVG = height ? height : "9";
  return (
    <svg height={heightSVG} width={widthSVG} viewBox="0 0 20 20" style={style}>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-180.000000, -4199.000000)"  fill="#ffffff">
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path d="M126,4049 C126,4044.589 129.589,4041 134,4041 L134,4057 C129.589,4057 126,4053.411 126,4049 M134,4039 C128.477,4039 124,4043.477 124,4049 C124,4054.523 128.477,4059 134,4059 C139.523,4059 144,4054.523 144,4049 C144,4043.477 139.523,4039 134,4039" id="contrast-[#907]"></path>
          </g>
        </g>
      </g>
    </svg>
  );
}

export default Half;
