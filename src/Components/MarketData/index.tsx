import React, { ComponentType } from "react";
import { useQuery, useSubscription } from "@apollo/client";

import { MARKET_DATA_HTTP, MARKET_DATA_WEBSOCKET } from "../../graphql";
import { TicketPairType } from "../../models/pairs";
import { MarketCard } from "../MarketCard";
import { AggregatedData } from "./AggregatedData";

const MARKET_DATA_POLL_INTERVAL = 2000;

type Order = {
  price: string;
};

export type Orderbook = {
  asks: Order[];
  bids: Order[];
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
