import { useState } from "react";
import { Box, Grid, makeStyles } from "@material-ui/core";

import { MarketChart } from "./Components/MarketChart";
import { MarketDataHttp, MarketDataWebSocket } from "./Components/MarketData";
import { TicketPairType, TicketPairEnum } from "./models/pairs";
import { MarketSelector } from "./Components/MarketSelector";

const App: React.FC = () => {
  const [ticketPair, setTicketPair] = useState<TicketPairType>("BTC-CAD");
  const markets: TicketPairType[] = ["BTC-CAD", "BTC-USD", "ETH-CAD"];

  const [baseTicker, quoteTicker] = ticketPair.split("-");

  return (
    <>
      <Box pb={2}>
        <Grid container>
          <Grid item xs={12}>
            <MarketSelector
              ticketPair={ticketPair}
              markets={markets}
              handleChange={setTicketPair}
            />
          </Grid>
          <Grid item xs={12}>
            <MarketChart ticketPair={TicketPairEnum[ticketPair]} />
          </Grid>
        </Grid>
      </Box>
      <Box pl={2} pr={2}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <MarketDataHttp baseTicker={baseTicker} quoteTicker={quoteTicker} />
          </Grid>
          <Grid item xs={4}>
            <MarketDataHttp
              polling
              baseTicker={baseTicker}
              quoteTicker={quoteTicker}
            />
          </Grid>
          <Grid item xs={4}>
            <MarketDataWebSocket ticketPair={ticketPair} />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default App;
