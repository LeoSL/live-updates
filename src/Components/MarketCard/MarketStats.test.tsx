import { render } from "@testing-library/react";
import { MarketStats } from "./MarketStats";

it("renders correctly", () => {
  const { container } = render(<MarketStats percentChange={0.5} />);
  expect(container).toMatchSnapshot();
});
