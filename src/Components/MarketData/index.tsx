import { ComponentType } from "react";
import { useQuery, useSubscription } from "@apollo/client";
import { Box, Table, TableBody, TableRow, TableCell } from "@material-ui/core";

import { TicketPairType } from "../../models/pairs";
import { OrdersTable } from "./OrdersTable";
import { MarketCard } from "../MarketCard";
import { MARKET_DATA_HTTP, MARKET_DATA_WEBSOCKET } from "../../graphql";

const MARKET_DATA_POLL_INTERVAL = 2000;

type AggregatedDataProps = {
  average: string;
  close: string;
  high: string;
  low: string;
  percentChange: string;
  orderbook: any;
};

const AggregatedData: ComponentType<AggregatedDataProps> = ({
  average,
  close,
  high,
  low,
  orderbook,
}) => {
  return (
    <Box display="flex" flexDirection="column">
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <strong>Average:</strong> {average}
            </TableCell>
            <TableCell>
              <strong>Close:</strong> {close}
            </TableCell>
            <TableCell>
              <strong>High:</strong> {high}
            </TableCell>
            <TableCell>
              <strong>Low:</strong> {low}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box>
        <OrdersTable orderbook={orderbook} />
      </Box>
    </Box>
  );
};

type MarketDataHttpProps = {
  polling?: boolean;
  baseTicker: string;
  quoteTicker: string;
};

export const MarketDataHttp: ComponentType<MarketDataHttpProps> = ({
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
    displaySymbol: pair,
  } = data.marketData.marketDataResponse[0];

  const percentChange: number = Number(
    marketDataLast24HourPriceAggregate?.percentChange
  );

  return (
    <MarketCard
      title={polling ? "HTTP - Polling" : "HTTP"}
      pair={pair}
      percentChange={percentChange}
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

  const {
    marketDataLast24HourPriceAggregate,
    displaySymbol: pair,
  } = marketData;

  const percentChange = Number(
    marketDataLast24HourPriceAggregate?.percentChange
  );

  return (
    <MarketCard title="WebSockets" pair={pair} percentChange={percentChange}>
      <AggregatedData {...marketDataLast24HourPriceAggregate} />
    </MarketCard>
  );
};
