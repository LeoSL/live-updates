import { useQuery, useSubscription, gql } from "@apollo/client";
import { MarketCard } from "../Card";

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

type AggregatedDataType = {
  average: string;
  close: string;
  high: string;
  low: string;
  percentChange: string;
  orderbook: any;
};

const AggregatedData: React.FC<AggregatedDataType> = ({
  average,
  close,
  high,
  low,
  percentChange,
  orderbook,
}) => {
  console.log("orderbook", orderbook);

  return (
    <div>
      <p>average: {average}</p>
      <p>close: {close}</p>
      <p>high: {high}</p>
      <p>low: {low}</p>
      <p>percentChange: {percentChange}</p>
    </div>
  );
};

type MarketDataType = {
  baseTicker: string;
  quoteTicker: string;
};

export const MarketDataHttp: React.FC<MarketDataType> = ({
  baseTicker,
  quoteTicker,
}) => {
  const { loading, error, data } = useQuery(MARKET_DATA_HTTP, {
    variables: {
      baseTicker,
      quoteTicker,
    },
  });

  if (loading) return <p>Http - Loading...</p>;
  if (error) return <p>Http - Error on fetching Market data :(</p>;

  const {
    marketDataLast24HourPriceAggregate,
    displaySymbol,
  } = data.marketData.marketDataResponse[0];

  const marketSymbol =
    marketDataLast24HourPriceAggregate?.percentChange > 0 ? "📈" : "📉";

  return (
    <MarketCard
      title="HTTP"
      displaySymbol={displaySymbol}
      marketSymbol={marketSymbol}
    >
      <AggregatedData {...marketDataLast24HourPriceAggregate} />
    </MarketCard>
  );
};

export const MarketDataWebSocket: React.FC = () => {
  const { data, error, loading } = useSubscription(MARKET_DATA_WEBSOCKET);

  if (loading) return <p>WebSocket - Loading...</p>;
  if (error) return <p>WebSocket - Error on fetching Market data :(</p>;

  const {
    marketDataLast24HourPriceAggregate,
    displaySymbol,
  } = data.marketData.marketDataResponse.tradingPairs[0];

  const marketSymbol =
    marketDataLast24HourPriceAggregate?.percentChange > 0 ? "📈" : "📉";

  return (
    <MarketCard
      title="WebSockets"
      displaySymbol={displaySymbol}
      marketSymbol={marketSymbol}
    >
      <AggregatedData {...marketDataLast24HourPriceAggregate} />
    </MarketCard>
  );
};
