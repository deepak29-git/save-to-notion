import { useState } from "react";
import { PopUp } from "../PopUp/PopUp";
import "../Button/Button.css";
export const Button = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="button-container">
        <button onClick={() => (!show ? setShow(true) : setShow(false))}>
          show Modal
        </button>
        {show && <PopUp />}
      </div>
    </>
  );
};
