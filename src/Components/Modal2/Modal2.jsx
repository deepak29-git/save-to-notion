import pic from "assests/modal.png";
import "../Modal2/Modal2.css";
import { useNotion, useTwitter } from "hooks";
import { useEffect, useState } from "react";

export const Modal2 = () => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [actionText, setActionText] = useState("Save2Notion");

  const { save2Notion, loading: notionLoading } = useNotion();
  const { tweetData, loading, lookupTweet } = useTwitter();

  function postToNotion() {
    setActionText("Loading...");

    if (type === "tweet") {
      const tweetId = data.split("/")[5];
      lookupTweet(tweetId);
    } else if (type === "text") {
      save2Notion({ title, type, text: data });
    } else if (type === "image") {
      save2Notion({
        title,
        type,
        url: data
      });
    } else {
      console.error(`Wrong type ${type}`);
    }
  }

  useEffect(() => {
    if (!loading && tweetData.done) {
      console.log(tweetData, "sending for notion");
      save2Notion({ title, type: "tweet", ...tweetData });
    }
  }, [tweetData]);

  useEffect(() => {
    if (!notionLoading) {
      console.log("Notion is done", notionLoading);
      setShow(true);
      setActionText("Save2Notion");
    }
  }, [notionLoading]);

  return (
    <div className="main-container">
      {!show ? (
        <div className="modal primary">
          <input
            autoFocus
            value={title}
            className="title-textbox"
            cols="30"
            rows="5"
            placeholder="Enter title..."
            onChange={(e) => setTitle(e.target.value)}
          ></input>
          <div className="flex-center">
            <div className="text-container">
              <p className="margin-0 text">Add to:</p>
              <select
                className="select-container"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option disabled className="option" value="none">
                  Not select
                </option>
                <option className="option" value="text">
                  Text
                </option>
                <option className="option" value="image">
                  Image
                </option>
                <option className="option" value="tweet">
                  Tweet
                </option>
              </select>
            </div>
            <input
              autoFocus
              value={data}
              className="title-textbox"
              cols="30"
              rows="5"
              placeholder="Enter here...."
              onChange={(e) => setData(e.target.value)}
            ></input>
            <button
              onClick={() => postToNotion()}
              className="save-to-notion btn"
            >
              {actionText}
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
