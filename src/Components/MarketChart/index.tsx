// @ts-ignore
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import "./style.css";

export const MarketChart = () => (
  <div className="Chart">
    <TradingViewWidget
      symbol="BTCCAD"
      theme={Themes.DARK}
      locale="en"
      autosize
    />
  </div>
);
