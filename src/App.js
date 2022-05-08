import "./App.css";
import { ToolTip } from "./Components";
import { useState } from "react";
import { Modal2 } from "./Components/Modal2/Modal2";

function App() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState("");
  const [isDone, setIsDone] = useState(false);
  return (
    <div className="App">
      <ToolTip setData={setData} setIsDone={setIsDone} setTitle={setTitle} />
      <Modal2 title={title} setTitle={setTitle} />
    </div>
  );
}

export default App;
