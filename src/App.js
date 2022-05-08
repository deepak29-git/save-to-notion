import "./App.css";
import { ToolTip } from "./Components";
import { useState } from "react";
import { Button } from "./Components/Button/Button";
import { Modal } from "./Components/Modal/Modal";

function App() {
  const [data, setData] = useState("");
  const [isDone, setIsDone] = useState(false);
  return (
    <>
      <div className="App">
        <ToolTip setData={setData} setIsDone={setIsDone} />
        {isDone && <h1>{data}</h1>}

        <Modal />
        <Button />
      </div>
    </>
  );
}

export default App;
