import React, { useState } from "react";

import "./styles.css";

function CompatibilityMode() {
  const [compatibilityMode, setCompatibilityMode] = useState(true);

  return (
    <div className="option">
      Compatibility Mode <input type="checkbox" />
    </div>
  );
}

export default CompatibilityMode;
