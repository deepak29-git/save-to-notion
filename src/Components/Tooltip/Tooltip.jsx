import { useEffect, useState } from "react";
import "./Tooltip.css";

export const ToolTip = ({ setData, setIsDone, setTitle }) => {
  const [range, setRange] = useState({ x: "0px", y: "0px" });
  const pos = { top: range.x, left: range.y };
  const [showTooltip, setShowTooltip] = useState(false);

  const buttonHandler = () => {
    const data = window.getSelection().toString();
    setData(data);
    setIsDone(true);
    setTitle(document.title);
    window.getSelection().removeAllRanges();
    setShowTooltip(false);
  };

  const textHandler = (e) => {
    const data = window.getSelection().toString();
    if (data !== "") {
      setShowTooltip(true);
      setIsDone(false);
      setRange({ y: `${e.pageX}px`, x: `${e.pageY}px` });
    }
  };

  useEffect(() => {
    window.addEventListener("click", textHandler);
  });

  return (
    <>
      {showTooltip && (
        <span>
          <button className="save" style={pos} onClick={() => buttonHandler()}>
            save
          </button>
        </span>
      )}
    </>
  );
};
