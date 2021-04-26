import { gql } from "@apollo/client";

export const MARKET_DATA_WEBSOCKET = gql`
  subscription MarketData($baseTicker: String!, $quoteTicker: String!) {
    marketData(baseTicker: $baseTicker, quoteTicker: $quoteTicker) {
      marketDataResponse
    }
  }
`;
