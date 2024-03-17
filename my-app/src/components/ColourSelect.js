import React from "react";
import chroma from "chroma-js";
import Select from "react-select";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export default function ColorSelect({ color, setColor, lightMode }) {
  const defaultColor = "#577590"; // Default color if user doesn't pick any

  const colourOptions = [
    { value: "#F94144", label: "Red" },
    { value: "#F3722C", label: "Orange" },
    { value: "#F8961E", label: "Yellow" },
    { value: "#F9C74F", label: "Gold" },
    { value: "#90BE6D", label: "Green" },
    { value: "#43AA8B", label: "Teal" },
    { value: "#577590", label: "Blue" },
    { value: "#277DA1", label: "Sky Blue" },
    { value: "#A77DC2", label: "Purple" },
    { value: "#F9844A", label: "Salmon" },
    // Add more pastel colors as needed
  ];

  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: lightMode ? "#E4E3E0" : "#313638",
      borderRadius: "5px",
      padding: "8px",
      border: `2px solid ${lightMode ? "#313638" : "#E4E3E0"}`,
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      const color = chroma(data.value);
      return {
        ...styles,
        backgroundColor: isDisabled
          ? undefined
          : isSelected
          ? data.value
          : isFocused
          ? color.alpha(0.1).css()
          : undefined,
        color: isDisabled
          ? "#ccc"
          : isSelected
          ? chroma.contrast(color, "white") > 2
            ? "white"
            : "black"
          : data.value,
        cursor: isDisabled ? "not-allowed" : "default",

        ":active": {
          ...styles[":active"],
          backgroundColor: !isDisabled
            ? isSelected
              ? data.value
              : color.alpha(0.3).css()
            : undefined,
        },
      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({
      ...styles,
      ...dot(lightMode ? "#313638" : "#E4E3E0"), // Adjust placeholder color based on lightMode
    }),
    singleValue: (styles, { data }) => ({
      ...styles,
      ...dot(data.value),
      color: lightMode ? "#313638" : "#E4E3E0", // Adjust text color based on lightMode
    }),
  };

  return (
    <Select
      defaultValue={
        colourOptions.find((c) => c.value === color) || {
          value: defaultColor,
          label: "Default",
        }
      } // Use defaultColor if user doesn't pick any
      options={colourOptions}
      styles={colourStyles}
      onChange={(selectedOption) => setColor(selectedOption.value)}
      placeholder="Select color"
      theme={(theme) => ({
        ...theme,
        borderRadius: 5,
        colors: {
          ...theme.colors,
          primary25: lightMode ? "#F9F6EE" : "#313638", // hover color
          primary: lightMode ? "#313638" : "#E4E3E0", // border color
        },
      })}
    />
  );
}
