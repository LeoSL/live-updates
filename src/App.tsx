import logo from "./logo.svg";
import "./assets/App.css";

import { MarketChart } from "./Components/MarketChart";
import { MarketDataHttp, MarketDataWebSocket } from "./Components/MarketData";

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <MarketChart ticketPair={"BTCCAD"} />
      </div>
      <hr />
      <div className="MarketData">
        <MarketDataHttp baseTicker="BTC" quoteTicker="CAD" />
        <MarketDataWebSocket />
      </div>
    </>
  );
}

export default App;
