import React from "react";

import "./styles.css";

function Loader({ size }) {
  const dimInPixel = Number(size.replace(/[^0-9\.]+/g, ""));

  return (
    <div
      style={{
        borderWidth: `${(16 * dimInPixel) / 120}px`,
        width: size,
        height: size,
      }}
      className="spantree-loader"
    ></div>
  );
}

export default Loader;
