import { render } from "@testing-library/react";
import { AggregatedData } from "./AggregatedData";

it("renders correctly", () => {
  const orderbook = {
    asks: [{ price: "12000" }],
    bids: [{ price: "20000" }],
  };

  const props = {
    average: "1200",
    close: "1201",
    high: "1202",
    low: "1203",
    orderbook,
  };

  const { container } = render(<AggregatedData {...props} />);
  expect(container).toMatchSnapshot();
});
