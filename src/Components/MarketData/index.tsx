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
import { Box, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

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

  if (loading) {
    return (
      <Box>
        <Skeleton animation="wave" />
        <Skeleton variant="rect" width="100%" height={620} />
      </Box>
    );
  }
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
      loading={loading}
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
