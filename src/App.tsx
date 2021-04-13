import React from "react";
import logo from "./logo.svg";
import "./assets/App.css";

import { MarketChart } from "./Components/MarketChart";

function App() {
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
