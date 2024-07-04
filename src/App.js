import "./App.css";
import Main from "./components/Main";
import Login from "./components/Chat/Login";
import React, { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [componentToRender, setComponentToRender] = useState(
    <Login setUser={(e) => setName(e)} />
  );

  useEffect(() => {
    if (name !== "") {
      setComponentToRender(<Main user={name} />);
    } else {
      setComponentToRender(<Login setUser={(e) => setName(e)} />);
    }
  }, [name]);

  return <div>{componentToRender}</div>;
}

export default App;
