import { useQuery, gql } from "@apollo/client";

const MARKET_DATA = gql`
  query MarketData($baseTicker: String!, $quoteTicker: String!) {
    marketData(baseTicker: $baseTicker, quoteTicker: $quoteTicker) {
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
};
const AggregatedData: React.FC<AggregatedDataType> = ({
  average,
  close,
  high,
  low,
  percentChange,
  // orderbook,
}) => {
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
export const MarketData: React.FC<MarketDataType> = ({
  baseTicker,
  quoteTicker,
}) => {
  const { loading, error, data } = useQuery(MARKET_DATA, {
    variables: {
      baseTicker,
      quoteTicker,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error on fetching Market data :(</p>;

  const {
    marketDataLast24HourPriceAggregate,
    displaySymbol,
  } = data.marketData.marketDataResponse[0];

  return (
    <div>
      <h2>Market: {displaySymbol}</h2>
      <AggregatedData {...marketDataLast24HourPriceAggregate} />
    </div>
  );
};
