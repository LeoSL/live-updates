import { Box } from "@material-ui/core";

// Ignoring TS lint due to the lack of TradingView typing
// @ts-ignore
import TradingViewWidget, { Themes } from "react-tradingview-widget";

type MarketChartProps = {
  ticketPair: string;
};

export const MarketChart: React.FC<MarketChartProps> = ({ ticketPair }) => (
  <Box height="28vh" pl={2} pr={2}>
    <TradingViewWidget
      symbol={ticketPair.replace("-", "")}
      theme={Themes.DARK}
      locale="en"
      autosize
    />
  </Box>
);
