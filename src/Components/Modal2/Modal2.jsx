import { useState } from "react";
import "../Modal2/Modal2.css";
import pic from "../../assests/modal.png";
export const Modal2 = ({ setTitle,title }) => {
  const [show, setShow] = useState(false);

  const changeTitle = (e) =>{
    setTitle(e.target.value);
  }

  return (
    <div className="main-container">
      {!show ? (
        <div className="modal primary">
          <textarea
            autoFocus
            value={title}
            className="title-textbox"
            cols="30"
            rows="5"
            onChange={(e) => changeTitle(e)}
          ></textarea>
          <div className="flex-center">
            <div className="text-container">
              <p className="margin-0 text">Add to:</p>
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
        <div className="modal secondary">
          <div onClick={() => setShow(false)} className="back btn">
            <span className="material-symbols-outlined">arrow_back</span>
          </div>

          <img src={pic} className="modal-image" alt="img" />
          <p className="image-box margin-0">
            Your data has been stored to notion
          </p>
          <button className="save-to-notion btn">Open in notion</button>
        </div>
      )}
    </div>
  );
};
