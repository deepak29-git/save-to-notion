import { useState } from "react";
import { Modal2 } from "../Modal2/Modal2";
import "../Button/Button.css";
export const Button = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="button-container">
        <button onClick={() => (!show ? setShow(true) : setShow(false))}>
          show Modal
        </button>
      {show && <Modal2 />}
      </div>
    </>
  );
};
