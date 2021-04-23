import { gql } from "@apollo/client";

export const MARKET_DATA_WEBSOCKET = gql`
  subscription Subscription {
    marketData {
      marketDataResponse
    }
  }
`;
