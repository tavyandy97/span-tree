const isWindowObject = (value) => {
  return value != null && typeof value === "object" && "setInterval" in value;
};

const freeSelf = isWindowObject(typeof self == "object" && self) && self;

const navigator = freeSelf && freeSelf.navigator;
const userAgent = ((navigator && navigator.userAgent) || "").toLowerCase();
const vendor = ((navigator && navigator.vendor) || "").toLowerCase();

export const browserKey = () => {
  if (isChrome()) return "chrome";
  if (isFirefox()) return "moz";
  return "chrome";
};

const isChrome = () => {
  const match = /google inc/.test(vendor)
    ? userAgent.match(/(?:chrome|crios)\/(\d+)/)
    : null;
  return match !== null && !isOpera();
};

const isFirefox = () => {
  const match = userAgent.match(/(?:firefox|fxios)\/(\d+)/);
  return match !== null;
};

const isOpera = () => {
  const match = userAgent.match(/(?:^opera.+?version|opr)\/(\d+)/);
  return match !== null;
};
