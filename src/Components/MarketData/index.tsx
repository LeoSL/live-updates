import { ComponentType } from "react";
import { useQuery, useSubscription, gql } from "@apollo/client";
import { Box, Table, TableBody, TableRow, TableCell } from "@material-ui/core";

import { TicketPairType } from "../../models/pairs";
import { OrdersTable } from "./OrdersTable";
import { MarketCard } from "../Card";

const MARKET_DATA_POLL_INTERVAL = 2000;

const MARKET_DATA_HTTP = gql`
  query MarketData($baseTicker: String!, $quoteTicker: String!) {
    marketData(baseTicker: $baseTicker, quoteTicker: $quoteTicker) {
      marketDataResponse
    }
  }
`;

const MARKET_DATA_WEBSOCKET = gql`
  subscription Subscription {
    marketData {
      marketDataResponse
    }
  }
`;

type AggregatedDataProps = {
  average: string;
  close: string;
  high: string;
  low: string;
  percentChange: string;
  orderbook: any;
};

const AggregatedData: React.FC<AggregatedDataProps> = ({
  average,
  close,
  high,
  low,
  percentChange,
  orderbook,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>average: {average}</TableCell>
            <TableCell>close: {close}</TableCell>
            <TableCell>high: {high}</TableCell>
            <TableCell>low: {low}</TableCell>
            <TableCell>percentChange: {percentChange}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div>
        <OrdersTable orderbook={orderbook} />
      </div>
    </Box>
  );
};

type MarketDataHttpProps = {
  polling?: boolean;
  baseTicker: string;
  quoteTicker: string;
};

export const MarketDataHttp: React.FC<MarketDataHttpProps> = ({
  polling = false,
  baseTicker,
  quoteTicker,
}) => {
  const { loading, error, data, startPolling } = useQuery(MARKET_DATA_HTTP, {
    variables: {
      baseTicker,
      quoteTicker,
    },
    fetchPolicy: "no-cache",
  });

  if (loading) return <p>Http - Loading...</p>;
  if (error) return <p>Http - Error on fetching Market data :(</p>;

  if (polling) startPolling(MARKET_DATA_POLL_INTERVAL);

  const {
    marketDataLast24HourPriceAggregate,
    displaySymbol,
  } = data.marketData.marketDataResponse[0];

  const marketSymbol =
    marketDataLast24HourPriceAggregate?.percentChange > 0 ? "📈" : "📉";

  return (
    <MarketCard
      title={polling ? "HTTP - Polling" : "HTTP"}
      displaySymbol={displaySymbol}
      marketSymbol={marketSymbol}
    >
      <AggregatedData {...marketDataLast24HourPriceAggregate} />
    </MarketCard>
  );
};

type MarketDataWebSocketProps = {
  ticketPair: TicketPairType;
};

export const MarketDataWebSocket: ComponentType<MarketDataWebSocketProps> = ({
  ticketPair,
}) => {
  const { data, error, loading } = useSubscription(MARKET_DATA_WEBSOCKET);

  if (loading) return <p>WebSocket - Loading...</p>;
  if (error) return <p>WebSocket - Error on fetching Market data :(</p>;

  const marketData = data.marketData?.marketDataResponse?.tradingPairs?.find(
    (pairs: any) => pairs.displaySymbol === ticketPair
  );

  const { marketDataLast24HourPriceAggregate, displaySymbol } = marketData;

  const marketSymbol =
    marketDataLast24HourPriceAggregate?.percentChange > 0 ? "📈" : "📉";

  return (
    <Box>
      <MarketCard
        title="WebSockets"
        displaySymbol={displaySymbol}
        marketSymbol={marketSymbol}
      >
        <AggregatedData {...marketDataLast24HourPriceAggregate} />
      </MarketCard>
    </Box>
  );
};
