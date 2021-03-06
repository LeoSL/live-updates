import { useState } from "react";
import { Box, Grid } from "@material-ui/core";

import { TicketPairType } from "./models/pairs";
import { Header } from "./Components/Header";
import { MarketChart } from "./Components/Chart";
import { MarketDataHttp, MarketDataWebSocket } from "./Components/MarketData";
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
            <Header>
              <MarketSelector
                ticketPair={ticketPair}
                markets={markets}
                handleChange={setTicketPair}
              />
            </Header>
          </Grid>
          <Grid item xs={12}>
            <MarketChart ticketPair={ticketPair.replace("-", "")} />
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
