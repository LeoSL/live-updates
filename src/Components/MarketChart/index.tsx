// @ts-ignore
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import "./style.css";

type MarketChartProps = {
  ticketPair: string;
};

export const MarketChart: React.FC<MarketChartProps> = ({ ticketPair }) => (
  <div className="Chart">
    <TradingViewWidget
      symbol={ticketPair}
      theme={Themes.DARK}
      locale="en"
      autosize
    />
  </div>
);
