import React from "react";
import logo from "./logo.svg";
import "./assets/App.css";

import ws from "./websockets";
import { MarketChart } from "./Components/MarketChart";

function App() {
  ws();

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <MarketChart ticketPair={"BTCCAD"} />
    </div>
  );
}

export default App;
