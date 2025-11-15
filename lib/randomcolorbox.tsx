import { useState } from "react";

export default function RandomColorBox() {
  const [color, setColor] = useState("skyblue");

  const randomColor = () => {
    const c = "#" + Math.floor(Math.random() * 16777215).toString(16);
    setColor(c);
  };

  return (
    <div
      style={{
        height: "200px",
        width: "200px",
        background: color,
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={randomColor}
    >
      {color}
    </div>
  );
}
