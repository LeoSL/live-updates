import logo from "./logo.svg";
import "./assets/App.css";

import { MarketChart } from "./Components/MarketChart";
import { MarketData } from "./Components/MarketData";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <MarketChart ticketPair={"BTCCAD"} />
      </div>
      <div className="MarketData">
        <MarketData baseTicker="BTC" quoteTicker="CAD" />
      </div>
    </>
  );
}

export default App;
