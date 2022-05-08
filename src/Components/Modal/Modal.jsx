import {  useState } from "react";
import "../Modal/Modal.css";

export const Modal = () => {
  const [image, setImage] = useState("");
  const onImageChange = (e) => {
    let img = e.target.files[0];
    console.log(URL.createObjectURL(img));
    if (e.target.files && img) {
      setImage(URL.createObjectURL(img));
    }
  };

  const saveToNotionHandler = () => {};
  return (
    <div className="container">
      <input onChange={onImageChange} type="file" />

      <div>
        <img className="upload-image" src={image} alt="" />
      </div>
      <div>
        <button onClick={saveToNotionHandler}>Save to notion</button>
      </div>
    </div>
  );
};
