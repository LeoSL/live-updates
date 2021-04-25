import { render } from "@testing-library/react";
import { OrdersTable } from "./OrdersTable";

it("renders correctly", () => {
  const props = {
    asks: [{ price: "12000" }],
    bids: [{ price: "20000" }],
  };
  const { container } = render(<OrdersTable {...props} />);
  expect(container).toMatchSnapshot();
});
