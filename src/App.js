import "./App.css";
import { ToolTip } from "./Components";
import { useState } from "react";
import { Modal2 } from "./Components/Modal2/Modal2";

function App() {
  const [data, setData] = useState("");
  const [isDone, setIsDone] = useState(false);
  return (
    <>
      <ToolTip setData={setData} setIsDone={setIsDone} />
      <Modal2 />
    </>
  );
}

export default App;
