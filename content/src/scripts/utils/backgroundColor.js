const getHeaderBackgroundColor = () => {
  const fetchedValue = window
    .getComputedStyle(document.querySelector('header'))
    .getPropertyValue('background-color');
  return fetchedValue && fetchedValue.length > 0 ? { backgroundColor: fetchedValue } : {};
};

export default getHeaderBackgroundColor;
