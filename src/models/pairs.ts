export type TicketPairType = "BTC-USD" | "BTC-CAD" | "ETH-CAD";

export enum TicketPairEnum {
  "BTC-CAD" = "BTCCAD",
  "BTC-USD" = "BTCUSD",
  "ETH-CAD" = "ETHCAD",
}

type Order = {
  price: string;
};

export type Orderbook = {
  asks: Order[];
  bids: Order[];
};

export type PriceAggregate = {
  high: string;
  low: string;
  close: string;
  average: string;
  percentChange: string;
  orderbook: Orderbook;
};

export type MarketDataResponse = {
  displaySymbol: string;
  baseCurrency: string;
  quoteCurrency: string;
  marketDataLast24HourPriceAggregate: PriceAggregate;
};

export type MarketData = {
  marketDataResponse: MarketDataResponse;
};
