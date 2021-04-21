import { Box } from "@material-ui/core";

// @ts-ignore
import TradingViewWidget, { Themes } from "react-tradingview-widget";
import "./style.css";

type MarketChartProps = {
  ticketPair: string;
};

export const MarketChart: React.FC<MarketChartProps> = ({ ticketPair }) => (
  <Box height="25vh" pl={2} pr={2}>
    <TradingViewWidget
      symbol={ticketPair.replace("-", "")}
      theme={Themes.DARK}
      locale="en"
      autosize
    />
  </Box>
);
