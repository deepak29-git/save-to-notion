import { useEffect, useState } from "react";
import "./Tooltip.css";

export const ToolTip = ({setData,setIsDone}) => {
  const [range, setRange] = useState({ x: "0px", y: "0px" });
  const pos = { top: range.x, left: range.y };
  const [show, setShow] = useState(false);

  const buttonHandler = () => {
    const data = window.getSelection().toString();
    setData(data);
    setIsDone(true)
    window.getSelection().removeAllRanges();
    setShow(false);
  };

  const textHandler = (e) => {
    const data = window.getSelection().toString();
    if (data !== "") {
      setShow(true);
      setIsDone(false)
    }
    setRange({ y: `${e.pageX}px`, x: `${e.pageY}px` });
  };

  useEffect(() => {
    window.addEventListener("click", textHandler);
  }, []);

  return (
    <>
      {show && (
          <button className="save" style={pos} onClick={() => buttonHandler()}>
            save
          </button>
      )}
    </>
  );
};
