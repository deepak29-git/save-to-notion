import { useState } from "react";
import "../PopUp/PopUp.css";
export const PopUp = () => {
  const [show, setShow] = useState(false);

  return (
    <div className="modal-container">
      {!show ? (
        <div>
          <textarea
            autoFocus
            name=""
            className="title-textbox"
            cols="30"
            rows="10"
          ></textarea>
          <div className="flex-center">
            <div>
              <select className="select-container" name="" id="">
              <option disabled className="option" value="Not select">
                  Not select
                </option>
                <option className="option" value="Text">
                  Text
                </option>
                <option className="option" value="Image">
                  Image
                </option>
                <option className="option" value="Tweet">
                  Tweet
                </option>
              </select>
            </div>
            <button
              onClick={() => setShow(true)}
              className="save-to-notion btn"
            >
              Save to Notion
            </button>
          </div>
        </div>
      ) : (
        <div >
          <div onClick={()=>setShow(false)} className="back btn">
            <span class="material-symbols-outlined">arrow_back</span>
          </div>
          <button className="save-to-notion btn ">Open in notion</button>
        </div>
      )}
    </div>
  );
};
