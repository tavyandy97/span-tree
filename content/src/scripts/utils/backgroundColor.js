const getHeaderBackgroundColor = (options) => {
  if ("auto-theme" in options && options["auto-theme"]) {
    const fetchedValue = window
      .getComputedStyle(document.querySelector("header"))
      .getPropertyValue("background-color");
    return fetchedValue && fetchedValue.length > 0
      ? { backgroundColor: fetchedValue }
      : {};
  }
  return {};
};

export default getHeaderBackgroundColor;
