import React from "react";

function Option({ id, value, label, type, handleChange }) {
  switch (type) {
    case "CheckBox":
      return (
        <label>
          <input
            type="checkbox"
            value={label}
            checked={value}
            onChange={() => handleChange(id, !value)}
          />
          {label}
        </label>
      );
    default:
      return null;
  }
}

function Options({ options, optionList, changeOptions }) {
  const handleChangeOptions = (key, value) => {
    changeOptions({
      ...options,
      [key]: value,
    });
  };

  return optionList.map((option) => (
    <Option
      id={option.keyName}
      value={option.keyName in options ? options[option.keyName] : false}
      label={option.name}
      type={option.type}
      handleChange={handleChangeOptions}
    />
  ));
}

export default Options;
