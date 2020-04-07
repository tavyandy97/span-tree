import React from "react";

function Repo({ height }) {
  let heightSVG = height ? height : "1024";
  let widthSVG = height ? `${(768 * height) / 1024}` : "640";
  return (
    <svg
      enable-background="new 0 0 386.667 386.667"
      height={heightSVG}
      width={widthSVG}
      viewBox="0 0 386.667 386.667"
    >
      <path d="M320 256h-64v64h64V256zM320 128h-64v64h64V128zM704 0H64C64 0 0 0 0 64v768c0 64 64 64 64 64h128v128l96-96 96 96V896h320c0 0 64-1.125 64-64V64C768 0 704 0 704 0zM704 768c0 61.625-64 64-64 64H384v-64H192v64h-64c-64 0-64-64-64-64v-64h640V768zM704 640H192V64h513L704 640zM320 512h-64v64h64V512zM320 384h-64v64h64V384z" />
    </svg>
  );
}

export default Repo;
