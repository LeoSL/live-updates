import { gql } from "@apollo/client";

export const MARKET_DATA_HTTP = gql`
  query MarketData($baseTicker: String!, $quoteTicker: String!) {
    marketData(baseTicker: $baseTicker, quoteTicker: $quoteTicker) {
      marketDataResponse
    }
  }
`;
