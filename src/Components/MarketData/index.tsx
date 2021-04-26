import { ComponentType, useState, useEffect } from "react";
import { useQuery, useSubscription } from "@apollo/client";

import { MARKET_DATA_HTTP, MARKET_DATA_WEBSOCKET } from "../../graphql";
import {
  MarketData,
  MarketDataResponse,
  PriceAggregate,
  TicketPairType,
} from "../../models/pairs";
import { MarketCard } from "../MarketCard";
import { AggregatedData } from "./AggregatedData";
import { Typography } from "@material-ui/core";

const MARKET_DATA_POLL_INTERVAL = 2000;

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

  const [aggregatedData, setAggregatedData] = useState<PriceAggregate>();
  useEffect(() => {
    const response: MarketDataResponse[] = data?.marketData.marketDataResponse;

    if (!!response) {
      const { marketDataLast24HourPriceAggregate } = response[0];
      setAggregatedData(marketDataLast24HourPriceAggregate);
    }
  }, [data, loading, baseTicker, quoteTicker]);

  if (error)
    return <Typography>Http - Error on fetching Market data :(</Typography>;

  if (polling) startPolling(MARKET_DATA_POLL_INTERVAL);

  return (
    <MarketCard
      title={polling ? "HTTP - Polling" : "HTTP"}
      pair={`${baseTicker}-${quoteTicker}`}
      loading={loading}
      percentChange={aggregatedData && Number(aggregatedData?.percentChange)}
    >
      {aggregatedData && <AggregatedData {...aggregatedData} />}
    </MarketCard>
  );
};

type MarketDataWebSocketProps = {
  ticketPair: TicketPairType;
};

export const MarketDataWebSocket: ComponentType<MarketDataWebSocketProps> = ({
  ticketPair,
}) => {
  const [baseTicker, quoteTicker] = ticketPair.split("-");

  const {
    data: subscriptionData,
    error: subscriptionError,
    loading: subscriptionLoading,
  } = useSubscription(MARKET_DATA_WEBSOCKET, {
    variables: { baseTicker, quoteTicker },
  });

  const [aggregatedData, setAggregatedData] = useState<PriceAggregate>();

  useEffect(() => {
    const subscriptionResponse: MarketData = subscriptionData?.marketData;

    if (!!subscriptionResponse) {
      const {
        marketDataLast24HourPriceAggregate,
      } = subscriptionResponse.marketDataResponse as MarketDataResponse;

      setAggregatedData(marketDataLast24HourPriceAggregate);
    }
  }, [subscriptionData, subscriptionLoading, ticketPair]);

  if (subscriptionError) {
    console.error(subscriptionError);
    return (
      <Typography>WebSocket - Error on fetching Market data :(</Typography>
    );
  }

  return (
    <MarketCard
      title="WebSockets"
      pair={ticketPair}
      loading={subscriptionLoading}
      percentChange={Number(aggregatedData?.percentChange)}
    >
      {aggregatedData && <AggregatedData {...aggregatedData} />}
    </MarketCard>
  );
};
